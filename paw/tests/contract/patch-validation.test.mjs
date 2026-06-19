import assert from 'node:assert/strict';
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { validatePatchDirectory } from '../../tools/validation/validate-patch-directory.mjs';
import { validatePatchManifest } from '../../tools/validation/validate-patch-manifest.mjs';

const fixturesRoot = fileURLToPath(new URL('../fixtures', import.meta.url));

function listFiles(path) {
  const files = [];
  for (const name of readdirSync(path)) {
    const entry = join(path, name);
    if (statSync(entry).isDirectory()) {
      files.push(...listFiles(entry));
    } else {
      files.push(entry);
    }
  }
  return files;
}

function snapshot(path) {
  return Object.fromEntries(
    listFiles(path)
      .sort()
      .map((file) => [relative(path, file), readFileSync(file, 'utf8')]),
  );
}

function fixtureDirectories() {
  return listFiles(fixturesRoot)
    .filter(
      (path) =>
        path.endsWith('expected.json') &&
        !path.replaceAll('\\', '/').includes('/catalogs/') &&
        !path.replaceAll('\\', '/').includes('/adoption/'),
    )
    .map((path) => dirname(path))
    .sort();
}

function codesFor(result, severity) {
  return result.diagnostics
    .filter((diagnostic) => diagnostic.severity === severity)
    .map((diagnostic) => diagnostic.code);
}

test('validates the complete v1/v2 compatibility fixture matrix without mutation', () => {
  const before = snapshot(fixturesRoot);

  for (const fixtureDirectory of fixtureDirectories()) {
    const expected = JSON.parse(
      readFileSync(join(fixtureDirectory, 'expected.json'), 'utf8'),
    );
    const options = {
      allowedRoots: expected.outsideRoot
        ? [join(fixtureDirectory, 'allowed-root')]
        : [fixturesRoot],
      legacyRoots: expected.legacy ? [fixtureDirectory] : [],
    };
    const result = validatePatchDirectory(fixtureDirectory, options);

    assert.equal(result.valid, expected.valid, fixtureDirectory);
    assert.equal(result.schemaVersion, expected.schemaVersion, fixtureDirectory);
    assert.deepEqual(
      codesFor(result, 'error'),
      expected.errorCodes ?? [],
      fixtureDirectory,
    );
    assert.deepEqual(
      codesFor(result, 'warning'),
      expected.warningCodes ?? [],
      fixtureDirectory,
    );
    assert.deepEqual(
      codesFor(result, 'compatibility'),
      expected.compatibilityCodes ?? [],
      fixtureDirectory,
    );

    for (const diagnostic of result.diagnostics) {
      assert.equal(typeof diagnostic.path, 'string', fixtureDirectory);
      assert.ok(diagnostic.path.length > 0, fixtureDirectory);
      assert.ok(diagnostic.message.length > 0, fixtureDirectory);
      assert.ok(
        ['error', 'warning', 'compatibility'].includes(diagnostic.severity),
        fixtureDirectory,
      );
    }
  }

  assert.deepEqual(snapshot(fixturesRoot), before);
});

test('manifest dispatch stops before semantic rules on parse and version errors', () => {
  const syntax = validatePatchManifest('schema_version: 2\n  invalid: indentation\n', {
    sourcePath: '/repo/syntax.yaml',
  });
  assert.equal(syntax.valid, false);
  assert.equal(syntax.schemaVersion, null);
  assert.deepEqual(codesFor(syntax, 'error'), [
    'PATCH_YAML_UNSUPPORTED_INDENTATION',
  ]);

  const unknown = validatePatchManifest('schema_version: 99\npatch_kind: spec\n', {
    sourcePath: 'C:\\repo\\unknown.yaml',
  });
  assert.equal(unknown.valid, false);
  assert.equal(unknown.schemaVersion, null);
  assert.deepEqual(codesFor(unknown, 'error'), [
    'PATCH_SCHEMA_VERSION_UNSUPPORTED',
  ]);
});

test('semantic diagnostics retain source paths and field lines', () => {
  const result = validatePatchManifest(`schema_version: 2
change_id: example
program_id: null
patch_mode: doc-anchored
status: active
created_at: 2026-06-14
closed_at: null
related_docs: []
creates_docs: []
bootstrap_context: null
`, { sourcePath: '/repo/patch.yaml' });

  assert.equal(result.valid, false);
  const diagnostic = result.diagnostics.find(
    ({ code }) => code === 'PATCH_V2_RELATED_DOCS_REQUIRED',
  );
  assert.ok(diagnostic);
  assert.equal(diagnostic.path, '/repo/patch.yaml');
  assert.equal(diagnostic.line, 8);
});

test('v1 shape enforcement rejects unknown fields and invalid scalar types', () => {
  const result = validatePatchManifest(`schema_version: 1
change_id: ""
program_id: null
patch_kind: invalid
lifecycle: spec-first
status: active
created_at: not-a-date
closed_at: null
related_docs: not-an-array
unexpected: value
`);

  assert.equal(result.valid, false);
  assert.deepEqual(codesFor(result, 'error'), [
    'PATCH_V1_FIELD_UNKNOWN',
    'PATCH_V1_CHANGE_ID_TYPE',
    'PATCH_V1_PROGRAM_ID_TYPE',
    'PATCH_V1_PATCH_KIND_INVALID',
    'PATCH_CREATED_AT_INVALID',
    'PATCH_RELATED_DOCS_INVALID',
  ]);
});

test('v2 shape enforcement rejects unknown fields, invalid enums, and invalid arrays', () => {
  const result = validatePatchManifest(`schema_version: 2
change_id: example
program_id: ""
patch_mode: unsupported
status: unknown
created_at: 2026/06/14
closed_at: null
related_docs:
  - ""
creates_docs: scalar
bootstrap_context: unexpected
extra: value
`);

  assert.equal(result.valid, false);
  assert.deepEqual(codesFor(result, 'error'), [
    'PATCH_V2_FIELD_UNKNOWN',
    'PATCH_V2_PROGRAM_ID_TYPE',
    'PATCH_V2_PATCH_MODE_INVALID',
    'PATCH_STATUS_INVALID',
    'PATCH_CREATED_AT_INVALID',
    'PATCH_RELATED_DOCS_INVALID',
    'PATCH_CREATES_DOCS_INVALID',
    'PATCH_V2_BOOTSTRAP_CONTEXT_INVALID',
  ]);
});

test('directory validation rejects missing manifests inside an allowed root', () => {
  const legacyFixture = join(fixturesRoot, 'patch-v1', 'legacy-read-only');
  assert.equal(existsSync(join(legacyFixture, 'patch.yaml')), false);

  const result = validatePatchDirectory(legacyFixture, {
    allowedRoots: [fixturesRoot],
  });
  assert.equal(result.valid, false);
  assert.deepEqual(codesFor(result, 'error'), ['PATCH_MANIFEST_REQUIRED']);
});
