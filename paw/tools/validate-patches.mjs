#!/usr/bin/env node
import { runValidatorCli } from './cli/run-validator-cli.mjs';

process.exitCode = runValidatorCli(process.argv.slice(2));
