import { execa } from 'execa';
import ora from 'ora';
import chalk from 'chalk';

export async function installDependencies(projectPath, answers) {
  const spinner = ora('Installing dependencies... (this may take a minute)').start();
  
  const pm = answers.packageManager;
  const installCmd = pm === 'npm' ? 'install' : pm === 'yarn' ? 'install' : 'install';
  
  try {
    await execa(pm, [installCmd], {
      cwd: projectPath,
      stdio: 'pipe'
    });
    
    spinner.succeed('Dependencies installed successfully');
  } catch (error) {
    spinner.fail('Failed to install dependencies');
    console.error(chalk.red('Error:'), error.message);
    console.log(chalk.yellow('\nYou can manually install dependencies later by running:'));
    console.log(chalk.cyan(`  cd ${answers.projectName}`));
    console.log(chalk.cyan(`  ${pm} install`));
  }
}