#!/usr/bin/env node

import { program } from 'commander';
import { scaffold } from '../src/commands/scaffold.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf-8')
);

program
  .version(packageJson.version)
  .description('Create modern frontend applications')
  .argument('[project-name]', 'Project name')
  .option('-t, --template <template>', 'Use a predefined template')
  .option('--skip-git', 'Skip git initialization')
  .option('--skip-install', 'Skip dependency installation')
  .action(async (projectName, options) => {
    await scaffold(projectName, options);
  });

program.parse();