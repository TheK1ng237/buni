// =============================================================================
// Frontend: Webhook to receive backend pattern events
// Place in: buni/apps/buni-avs/src/app/api/sync/patterns/route.ts (Next.js App Router)
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import crypto from 'crypto';

const execAsync = promisify(exec);

const SYNC_SECRET = process.env.FRONTEND_SYNC_SECRET;

export async function POST(request: NextRequest) {
  try {
    // 1. Verify signature
    const signature = request.headers.get('x-sync-signature');
    const body = await request.text();

    if (!verifySignature(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(body);
    const { event, patternId, slug, timestamp } = payload;

    console.log(`📥 Received pattern event: ${event} for ${slug}`);

    // 2. Trigger sync script
    const result = await execAsync('pnpm run sync:backend --filter @buni/patterns', {
      cwd: process.cwd(),
      env: {
        ...process.env,
        AVS_BACKEND_URL: process.env.AVS_BACKEND_URL,
        AVS_API_KEY: process.env.AVS_API_KEY,
      },
    });

    console.log('Sync output:', result.stdout);
    if (result.stderr) console.error('Sync stderr:', result.stderr);

    // 3. Trigger build
    const buildResult = await execAsync('pnpm run build --filter @buni/patterns', {
      cwd: process.cwd(),
    });

    console.log('Build output:', buildResult.stdout);

    // 4. Check if there are changes to publish
    const { stdout: gitStatus } = await execAsync('git status --porcelain packages/patterns/dist/', {
      cwd: process.cwd(),
    });

    const hasChanges = gitStatus.trim().length > 0;

    if (hasChanges) {
      // Auto-publish if configured
      if (process.env.AUTO_PUBLISH === 'true') {
        await publishToNpm();
      } else {
        // Trigger GitHub Actions workflow
        await triggerGitHubWorkflow(slug, event);
      }
    }

    return NextResponse.json({
      success: true,
      event,
      slug,
      hasChanges,
      message: hasChanges ? 'Changes detected, publish triggered' : 'No changes',
    });
  } catch (error) {
    console.error('Sync webhook error:', error);
    return NextResponse.json(
      { error: 'Sync failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function verifySignature(payload: string, signature: string | null): boolean {
  if (!SYNC_SECRET || !signature) {
    console.warn('⚠ Sync secret or signature missing - skipping verification (dev mode)');
    return process.env.NODE_ENV === 'development';
  }

  const expectedSignature = crypto
    .createHmac('sha256', SYNC_SECRET)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}

async function publishToNpm() {
  try {
    const { stdout: versionOutput } = await execAsync('npm version patch --no-git-tag-version --workspaces=false', {
      cwd: path.join(process.cwd(), 'packages/patterns'),
    });

    console.log('Version bumped:', versionOutput.trim());

    const { stdout: publishOutput } = await execAsync('npm publish --access public --provenance', {
      cwd: path.join(process.cwd(), 'packages/patterns'),
      env: {
        ...process.env,
        NODE_AUTH_TOKEN: process.env.NPM_TOKEN,
      },
    });

    console.log('Published:', publishOutput);

    // Commit and push
    await execAsync('git add package.json dist/ && git commit -m "chore: publish @buni/patterns update [skip ci]" && git push', {
      cwd: process.cwd(),
    });
  } catch (error) {
    console.error('Auto-publish failed:', error);
    throw error;
  }
}

async function triggerGitHubWorkflow(slug: string, event: string) {
  const repoOwner = process.env.GITHUB_REPO_OWNER || 'buni';
  const repoName = process.env.GITHUB_REPO_NAME || 'buni';
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn('GitHub token not configured, skipping workflow trigger');
    return;
  }

  try {
    await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/dispatches`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: `pattern-${event}`,
          client_payload: { pattern_slug: slug },
        }),
      }
    );

    console.log('GitHub workflow triggered');
  } catch (error) {
    console.error('Failed to trigger GitHub workflow:', error);
  }
}

import path from 'path';