import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { detectSchemaVersion } from '../../tools/validation/detect-schema-version.mjs';
import { parsePatchYaml } from '../../tools/validation/parse-patch-yaml.mjs';

const schemaPath = fileURLToPath(
  new URL('../../tools/schemas/patch-v2.schema.json', import.meta.url),
);
const parserPath = fileURLToPath(
  new URL('../../tools/validation/parse-patch-yaml.mjs', import.meta.url),
);
const detectorPath = fileURLToPath(
  new URL('../../tools/validation/detect-schema-version.mjs', import.meta.url),
);

function parse(text, sourcePath = 'fixtures/patch.yaml') {
  return parsePatchYaml(text, { sourcePath });
}

test('parses the supported scalar, array, comment, LF, and CRLF forms', () => {
  const lf = parse(`# comment
schema_version: 2
change_id: sample
program_id: null
related_docs:
  - docs/README.md
creates_docs: []
`);
  assert.equal(lf.ok, true);
  assert.deepEqual(lf.value, {
    schema_version: 2,
    change_id: 'sample',
    program_id: null,
    related_docs: ['docs/README.md'],
    creates_docs: [],
  });
  assert.deepEqual(lf.locations.related_docs, {
    line: 5,
    items: [{ line: 6 }],
  });

  const crlf = parse(
    "schema_version: 1\r\nchange_id: 'quoted-id'\r\nrelated_docs:\r\n  - README.md\r\n",
  );
  assert.equal(crlf.ok, true);
  assert.equal(crlf.value.change_id, 'quoted-id');
  assert.deepEqual(crlf.value.related_docs, ['README.md']);
});

test('reports duplicate keys with structured source metadata', () => {
  const result = parse('schema_version: 1\nschema_version: 2\n', 'C:\\repo\\patch.yaml');

  assert.equal(result.ok, false);
  assert.deepEqual(result.diagnostics[0], {
    code: 'PATCH_YAML_DUPLICATE_KEY',
    severity: 'error',
    path: 'C:\\repo\\patch.yaml',
    line: 2,
    message: 'Duplicate top-level key "schema_version".',
  });
});

test('rejects orphan list items and unsupported YAML syntax', () => {
  const cases = [
    ['  - orphan', 'PATCH_YAML_ORPHAN_LIST_ITEM'],
    ['nested:\n    child: value', 'PATCH_YAML_UNSUPPORTED_INDENTATION'],
    ['value: { nested: true }', 'PATCH_YAML_UNSUPPORTED_VALUE'],
    ['value: [one, two]', 'PATCH_YAML_UNSUPPORTED_VALUE'],
    ['value: &anchor item', 'PATCH_YAML_UNSUPPORTED_VALUE'],
    ['value: *anchor', 'PATCH_YAML_UNSUPPORTED_VALUE'],
    ['value: !tag item', 'PATCH_YAML_UNSUPPORTED_VALUE'],
    ['value: |', 'PATCH_YAML_UNSUPPORTED_VALUE'],
    ['value:\n  - []', 'PATCH_YAML_NESTED_ARRAY'],
    ['value: "unterminated', 'PATCH_YAML_UNTERMINATED_QUOTE'],
    ['value:\titem', 'PATCH_YAML_UNSUPPORTED_INDENTATION'],
  ];

  for (const [source, expectedCode] of cases) {
    const result = parse(source);
    assert.equal(result.ok, false, source);
    assert.equal(result.diagnostics[0].code, expectedCode, source);
    assert.equal(result.diagnostics[0].path, 'fixtures/patch.yaml', source);
    assert.ok(result.diagnostics[0].line, source);
    assert.ok(result.diagnostics[0].message.length > 0, source);
  }
});

test('detects unambiguous v1 and v2 manifests', () => {
  const v1 = parse('schema_version: 1\npatch_kind: spec\nlifecycle: spec-first\n');
  const v2 = parse(
    'schema_version: 2\npatch_mode: intention-first\ncreates_docs: []\nbootstrap_context: null\n',
  );

  assert.deepEqual(
    detectSchemaVersion(v1.value, { locations: v1.locations }),
    { ok: true, schemaVersion: 1, diagnostics: [] },
  );
  assert.deepEqual(
    detectSchemaVersion(v2.value, { locations: v2.locations }),
    { ok: true, schemaVersion: 2, diagnostics: [] },
  );
});

test('rejects missing and unsupported schema versions before dispatch', () => {
  const missing = parse('change_id: sample\n');
  const unsupported = parse('schema_version: 3\nchange_id: sample\n');

  const missingDetection = detectSchemaVersion(missing.value, {
    sourcePath: '/repo/missing.yaml',
    locations: missing.locations,
  });
  assert.equal(missingDetection.ok, false);
  assert.equal(missingDetection.schemaVersion, null);
  assert.equal(missingDetection.diagnostics[0].code, 'PATCH_SCHEMA_VERSION_MISSING');
  assert.equal(missingDetection.diagnostics[0].path, '/repo/missing.yaml');
  assert.equal(missingDetection.diagnostics[0].line, null);

  const unsupportedDetection = detectSchemaVersion(unsupported.value, {
    locations: unsupported.locations,
  });
  assert.equal(unsupportedDetection.ok, false);
  assert.equal(
    unsupportedDetection.diagnostics[0].code,
    'PATCH_SCHEMA_VERSION_UNSUPPORTED',
  );
  assert.equal(unsupportedDetection.diagnostics[0].line, 1);
});

test('rejects hybrid and version-incompatible axes in both directions', () => {
  const cases = [
    [
      'schema_version: 1\npatch_kind: spec\npatch_mode: doc-anchored\n',
      'PATCH_SCHEMA_AXES_HYBRID',
    ],
    [
      'schema_version: 2\nlifecycle: spec-first\ncreates_docs: []\n',
      'PATCH_SCHEMA_AXES_HYBRID',
    ],
    [
      'schema_version: 1\nbootstrap_context: null\n',
      'PATCH_SCHEMA_V1_HAS_V2_FIELDS',
    ],
    [
      'schema_version: 2\npatch_kind: spec\n',
      'PATCH_SCHEMA_V2_HAS_V1_FIELDS',
    ],
  ];

  for (const [source, expectedCode] of cases) {
    const parsed = parse(source);
    const result = detectSchemaVersion(parsed.value, {
      sourcePath: 'hybrid/patch.yaml',
      locations: parsed.locations,
    });
    assert.equal(result.ok, false, source);
    assert.equal(result.schemaVersion, null, source);
    assert.equal(result.diagnostics[0].code, expectedCode, source);
    assert.equal(result.diagnostics[0].path, 'hybrid/patch.yaml', source);
    assert.ok(result.diagnostics[0].line, source);
  }
});

test('v2 schema declares the ten contractual fields and approved enums', () => {
  const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
  const expectedFields = [
    'schema_version',
    'change_id',
    'program_id',
    'patch_mode',
    'status',
    'created_at',
    'closed_at',
    'related_docs',
    'creates_docs',
    'bootstrap_context',
  ];

  assert.equal(schema.$schema, 'https://json-schema.org/draft/2020-12/schema');
  assert.equal(schema.additionalProperties, false);
  assert.deepEqual(schema.required, expectedFields);
  assert.deepEqual(Object.keys(schema.properties), expectedFields);
  assert.deepEqual(schema.properties.schema_version.enum, [2]);
  assert.deepEqual(schema.properties.patch_mode.enum, [
    'docs-bootstrap',
    'intention-first',
    'doc-anchored',
  ]);
  assert.deepEqual(schema.properties.status.enum, [
    'active',
    'blocked',
    'closed',
    'abandoned',
  ]);
  assert.deepEqual(schema.properties.bootstrap_context.anyOf[0].enum, [
    'pure-greenfield',
    'undocumented-brownfield',
  ]);
});

test('parser and detector modules do not import filesystem or execute a CLI', () => {
  for (const path of [parserPath, detectorPath]) {
    const source = readFileSync(path, 'utf8');
    assert.doesNotMatch(source, /node:fs|process\.argv|process\.exit|spawnSync|execFile/);
  }
});
