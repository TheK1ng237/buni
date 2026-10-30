'use client';

import type { Step1Data, FieldErrors } from '../../types';
import { PATTERN_TYPES, REGIONS } from '@buni/patterns';
import { LICENSES, AFRICAN_COUNTRIES } from '../../constants/pattern.constants';
import { Field, PillBtn, SelectField, StepTitle } from '../Patternform.primitives';
import { useTranslations } from '@/i18n';

interface Step1Props {
  data: Partial<Step1Data>;
  errors: FieldErrors;
  onChange: (patch: Partial<Step1Data>) => void;
}

export function Step1({ data, errors, onChange }: Step1Props) {
  const t = useTranslations('patternForm.step1');

  return (
    <div className="space-y-6">
      <StepTitle title={t('title')} sub={t('sub')} />

      {/* Names */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('nameLocalLabel')} error={errors['nameLocal']} required>
          <input
            className="avs-input"
            value={data.nameLocal ?? ''}
            onChange={(e) => onChange({ nameLocal: e.target.value })}
            placeholder={t('nameLocalPlaceholder')}
          />
        </Field>

        <Field label={t('nameFrLabel')} error={errors['nameEn']} required>
          <input
            className="avs-input"
            value={data.nameEn ?? ''}
            onChange={(e) => onChange({ nameEn: e.target.value })}
            placeholder={t('nameFrPlaceholder')}
          />
        </Field>

        <Field label={t('licenseLabel')} error={errors['license']} required>
          <div className="mt-1 flex flex-wrap gap-2">
            {LICENSES.map((l) => (
              <PillBtn
                key={l}
                label={l}
                active={data.license === l}
                onClick={() => onChange({ license: l as Step1Data['license'] })}
              />
            ))}
          </div>
        </Field>
      </div>

      {/* Pattern type pills */}
      <Field label={t('patternTypeLabel')} error={errors['patternType']} required>
        <div className="mt-1 flex flex-wrap gap-2">
          {PATTERN_TYPES.map((t) => (
            <PillBtn
              key={t}
              label={t}
              active={data.patternType === t}
              onClick={() => onChange({ patternType: t })}
            />
          ))}
        </div>
      </Field>

      {/* Region + Country */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('regionLabel')} error={errors['region']} required>
          <SelectField
            value={data.region ?? ''}
            onChange={(v) => onChange({ region: v as Step1Data['region'] })}
          >
            <option value="">{t('chooseRegion')}</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </SelectField>
        </Field>

        <Field
          label={t('countryLabel')}
          error={errors['country']}
          required
          hint={t('countryHint')}
        >
          <SelectField
            value={data.country ?? ''}
            onChange={(code) => {
              const matched = AFRICAN_COUNTRIES.find((c) => c.code === code);
              onChange({
                country: code,
                ...(matched ? { flag: matched.flag } : {}),
                ...(matched?.region && !data.region ? { region: matched.region as Step1Data['region'] } : {}),
              });
            }}
          >
            <option value="">{t('chooseCountry')}</option>
            {AFRICAN_COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code}
              </option>
            ))}
          </SelectField>
        </Field>
      </div>

      {/* Optional fields */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('peopleLabel')}>
          <input
            className="avs-input"
            value={data.people ?? ''}
            onChange={(e) => onChange({ people: e.target.value })}
            placeholder={t('peoplePlaceholder')}
          />
        </Field>

        <Field label={t('flagLabel')}>
          <SelectField
            value={data.flag ?? ''}
            onChange={(flag) => {
              const matched = AFRICAN_COUNTRIES.find((c) => c.flag === flag);
              onChange({
                flag,
                ...(matched ? { country: matched.code } : {}),
                ...(matched?.region && !data.region ? { region: matched.region as Step1Data['region'] } : {}),
              });
            }}
          >
            <option value="">{t('chooseFlag')}</option>
            {AFRICAN_COUNTRIES.map((c) => (
              <option key={`${c.code}-${c.flag}`} value={c.flag}>
                {c.flag} {c.name} ({c.code})
              </option>
            ))}
          </SelectField>
        </Field>

        <Field label={t('kingdomLabel')}>
          <input
            className="avs-input"
            value={data.kingdom ?? ''}
            onChange={(e) => onChange({ kingdom: e.target.value })}
            placeholder={t('kingdomPlaceholder')}
          />
        </Field>

        <Field label={t('eraLabel')}>
          <input
            className="avs-input"
            value={data.era ?? ''}
            onChange={(e) => onChange({ era: e.target.value })}
            placeholder={t('eraPlaceholder')}
          />
        </Field>
      </div>

      {/* Coordinates */}
      <Field label={t('coordsLabel')}>
        <div className="grid grid-cols-2 gap-2">
          <input
            className="avs-input"
            type="number"
            step="0.0001"
            value={data.coords?.[0] ?? ''}
            onChange={(e) =>
              onChange({ coords: [parseFloat(e.target.value) || 0, data.coords?.[1] ?? 0] })
            }
            placeholder="6.6885"
          />
          <input
            className="avs-input"
            type="number"
            step="0.0001"
            value={data.coords?.[1] ?? ''}
            onChange={(e) =>
              onChange({ coords: [data.coords?.[0] ?? 0, parseFloat(e.target.value) || 0] })
            }
            placeholder="11.1640"
          />
        </div>
      </Field>
    </div>
  );
}