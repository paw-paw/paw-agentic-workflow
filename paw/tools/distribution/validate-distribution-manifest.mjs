import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { isAbsolute } from 'node:path';

import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';

const STATUS = new Set(['candidate']);
const KINDS = new Set([
  'contract',
  'schema',
  'tool',
  'test',
  'fixture',
  'runtime-binding',
  'license',
  'notice',
  'documentation',
]);

const REQUIRED_FIELDS = [
  'schema_version',
  'distribution_id',
  'version',
  'status',
  'compatibility',
  'requirements',
  'license',
  'notices',
  'files',
];

const REQUIRED_SURFACES = [
  'README.md',
  'LICENSE',
  'NOTICES.md',
  'docs/README.md',
  'docs/licensing/OUTPUT-POLICY.md',
  'paw/core/',
  'paw/catalogs/',
  'paw/adoption/',
  'paw/orchestration/',
  'paw/integration/',
  'paw/distribution/',
  'paw/tools/schemas/',
  'paw/tools/validate-patches.mjs',
  '.codex/README.md',
  '.codex/paw-runtime-map.json',
  '.codex/paw-toolkit/',
  '.codex/skills/paw-',
];

const EXCLUDED_PREFIXES = [
  '_inbox/',
  '.git/',
  'paw/parches/',
  'sdd/parches/',
];

function diagnostic(code, message, path) {
  return createDiagnostic({ code, message, path });
}

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isRelativeSafePath(value) {
  return typeof value === 'string'
    && value !== ''
    && !isAbsolute(value)
    && !value.includes('\\')
    && !value.split('/').includes('..');
}

function sha256(content) {
  return createHash('sha256').update(content).digest('hex');
}

function fileContentFromResolver(sourcePath, resolver) {
  if (resolver) return resolver(sourcePath);
  if (!existsSync(sourcePath)) return null;
  return readFileSync(sourcePath);
}

function validateString(value, field, diagnostics, sourcePath, { allowEmpty = false } = {}) {
  if (typeof value[field] !== 'string' || (!allowEmpty && value[field] === '')) {
    diagnostics.push(diagnostic('DISTRIBUTION_FIELD_REQUIRED', `Field must be a ${allowEmpty ? 'string' : 'non-empty string'}: ${field}.`, sourcePath));
  }
}

function validateCompatibility(value, diagnostics, sourcePath) {
  if (!isObject(value.compatibility)) {
    diagnostics.push(diagnostic('DISTRIBUTION_COMPATIBILITY_INVALID', 'compatibility must be an object.', sourcePath));
    return;
  }
  const { compatibility } = value;
  if (!Array.isArray(compatibility.schema_versions) || compatibility.schema_versions.length === 0) {
    diagnostics.push(diagnostic('DISTRIBUTION_SCHEMA_COMPATIBILITY_REQUIRED', 'compatibility.schema_versions must be a non-empty array.', sourcePath));
  }
  validateString(compatibility, 'toolkit', diagnostics, sourcePath);
  validateString(compatibility, 'codex_runtime', diagnostics, sourcePath);
}

function validateRequirements(value, diagnostics, sourcePath) {
  if (!isObject(value.requirements)) {
    diagnostics.push(diagnostic('DISTRIBUTION_REQUIREMENTS_INVALID', 'requirements must be an object.', sourcePath));
    return;
  }
  validateString(value.requirements, 'node', diagnostics, sourcePath);
}

function validateEntries(files, diagnostics, sourcePath, resolver) {
  const seenDestinations = new Set();
  const sources = [];

  files.forEach((entry, index) => {
    const entryPath = `${sourcePath}#files[${index}]`;
    if (!isObject(entry)) {
      diagnostics.push(diagnostic('DISTRIBUTION_FILE_ENTRY_INVALID', 'Manifest file entry must be an object.', entryPath));
      return;
    }

    for (const field of ['source_path', 'destination_path', 'kind', 'checksum_sha256', 'license']) {
      validateString(entry, field, diagnostics, entryPath);
    }
    if (typeof entry.required_for_codex !== 'boolean') {
      diagnostics.push(diagnostic('DISTRIBUTION_FILE_FLAG_INVALID', 'required_for_codex must be boolean.', entryPath));
    }
    if (typeof entry.uninstall_owned !== 'boolean') {
      diagnostics.push(diagnostic('DISTRIBUTION_FILE_FLAG_INVALID', 'uninstall_owned must be boolean.', entryPath));
    }
    if (!isRelativeSafePath(entry.source_path)) {
      diagnostics.push(diagnostic('DISTRIBUTION_SOURCE_PATH_INVALID', 'source_path must be a safe repository-relative path.', entryPath));
    }
    if (!isRelativeSafePath(entry.destination_path)) {
      diagnostics.push(diagnostic('DISTRIBUTION_DESTINATION_PATH_INVALID', 'destination_path must be a safe destination-relative path.', entryPath));
    }
    if (EXCLUDED_PREFIXES.some((prefix) => entry.source_path?.startsWith(prefix))) {
      diagnostics.push(diagnostic('DISTRIBUTION_EXCLUDED_SOURCE', 'Manifest must not include excluded source surfaces.', entryPath));
    }
    if (!KINDS.has(entry.kind)) {
      diagnostics.push(diagnostic('DISTRIBUTION_FILE_KIND_INVALID', 'Manifest file kind is invalid.', entryPath));
    }
    if (typeof entry.checksum_sha256 === 'string' && !/^[a-f0-9]{64}$/.test(entry.checksum_sha256)) {
      diagnostics.push(diagnostic('DISTRIBUTION_CHECKSUM_FORMAT_INVALID', 'checksum_sha256 must be lowercase SHA-256 hex.', entryPath));
    }
    if (seenDestinations.has(entry.destination_path)) {
      diagnostics.push(diagnostic('DISTRIBUTION_DESTINATION_DUPLICATE', 'destination_path must be unique.', entryPath));
    }
    seenDestinations.add(entry.destination_path);
    sources.push(entry.source_path);

    if (isRelativeSafePath(entry.source_path)) {
      const content = fileContentFromResolver(entry.source_path, resolver);
      if (content === null || content === undefined) {
        diagnostics.push(diagnostic('DISTRIBUTION_FILE_MISSING', 'Declared source file is missing.', entryPath));
      } else if (sha256(content) !== entry.checksum_sha256) {
        diagnostics.push(diagnostic('DISTRIBUTION_CHECKSUM_MISMATCH', 'Declared checksum does not match source content.', entryPath));
      }
    }
  });

  for (const required of REQUIRED_SURFACES) {
    if (!sources.some((source) => source === required || source.startsWith(required))) {
      diagnostics.push(diagnostic('DISTRIBUTION_REQUIRED_SURFACE_MISSING', `Required distribution surface is missing: ${required}.`, sourcePath));
    }
  }
}

export function validateDistributionManifest(value, sourcePath = '<memory>', { fileResolver } = {}) {
  const diagnostics = [];

  if (!isObject(value)) {
    diagnostics.push(diagnostic('DISTRIBUTION_MANIFEST_INVALID', 'Distribution manifest must be an object.', sourcePath));
    return createValidationResult({ schemaVersion: 1, diagnostics, validatedPaths: [sourcePath] });
  }

  for (const field of REQUIRED_FIELDS) {
    if (value[field] === undefined) {
      diagnostics.push(diagnostic('DISTRIBUTION_FIELD_REQUIRED', `Required field is missing: ${field}.`, sourcePath));
    }
  }

  if (value.schema_version !== 1) {
    diagnostics.push(diagnostic('DISTRIBUTION_SCHEMA_VERSION_INVALID', 'Distribution manifest must use schema_version 1.', sourcePath));
  }
  validateString(value, 'distribution_id', diagnostics, sourcePath);
  validateString(value, 'version', diagnostics, sourcePath);
  if (!STATUS.has(value.status)) {
    diagnostics.push(diagnostic('DISTRIBUTION_STATUS_INVALID', 'status must be candidate for this patch.', sourcePath));
  }
  if (value.version === '0.1.0') {
    diagnostics.push(diagnostic('DISTRIBUTION_STABLE_RELEASE_INVALID', 'Patch 09 must not publish stable version 0.1.0.', sourcePath));
  }
  validateCompatibility(value, diagnostics, sourcePath);
  validateRequirements(value, diagnostics, sourcePath);
  validateString(value, 'license', diagnostics, sourcePath);
  if (!Array.isArray(value.notices) || value.notices.length === 0) {
    diagnostics.push(diagnostic('DISTRIBUTION_NOTICES_REQUIRED', 'notices must be a non-empty array.', sourcePath));
  }
  if (!Array.isArray(value.files) || value.files.length === 0) {
    diagnostics.push(diagnostic('DISTRIBUTION_FILES_REQUIRED', 'files must be a non-empty array.', sourcePath));
  } else {
    validateEntries(value.files, diagnostics, sourcePath, fileResolver);
  }

  return createValidationResult({
    schemaVersion: 1,
    diagnostics,
    validatedPaths: [sourcePath],
    evidence: {
      file_count: Array.isArray(value.files) ? value.files.length : 0,
    },
  });
}

