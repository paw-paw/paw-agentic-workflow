function usageError(message) {
  return { ok: false, message };
}

export function parseValidatorArgs(args) {
  const options = {
    help: false,
    version: false,
    json: false,
    fixtures: false,
    root: null,
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--help') {
      options.help = true;
    } else if (argument === '--version') {
      options.version = true;
    } else if (argument === '--json') {
      options.json = true;
    } else if (argument === '--fixtures') {
      options.fixtures = true;
    } else if (argument === '--root') {
      if (options.root !== null) return usageError('--root may be specified only once.');
      const value = args[index + 1];
      if (!value || value.startsWith('--')) {
        return usageError('--root requires a path value.');
      }
      options.root = value;
      index += 1;
    } else {
      return usageError(`Unknown argument: ${argument}`);
    }
  }

  if (
    (options.help || options.version) &&
    (options.json || options.fixtures || options.root !== null)
  ) {
    return usageError('--help and --version cannot be combined with execution flags.');
  }
  if (options.help && options.version) {
    return usageError('--help and --version are mutually exclusive.');
  }

  return { ok: true, options };
}
