import inquirer from 'inquirer';
import validateProjectName from 'validate-npm-package-name';
import { execa } from 'execa';

export async function collectAnswers(initialProjectName) {
  const answers = {};

  // Detect package manager
  const detectedPm = await detectPackageManager();

  // Project name
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: initialProjectName || 'my-app',
      validate: (input) => {
        const validation = validateProjectName(input);
        if (!validation.validForNewPackages) {
          return validation.errors?.[0] || 'Invalid package name';
        }
        return true;
      }
    }
  ]);
  answers.projectName = projectName;

  // Framework selection
  const { framework } = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'Which framework would you like to use?',
      choices: [
        { name: 'React (Vite)', value: 'react-vite' },
        { name: 'React (Next.js)', value: 'nextjs' },
        { name: 'Vue (Vite)', value: 'vue-vite' },
        { name: 'Vue (Nuxt)', value: 'nuxt' },
        { name: 'Svelte (SvelteKit)', value: 'sveltekit' },
        { name: 'Solid (Vite)', value: 'solid-vite' },
        { name: 'Vanilla (Vite)', value: 'vanilla-vite' }
      ],
      default: 'react-vite'
    }
  ]);
  answers.framework = framework;

  // TypeScript
  const { typescript } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'typescript',
      message: 'Would you like to use TypeScript?',
      default: true
    }
  ]);
  answers.typescript = typescript;

  // CSS Framework
  const { cssFramework } = await inquirer.prompt([
    {
      type: 'list',
      name: 'cssFramework',
      message: 'Which CSS solution would you like to use?',
      choices: [
        { name: 'Tailwind CSS', value: 'tailwind' },
        { name: 'CSS Modules', value: 'css-modules' },
        { name: 'Sass/SCSS', value: 'sass' },
        { name: 'Styled Components', value: 'styled-components' },
        { name: 'Emotion', value: 'emotion' },
        { name: 'Vanilla CSS', value: 'vanilla' },
        { name: 'None', value: 'none' }
      ],
      default: 'tailwind'
    }
  ]);
  answers.cssFramework = cssFramework;

  // UI Component Library (conditional based on framework and CSS)
  const uiLibraryChoices = getUILibraryChoices(framework, cssFramework);
  
  if (uiLibraryChoices.length > 0) {
    const { uiLibrary } = await inquirer.prompt([
      {
        type: 'list',
        name: 'uiLibrary',
        message: 'Would you like to add a UI component library?',
        choices: [...uiLibraryChoices, { name: 'None', value: 'none' }],
        default: 'none'
      }
    ]);
    answers.uiLibrary = uiLibrary;
  } else {
    answers.uiLibrary = 'none';
  }

  // Additional tools
  const { additionalTools } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'additionalTools',
      message: 'Select additional tools:',
      choices: [
        { name: 'ESLint (code linting)', value: 'eslint', checked: true },
        { name: 'Prettier (code formatting)', value: 'prettier', checked: true },
        { name: 'Husky (Git hooks)', value: 'husky' },
        { name: 'Vitest (testing)', value: 'vitest' },
        { name: 'Playwright (E2E testing)', value: 'playwright' },
        { name: 'Docker (containerization)', value: 'docker' },
        { name: 'GitHub Actions (CI/CD)', value: 'github-actions' }
      ]
    }
  ]);
  answers.additionalTools = additionalTools;

  // Package manager
  const { packageManager } = await inquirer.prompt([
    {
      type: 'list',
      name: 'packageManager',
      message: 'Which package manager would you like to use?',
      choices: [
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' },
        { name: 'pnpm', value: 'pnpm' },
        { name: 'bun', value: 'bun' }
      ],
      default: detectedPm
    }
  ]);
  answers.packageManager = packageManager;

  return answers;
}

function getUILibraryChoices(framework, cssFramework) {
  const choices = [];

  if (framework.startsWith('react') || framework === 'nextjs') {
    if (cssFramework === 'tailwind') {
      choices.push({ name: 'shadcn/ui', value: 'shadcn' });
      choices.push({ name: 'DaisyUI', value: 'daisyui' });
    }
    choices.push({ name: 'Material-UI (MUI)', value: 'mui' });
    choices.push({ name: 'Ant Design', value: 'antd' });
    choices.push({ name: 'Chakra UI', value: 'chakra' });
  }

  if (framework.startsWith('vue') || framework === 'nuxt') {
    choices.push({ name: 'Vuetify', value: 'vuetify' });
    choices.push({ name: 'PrimeVue', value: 'primevue' });
    if (cssFramework === 'tailwind') {
      choices.push({ name: 'DaisyUI', value: 'daisyui' });
    }
  }

  return choices;
}

async function detectPackageManager() {
  try {
    await execa('bun', ['--version']);
    return 'bun';
  } catch {}

  try {
    await execa('pnpm', ['--version']);
    return 'pnpm';
  } catch {}

  try {
    await execa('yarn', ['--version']);
    return 'yarn';
  } catch {}

  return 'npm';
}