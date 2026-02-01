import fs from 'fs-extra';
import path from 'path';
import { generatePackageJson } from './package-json.js';
import { generateConfigFiles } from './config.js';
import { generateSourceFiles } from './source.js';
import { generateGitignore } from './gitignore.js';
import { generateReadme } from './readme.js';

export async function createProjectStructure(projectPath, answers) {
  // Create root directory
  await fs.ensureDir(projectPath);

  // Create directory structure
  const dirs = [
    'src',
    'src/components',
    'src/assets',
    'src/lib',
    'src/styles',
    'public'
  ];

  if (answers.uiLibrary === 'shadcn') {
    dirs.push('src/components/ui');
  }

  if (answers.additionalTools.includes('vitest')) {
    dirs.push('tests');
  }

  if (answers.additionalTools.includes('github-actions')) {
    dirs.push('.github/workflows');
  }

  if (answers.additionalTools.includes('husky')) {
    dirs.push('.husky');
  }

  for (const dir of dirs) {
    await fs.ensureDir(path.join(projectPath, dir));
  }

  // Generate package.json
  const packageJson = generatePackageJson(answers);
  await fs.writeJSON(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });

  // Generate config files
  const configs = generateConfigFiles(answers);
  for (const [filename, content] of Object.entries(configs)) {
    await fs.writeFile(path.join(projectPath, filename), content);
  }

  // Generate source files
  const sourceFiles = generateSourceFiles(answers);
  for (const [filepath, content] of Object.entries(sourceFiles)) {
    const fullPath = path.join(projectPath, filepath);
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, content);
  }

  // Generate .gitignore
  const gitignore = generateGitignore(answers);
  await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore);

  // Generate README.md
  const readme = generateReadme(answers);
  await fs.writeFile(path.join(projectPath, 'README.md'), readme);

  // Create .env.example
  const envExample = `# API Configuration
VITE_API_URL=

# Add other environment variables as needed
`;
  await fs.writeFile(path.join(projectPath, '.env.example'), envExample);

  // Create public/favicon.ico placeholder (empty file)
  await fs.ensureFile(path.join(projectPath, 'public/favicon.ico'));
}