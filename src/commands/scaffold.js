import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import validateProjectName from 'validate-npm-package-name';
import { collectAnswers } from '../prompts/index.js';
import { createProjectStructure } from '../generators/structure.js';
import { installDependencies } from '../utils/dependencies.js';
import { initializeGit } from '../utils/git.js';
import { runPostInstallTasks } from '../utils/post-install.js';
import { templates } from '../templates/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function scaffold(projectName, options) {
  console.log(chalk.cyan.bold('\n┌─────────────────────────────────────────┐'));
  console.log(chalk.cyan.bold('│  Create Frontend App v1.0.0             │'));
  console.log(chalk.cyan.bold('└─────────────────────────────────────────┘\n'));

  let answers = {};

  // Handle template mode
  if (options.template) {
    const template = templates[options.template];
    if (!template) {
      console.log(chalk.red(`❌ Template "${options.template}" not found.`));
      console.log(chalk.yellow('\nAvailable templates:'));
      Object.keys(templates).forEach(key => {
        console.log(chalk.cyan(`  - ${key}: ${templates[key].description}`));
      });
      process.exit(1);
    }
    
    answers = { ...template.config };
    
    // Still need to get project name if not provided
    if (!projectName) {
      const { projectName: name } = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name:',
          default: 'my-app',
          validate: (input) => {
            const validation = validateProjectName(input);
            if (!validation.validForNewPackages) {
              return validation.errors?.[0] || 'Invalid package name';
            }
            return true;
          }
        }
      ]);
      projectName = name;
    }
    
    answers.projectName = projectName;
    console.log(chalk.green(`\n✓ Using template: ${options.template}\n`));
  } else {
    // Interactive mode
    answers = await collectAnswers(projectName);
  }

  const projectPath = path.join(process.cwd(), answers.projectName);

  try {
    // Create project structure
    const spinner = ora('Creating project structure...').start();
    await createProjectStructure(projectPath, answers);
    spinner.succeed('Created project structure');

    // Install dependencies
    if (!options.skipInstall) {
      await installDependencies(projectPath, answers);
    } else {
      console.log(chalk.yellow('⚠ Skipping dependency installation'));
    }

    // Initialize git
    if (!options.skipGit) {
      await initializeGit(projectPath);
    } else {
      console.log(chalk.yellow('⚠ Skipping git initialization'));
    }

    // Run post-install tasks
    if (!options.skipInstall) {
      await runPostInstallTasks(projectPath, answers);
    }

    // Success message
    console.log(chalk.green.bold('\n✨ Success! Created ' + answers.projectName + ' at ' + projectPath));
    console.log(chalk.cyan('\nNext steps:'));
    console.log(chalk.white(`  cd ${answers.projectName}`));
    
    if (options.skipInstall) {
      console.log(chalk.white(`  ${answers.packageManager} install`));
    }
    
    console.log(chalk.white(`  ${answers.packageManager} run dev`));
    console.log(chalk.cyan('\nHappy coding! 🚀\n'));

  } catch (error) {
    console.error(chalk.red('\n❌ Error creating project:'), error.message);
    process.exit(1);
  }
}