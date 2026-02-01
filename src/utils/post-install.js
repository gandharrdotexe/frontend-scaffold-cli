import { execa } from 'execa';
import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

export async function runPostInstallTasks(projectPath, answers) {
  // Initialize shadcn/ui if selected
  if (answers.uiLibrary === 'shadcn') {
    await initializeShadcn(projectPath, answers);
  }

  // Initialize Husky if selected
  if (answers.additionalTools.includes('husky')) {
    await initializeHusky(projectPath, answers);
  }

  // Initialize Playwright if selected
  if (answers.additionalTools.includes('playwright')) {
    await initializePlaywright(projectPath, answers);
  }
}

async function initializeShadcn(projectPath, answers) {
  const spinner = ora('Setting up shadcn/ui...').start();
  
  try {
    // Add a basic button component
    const buttonCode = `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
`;

    await fs.writeFile(
      path.join(projectPath, 'src/components/ui/button.' + (answers.typescript ? 'tsx' : 'jsx')),
      buttonCode
    );

    // Install radix-ui slot dependency
    const pm = answers.packageManager;
    await execa(pm, [pm === 'npm' ? 'install' : 'add', '@radix-ui/react-slot'], {
      cwd: projectPath,
      stdio: 'pipe'
    });

    spinner.succeed('shadcn/ui configured successfully');
  } catch (error) {
    spinner.warn('shadcn/ui setup encountered issues');
    console.log(chalk.yellow('You may need to manually run: npx shadcn-ui@latest init'));
  }
}

async function initializeHusky(projectPath, answers) {
  const spinner = ora('Setting up Husky...').start();
  
  try {
    const pm = answers.packageManager;
    await execa(pm, ['run', 'prepare'], {
      cwd: projectPath,
      stdio: 'pipe'
    });
    
    // Make pre-commit hook executable
    const hookPath = path.join(projectPath, '.husky/pre-commit');
    if (await fs.pathExists(hookPath)) {
      await fs.chmod(hookPath, 0o755);
    }
    
    spinner.succeed('Husky configured successfully');
  } catch (error) {
    spinner.warn('Husky setup encountered issues');
  }
}

async function initializePlaywright(projectPath, answers) {
  const spinner = ora('Setting up Playwright...').start();
  
  try {
    const pm = answers.packageManager;
    await execa('npx', ['playwright', 'install', '--with-deps'], {
      cwd: projectPath,
      stdio: 'pipe'
    });
    
    spinner.succeed('Playwright configured successfully');
  } catch (error) {
    spinner.warn('Playwright setup encountered issues');
    console.log(chalk.yellow('You may need to manually run: npx playwright install'));
  }
}