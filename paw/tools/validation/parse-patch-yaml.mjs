import { createDiagnostic } from './diagnostics.mjs';

function failure(code, message, path, line) {
  return {
    ok: false,
    value: null,
    locations: {},
    diagnostics: [createDiagnostic({ code, message, path, line })],
  };
}

function parseScalar(rawValue, path, line) {
  const value = rawValue.trim();

  if (value === '[]') return { ok: true, value: [] };
  if (value === 'null') return { ok: true, value: null };
  if (/^-?\d+$/.test(value)) return { ok: true, value: Number(value) };

  if (value.startsWith('"') || value.startsWith("'")) {
    const quote = value[0];
    if (value.length < 2 || !value.endsWith(quote)) {
      return {
        ok: false,
        diagnostic: createDiagnostic({
          code: 'PATCH_YAML_UNTERMINATED_QUOTE',
          message: 'Quoted scalar must end with the same quote character.',
          path,
          line,
        }),
      };
    }
    return { ok: true, value: value.slice(1, -1) };
  }

  if (
    value.startsWith('{') ||
    value.startsWith('[') ||
    /^[&*!]/.test(value) ||
    value === '|' ||
    value === '>'
  ) {
    return {
      ok: false,
      diagnostic: createDiagnostic({
        code: 'PATCH_YAML_UNSUPPORTED_VALUE',
        message:
          'Only simple scalars, null, [], and block arrays of simple scalars are supported.',
        path,
        line,
      }),
    };
  }

  return { ok: true, value };
}

export function parsePatchYaml(text, { sourcePath = 'patch.yaml' } = {}) {
  if (typeof text !== 'string') {
    return failure(
      'PATCH_YAML_INPUT_TYPE',
      'Patch YAML input must be a string.',
      sourcePath,
      null,
    );
  }

  const value = {};
  const locations = {};
  const diagnostics = [];
  let currentList = null;

  for (const [index, line] of text.split(/\r?\n/).entries()) {
    const lineNumber = index + 1;
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) continue;

    if (line.includes('\t')) {
      diagnostics.push(
        createDiagnostic({
          code: 'PATCH_YAML_UNSUPPORTED_INDENTATION',
          message: 'Tabs are not supported in patch manifests.',
          path: sourcePath,
          line: lineNumber,
        }),
      );
      continue;
    }

    const listItem = line.match(/^  -\s+(.+)$/);
    if (listItem) {
      if (currentList === null) {
        diagnostics.push(
          createDiagnostic({
            code: 'PATCH_YAML_ORPHAN_LIST_ITEM',
            message: 'List item requires an active top-level array key.',
            path: sourcePath,
            line: lineNumber,
          }),
        );
        continue;
      }

      const parsed = parseScalar(listItem[1], sourcePath, lineNumber);
      if (!parsed.ok) {
        diagnostics.push(parsed.diagnostic);
        continue;
      }
      if (Array.isArray(parsed.value)) {
        diagnostics.push(
          createDiagnostic({
            code: 'PATCH_YAML_NESTED_ARRAY',
            message: 'Nested arrays are not supported in patch manifests.',
            path: sourcePath,
            line: lineNumber,
          }),
        );
        continue;
      }

      value[currentList].push(parsed.value);
      locations[currentList].items.push({ line: lineNumber });
      continue;
    }

    if (/^\s/.test(line)) {
      diagnostics.push(
        createDiagnostic({
          code: 'PATCH_YAML_UNSUPPORTED_INDENTATION',
          message: 'Only top-level keys and two-space block array items are supported.',
          path: sourcePath,
          line: lineNumber,
        }),
      );
      currentList = null;
      continue;
    }

    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) {
      diagnostics.push(
        createDiagnostic({
          code: 'PATCH_YAML_UNSUPPORTED_LINE',
          message: 'Expected a top-level key followed by a colon.',
          path: sourcePath,
          line: lineNumber,
        }),
      );
      currentList = null;
      continue;
    }

    const [, key, rawValue] = match;
    if (Object.hasOwn(value, key)) {
      diagnostics.push(
        createDiagnostic({
          code: 'PATCH_YAML_DUPLICATE_KEY',
          message: `Duplicate top-level key "${key}".`,
          path: sourcePath,
          line: lineNumber,
        }),
      );
      currentList = null;
      continue;
    }

    if (rawValue === '') {
      value[key] = [];
      locations[key] = { line: lineNumber, items: [] };
      currentList = key;
      continue;
    }

    const parsed = parseScalar(rawValue, sourcePath, lineNumber);
    if (!parsed.ok) {
      diagnostics.push(parsed.diagnostic);
      currentList = null;
      continue;
    }

    value[key] = parsed.value;
    locations[key] = { line: lineNumber };
    currentList = Array.isArray(parsed.value) ? key : null;
    if (currentList !== null) locations[key].items = [];
  }

  if (diagnostics.length > 0) {
    return {
      ok: false,
      value: null,
      locations,
      diagnostics,
    };
  }

  return {
    ok: true,
    value,
    locations,
    diagnostics: [],
  };
}
