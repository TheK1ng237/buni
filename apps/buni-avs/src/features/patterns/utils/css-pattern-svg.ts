const STYLE_PROPERTIES = [
  'background-color',
  'background-image',
  'background-size',
  'background-position',
  'background-repeat',
  'background-origin',
  'background-clip',
  'background-blend-mode',
] as const;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function createCssPatternSvg(element: HTMLElement, title: string): Blob {
  const computed = window.getComputedStyle(element);
  const style = STYLE_PROPERTIES.map(
    (property) => `${property}:${computed.getPropertyValue(property)}`
  ).join(';');

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml" width="100vw" height="100vh" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style="display:block">
  <title>${escapeXml(title)}</title>
  <rect width="800" height="600" fill="${escapeXml(computed.backgroundColor)}" />
  <foreignObject x="0" y="0" width="800" height="600">
    <xhtml:div xmlns="http://www.w3.org/1999/xhtml" style="box-sizing:border-box;width:100%;height:100%;${escapeXml(style)}"></xhtml:div>
  </foreignObject>
</svg>`;

  return new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
}

export function saveBlob(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => window.URL.revokeObjectURL(url), 1000);
}
