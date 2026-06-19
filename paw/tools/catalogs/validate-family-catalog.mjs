import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';

export const FAMILY_IDS = [
  'content-knowledge',
  'transactional-application',
  'service-api',
  'library-package-sdk',
  'cli-developer-tool',
  'client-application',
  'data-machine-learning',
  'agentic-system',
];

const FAMILY_FIELDS = [
  'family_id',
  'provenance_aliases',
  'name',
  'primary_intent',
  'includes',
  'excludes',
  'boundary_questions',
  'examples',
];

function diagnostic(code, message, path) {
  return createDiagnostic({ code, message, path });
}

function nonEmptyString(value) {
  return typeof value === 'string' && value.length > 0;
}

function stringArray(value, minimum = 1) {
  return Array.isArray(value) && value.length >= minimum && value.every(nonEmptyString);
}

export function validateFamilyCatalog(catalog, { sourcePath = 'catalog.json' } = {}) {
  const diagnostics = [];
  if (!catalog || typeof catalog !== 'object' || Array.isArray(catalog)) {
    return createValidationResult({
      diagnostics: [diagnostic('FAMILY_CATALOG_TYPE', 'Family catalog must be an object.', sourcePath)],
    });
  }

  const allowedTopLevel = new Set(['schema_version', 'catalog_id', 'catalog_version', 'families']);
  for (const key of Object.keys(catalog)) {
    if (!allowedTopLevel.has(key)) {
      diagnostics.push(diagnostic('FAMILY_CATALOG_FIELD_UNKNOWN', `Unknown catalog field: ${key}.`, sourcePath));
    }
  }
  if (catalog.schema_version !== 1) {
    diagnostics.push(diagnostic('FAMILY_CATALOG_SCHEMA_VERSION', 'schema_version must be 1.', sourcePath));
  }
  if (catalog.catalog_id !== 'software-families') {
    diagnostics.push(diagnostic('FAMILY_CATALOG_ID', 'catalog_id must be software-families.', sourcePath));
  }
  if (!/^\d+\.\d+\.\d+$/.test(catalog.catalog_version ?? '')) {
    diagnostics.push(diagnostic('FAMILY_CATALOG_VERSION', 'catalog_version must use SemVer.', sourcePath));
  }
  if (!Array.isArray(catalog.families)) {
    diagnostics.push(diagnostic('FAMILY_CATALOG_FAMILIES_TYPE', 'families must be an array.', sourcePath));
    return createValidationResult({ schemaVersion: 1, diagnostics, validatedPaths: [sourcePath] });
  }
  if (catalog.families.length !== FAMILY_IDS.length) {
    diagnostics.push(diagnostic('FAMILY_CATALOG_COUNT', `families must contain exactly ${FAMILY_IDS.length} entries.`, sourcePath));
  }

  const ids = [];
  const aliases = [];
  for (const [index, family] of catalog.families.entries()) {
    const path = `${sourcePath}#families/${index}`;
    if (!family || typeof family !== 'object' || Array.isArray(family)) {
      diagnostics.push(diagnostic('FAMILY_ENTRY_TYPE', 'Family entry must be an object.', path));
      continue;
    }
    for (const key of Object.keys(family)) {
      if (!FAMILY_FIELDS.includes(key)) {
        diagnostics.push(diagnostic('FAMILY_FIELD_UNKNOWN', `Unknown family field: ${key}.`, path));
      }
    }
    if (!FAMILY_IDS.includes(family.family_id)) {
      diagnostics.push(diagnostic('FAMILY_ID_UNKNOWN', `Unknown canonical family_id: ${family.family_id}.`, path));
    }
    if (ids.includes(family.family_id)) {
      diagnostics.push(diagnostic('FAMILY_ID_DUPLICATE', `Duplicate family_id: ${family.family_id}.`, path));
    }
    ids.push(family.family_id);

    if (!stringArray(family.provenance_aliases)) {
      diagnostics.push(diagnostic('FAMILY_ALIASES_INVALID', 'provenance_aliases must contain non-empty strings.', path));
    } else {
      for (const alias of family.provenance_aliases) {
        if (aliases.includes(alias)) {
          diagnostics.push(diagnostic('FAMILY_ALIAS_DUPLICATE', `Duplicate provenance alias: ${alias}.`, path));
        }
        aliases.push(alias);
      }
    }
    for (const field of ['name', 'primary_intent']) {
      if (!nonEmptyString(family[field])) {
        diagnostics.push(diagnostic('FAMILY_TEXT_REQUIRED', `${field} must be a non-empty string.`, path));
      }
    }
    for (const [field, minimum] of [['includes', 1], ['excludes', 1], ['boundary_questions', 2], ['examples', 1]]) {
      if (!stringArray(family[field], minimum)) {
        diagnostics.push(diagnostic('FAMILY_BOUNDARY_INCOMPLETE', `${field} must contain at least ${minimum} non-empty item(s).`, path));
      }
    }
  }

  for (const id of FAMILY_IDS) {
    if (!ids.includes(id)) {
      diagnostics.push(diagnostic('FAMILY_ID_REQUIRED', `Required family is missing: ${id}.`, sourcePath));
    }
  }

  return createValidationResult({
    schemaVersion: 1,
    diagnostics,
    validatedPaths: [sourcePath],
    evidence: { family_count: catalog.families.length },
  });
}

export function validateProductClassification(product, familyIds, { sourcePath = 'product.json' } = {}) {
  const diagnostics = [];
  if (!product || typeof product !== 'object' || Array.isArray(product)) {
    return createValidationResult({
      diagnostics: [diagnostic('PRODUCT_CLASSIFICATION_TYPE', 'Product classification must be an object.', sourcePath)],
    });
  }
  if (!nonEmptyString(product.product_id)) {
    diagnostics.push(diagnostic('PRODUCT_ID_REQUIRED', 'product_id must be a non-empty string.', sourcePath));
  }
  if (!Array.isArray(product.primary_families)) {
    diagnostics.push(diagnostic('PRODUCT_PRIMARY_FAMILIES_TYPE', 'primary_families must be an array.', sourcePath));
  } else {
    if (product.primary_families.length !== 1) {
      diagnostics.push(diagnostic('PRODUCT_PRIMARY_FAMILY_COUNT', 'A product must declare exactly one primary family.', sourcePath));
    }
    for (const familyId of product.primary_families) {
      if (!familyIds.includes(familyId)) {
        diagnostics.push(diagnostic('PRODUCT_FAMILY_UNKNOWN', `Unknown family_id: ${familyId}.`, sourcePath));
      }
    }
  }
  return createValidationResult({ schemaVersion: 1, diagnostics, validatedPaths: [sourcePath] });
}
