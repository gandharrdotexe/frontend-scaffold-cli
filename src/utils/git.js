import { execa } from 'execa';
import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

export async function initializeGit(projectPath) {
  const spinner = ora('Initializing git repository...').start();
  
  try {
    // Check if git is available
    await execa('git', ['--version']);
    
    // Initialize git repo
    await execa('git', ['init'], { cwd: projectPath });
    
    // Create initial commit
    await execa('git', ['add', '.'], { cwd: projectPath });
    await execa('git', ['commit', '-m', 'Initial commit from create-frontend-app'], { 
      cwd: projectPath,
      stdio: 'pipe'
    });
    
    spinner.succeed('Git repository initialized');
  } catch (error) {
    spinner.warn('Git initialization skipped (git not found)');
  }
}