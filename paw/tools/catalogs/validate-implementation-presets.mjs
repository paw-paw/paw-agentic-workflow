import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';

export const PRESET_IDS = [
  'content-astro-static',
  'transactional-rails-monolith',
  'service-go-api',
  'package-typescript',
  'package-python',
  'package-go',
  'cli-go-cobra',
  'client-flutter-mobile',
  'client-tauri-desktop',
  'data-python-dagster',
  'agentic-python-langgraph',
];

export const VARIANT_IDS = [
  'product-docs-docusaurus',
  'laravel-monolith', 'django-admin-first', 'nextjs-restricted',
  'hono-edge', 'fastapi-ml', 'nestjs-typescript', 'spring-java',
  'rust-structured-cli', 'python-typer-internal',
  'expo-react-native', 'electron-brownfield',
  'dbt-warehouse-first', 'airflow-existing', 'prefect-existing',
  'autogen-prototype', 'proprietary-sdk-bounded',
];

export const COMPLETENESS_DIMENSIONS = [
  'quality', 'security', 'supply_chain', 'testing', 'operation', 'verification',
];

const FORBIDDEN_FIELDS = [
  'authority', 'authority_level', 'accountable_owner', 'runtime_agentic',
  'runtime_adapter', 'adoption_status', 'selected_for_repository',
];
const FLOATING_REFERENCE = /(^|[^a-z])(latest|current|next(?!\.js)|canary|beta|rc)([^a-z]|$)/i;

function error(code, message, path) {
  return createDiagnostic({ code, message, path });
}

function nonEmptyStrings(value) {
  return Array.isArray(value) && value.length > 0 &&
    value.every((item) => typeof item === 'string' && item.length > 0);
}

function walkForbidden(value, path, diagnostics) {
  if (!value || typeof value !== 'object') return;
  for (const [key, nested] of Object.entries(value)) {
    if (FORBIDDEN_FIELDS.includes(key)) {
      diagnostics.push(error('PRESET_FORBIDDEN_FIELD', `Implementation presets cannot define ${key}.`, `${path}#${key}`));
    }
    walkForbidden(nested, `${path}#${key}`, diagnostics);
  }
}

function daysBetween(from, to) {
  return (Date.parse(to) - Date.parse(from)) / 86_400_000;
}

export function validateImplementationPresetCatalog(
  catalog,
  { familyIds, modifierIds, sourcePath = 'implementation-presets/catalog.json' },
) {
  const diagnostics = [];
  if (!catalog || typeof catalog !== 'object' || Array.isArray(catalog)) {
    return createValidationResult({
      diagnostics: [error('PRESET_CATALOG_TYPE', 'Implementation preset catalog must be an object.', sourcePath)],
    });
  }
  if (catalog.schema_version !== 1) diagnostics.push(error('PRESET_SCHEMA_VERSION', 'schema_version must be 1.', sourcePath));
  if (catalog.catalog_id !== 'implementation-presets') diagnostics.push(error('PRESET_CATALOG_ID', 'catalog_id must be implementation-presets.', sourcePath));
  if (catalog.review_policy?.maximum_review_age_days !== 180) diagnostics.push(error('PRESET_REVIEW_AGE', 'maximum_review_age_days must be 180.', sourcePath));
  if (JSON.stringify(catalog.completeness_dimensions) !== JSON.stringify(COMPLETENESS_DIMENSIONS)) diagnostics.push(error('PRESET_DIMENSIONS_INVALID', 'completeness_dimensions must declare the approved six dimensions.', sourcePath));
  walkForbidden(catalog, sourcePath, diagnostics);

  const sources = Array.isArray(catalog.sources) ? catalog.sources : [];
  const sourceIds = sources.map(({ source_id: id }) => id);
  if (new Set(sourceIds).size !== sourceIds.length) diagnostics.push(error('PRESET_SOURCE_DUPLICATE', 'source_id values must be unique.', sourcePath));
  for (const [index, source] of sources.entries()) {
    const path = `${sourcePath}#sources/${index}`;
    if (!(typeof source.url === 'string' && source.url.startsWith('https://'))) diagnostics.push(error('PRESET_SOURCE_URL', 'Sources must use an HTTPS URL.', path));
    if (!nonEmptyStrings(source.supported_lines)) diagnostics.push(error('PRESET_SOURCE_LINES', 'Sources must declare supported_lines.', path));
    if (!/^\d{4}-\d{2}-\d{2}$/.test(source.verified_at ?? '')) diagnostics.push(error('PRESET_SOURCE_DATE', 'verified_at must be an ISO date.', path));
  }

  if (!Array.isArray(catalog.presets) || catalog.presets.length !== PRESET_IDS.length) {
    diagnostics.push(error('PRESET_COUNT', 'Implementation preset catalog must contain exactly 11 presets.', sourcePath));
    return createValidationResult({ schemaVersion: 1, diagnostics, validatedPaths: [sourcePath] });
  }
  const presetIds = [];
  const variantIds = [];
  for (const [index, preset] of catalog.presets.entries()) {
    const path = `${sourcePath}#presets/${index}`;
    presetIds.push(preset.preset_id);
    if (!PRESET_IDS.includes(preset.preset_id)) diagnostics.push(error('PRESET_ID_UNKNOWN', `Unknown preset_id: ${preset.preset_id}.`, path));
    if (!familyIds.includes(preset.family_id)) diagnostics.push(error('PRESET_FAMILY_REF', `Unknown family_id: ${preset.family_id}.`, path));
    for (const field of ['envelope', 'quality', 'security', 'supply_chain', 'testing', 'operation', 'verification']) {
      if (!(typeof preset[field] === 'string' && preset[field].length > 0)) diagnostics.push(error('PRESET_FIELD_REQUIRED', `${field} is required.`, path));
    }
    for (const field of ['invariants', 'applicability', 'contraindications', 'fixed_decisions', 'bounded_choices', 'parameters', 'source_refs']) {
      if (!nonEmptyStrings(preset[field])) diagnostics.push(error('PRESET_LIST_REQUIRED', `${field} must contain strings.`, path));
    }
    for (const field of ['supported_profiles', 'supported_concerns']) {
      if (!Array.isArray(preset[field]) || preset[field].some((id) => !modifierIds.includes(id))) diagnostics.push(error('PRESET_MODIFIER_REF', `${field} contains an unknown modifier.`, path));
    }
    if (preset.source_refs?.some((id) => !sourceIds.includes(id))) diagnostics.push(error('PRESET_SOURCE_REF', 'source_refs contains an unknown source.', path));
    if (!/^\d{4}-\d{2}-\d{2}$/.test(preset.reviewed_at ?? '') || !/^\d{4}-\d{2}-\d{2}$/.test(preset.review_by ?? '')) {
      diagnostics.push(error('PRESET_REVIEW_DATE', 'reviewed_at and review_by must be ISO dates.', path));
    } else {
      const age = daysBetween(preset.reviewed_at, preset.review_by);
      if (age < 0 || age > 180) diagnostics.push(error('PRESET_REVIEW_WINDOW', 'review_by must be within 180 days of reviewed_at.', path));
    }
    const text = JSON.stringify(preset);
    if (FLOATING_REFERENCE.test(text)) diagnostics.push(error('PRESET_FLOATING_VERSION', 'Preset contains a floating or prerelease reference.', path));
    if (!Array.isArray(preset.variants)) diagnostics.push(error('PRESET_VARIANTS_TYPE', 'variants must be an array.', path));
    for (const variant of preset.variants ?? []) {
      variantIds.push(variant.variant_id);
      if (!VARIANT_IDS.includes(variant.variant_id)) diagnostics.push(error('PRESET_VARIANT_UNKNOWN', `Unknown variant_id: ${variant.variant_id}.`, path));
      if (!(typeof variant.envelope_replacement === 'string' && typeof variant.use_when === 'string')) diagnostics.push(error('PRESET_VARIANT_INCOMPLETE', 'Variants require envelope_replacement and use_when.', path));
      if (Object.hasOwn(variant, 'combinable_with')) diagnostics.push(error('PRESET_VARIANT_COMPOSITION', 'Variants cannot declare combinable_with.', path));
    }
  }
  if (new Set(presetIds).size !== PRESET_IDS.length) diagnostics.push(error('PRESET_ID_DUPLICATE', 'preset_id values must be unique.', sourcePath));
  for (const id of PRESET_IDS) if (!presetIds.includes(id)) diagnostics.push(error('PRESET_ID_REQUIRED', `Required preset is missing: ${id}.`, sourcePath));
  if (new Set(variantIds).size !== VARIANT_IDS.length || VARIANT_IDS.some((id) => !variantIds.includes(id))) diagnostics.push(error('PRESET_VARIANT_INVENTORY', 'Variant inventory must match the approved 17 IDs.', sourcePath));

  return createValidationResult({
    schemaVersion: 1,
    diagnostics,
    validatedPaths: [sourcePath],
    evidence: { implementation_preset_count: presetIds.length, implementation_variant_count: variantIds.length, implementation_source_count: sourceIds.length },
  });
}
