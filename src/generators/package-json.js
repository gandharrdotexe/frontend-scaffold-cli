export function generatePackageJson(answers) {
    const packageJson = {
      name: answers.projectName,
      private: true,
      version: '0.0.0',
      type: 'module',
      scripts: {}
    };
  
    // Framework-specific scripts
    if (answers.framework === 'react-vite' || answers.framework === 'vue-vite' || 
        answers.framework === 'solid-vite' || answers.framework === 'vanilla-vite') {
      packageJson.scripts = {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview'
      };
    } else if (answers.framework === 'nextjs') {
      packageJson.scripts = {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint'
      };
    } else if (answers.framework === 'nuxt') {
      packageJson.scripts = {
        dev: 'nuxt dev',
        build: 'nuxt build',
        generate: 'nuxt generate',
        preview: 'nuxt preview'
      };
    } else if (answers.framework === 'sveltekit') {
      packageJson.scripts = {
        dev: 'vite dev',
        build: 'vite build',
        preview: 'vite preview'
      };
    }
  
    // Add linting scripts
    if (answers.additionalTools.includes('eslint')) {
      packageJson.scripts.lint = packageJson.scripts.lint || 'eslint .';
    }
  
    if (answers.additionalTools.includes('prettier')) {
      packageJson.scripts.format = 'prettier --write .';
    }
  
    if (answers.additionalTools.includes('vitest')) {
      packageJson.scripts.test = 'vitest';
      packageJson.scripts['test:ui'] = 'vitest --ui';
      packageJson.scripts.coverage = 'vitest --coverage';
    }
  
    if (answers.additionalTools.includes('playwright')) {
      packageJson.scripts['test:e2e'] = 'playwright test';
    }
  
    // Dependencies
    packageJson.dependencies = {};
    packageJson.devDependencies = {};
  
    // Framework dependencies
    if (answers.framework === 'react-vite') {
      packageJson.dependencies.react = '^18.3.1';
      packageJson.dependencies['react-dom'] = '^18.3.1';
      packageJson.devDependencies['@vitejs/plugin-react'] = '^4.3.1';
      packageJson.devDependencies.vite = '^5.4.2';
      
      if (answers.typescript) {
        packageJson.devDependencies['@types/react'] = '^18.3.3';
        packageJson.devDependencies['@types/react-dom'] = '^18.3.0';
        packageJson.devDependencies.typescript = '^5.5.3';
      }
    } else if (answers.framework === 'nextjs') {
      packageJson.dependencies.next = '^14.2.5';
      packageJson.dependencies.react = '^18.3.1';
      packageJson.dependencies['react-dom'] = '^18.3.1';
      
      if (answers.typescript) {
        packageJson.devDependencies['@types/node'] = '^20.14.10';
        packageJson.devDependencies['@types/react'] = '^18.3.3';
        packageJson.devDependencies['@types/react-dom'] = '^18.3.0';
        packageJson.devDependencies.typescript = '^5.5.3';
      }
    } else if (answers.framework === 'vue-vite') {
      packageJson.dependencies.vue = '^3.4.31';
      packageJson.devDependencies['@vitejs/plugin-vue'] = '^5.1.0';
      packageJson.devDependencies.vite = '^5.4.2';
      
      if (answers.typescript) {
        packageJson.devDependencies.typescript = '^5.5.3';
        packageJson.devDependencies['vue-tsc'] = '^2.0.26';
      }
    }
  
    // CSS Framework dependencies
    if (answers.cssFramework === 'tailwind') {
      packageJson.devDependencies.tailwindcss = '^3.4.7';
      packageJson.devDependencies.postcss = '^8.4.40';
      packageJson.devDependencies.autoprefixer = '^10.4.19';
    } else if (answers.cssFramework === 'sass') {
      packageJson.devDependencies.sass = '^1.77.8';
    } else if (answers.cssFramework === 'styled-components') {
      packageJson.dependencies['styled-components'] = '^6.1.11';
    } else if (answers.cssFramework === 'emotion') {
      packageJson.dependencies['@emotion/react'] = '^11.13.0';
      packageJson.dependencies['@emotion/styled'] = '^11.13.0';
    }
  
    // UI Library dependencies
    if (answers.uiLibrary === 'shadcn') {
      packageJson.dependencies['class-variance-authority'] = '^0.7.0';
      packageJson.dependencies.clsx = '^2.1.1';
      packageJson.dependencies['tailwind-merge'] = '^2.4.0';
      packageJson.dependencies['lucide-react'] = '^0.412.0';
      packageJson.devDependencies['tailwindcss-animate'] = '^1.0.7';
    } else if (answers.uiLibrary === 'mui') {
      packageJson.dependencies['@mui/material'] = '^5.16.5';
      packageJson.dependencies['@emotion/react'] = '^11.13.0';
      packageJson.dependencies['@emotion/styled'] = '^11.13.0';
    } else if (answers.uiLibrary === 'antd') {
      packageJson.dependencies.antd = '^5.19.3';
    } else if (answers.uiLibrary === 'chakra') {
      packageJson.dependencies['@chakra-ui/react'] = '^2.8.2';
      packageJson.dependencies['@emotion/react'] = '^11.13.0';
      packageJson.dependencies['@emotion/styled'] = '^11.13.0';
      packageJson.dependencies['framer-motion'] = '^11.3.17';
    } else if (answers.uiLibrary === 'daisyui') {
      packageJson.devDependencies.daisyui = '^4.12.10';
    }
  
    // Additional tools
    if (answers.additionalTools.includes('eslint')) {
      packageJson.devDependencies.eslint = '^8.57.0';
      
      if (answers.framework.startsWith('react') || answers.framework === 'nextjs') {
        packageJson.devDependencies['eslint-plugin-react'] = '^7.35.0';
        packageJson.devDependencies['eslint-plugin-react-hooks'] = '^4.6.2';
      }
    }
  
    if (answers.additionalTools.includes('prettier')) {
      packageJson.devDependencies.prettier = '^3.3.3';
      
      if (answers.cssFramework === 'tailwind') {
        packageJson.devDependencies['prettier-plugin-tailwindcss'] = '^0.6.5';
      }
    }
  
    if (answers.additionalTools.includes('husky')) {
      packageJson.devDependencies.husky = '^9.1.4';
      packageJson.devDependencies['lint-staged'] = '^15.2.7';
      packageJson.scripts.prepare = 'husky install';
    }
  
    if (answers.additionalTools.includes('vitest')) {
      packageJson.devDependencies.vitest = '^2.0.4';
      packageJson.devDependencies['@vitest/ui'] = '^2.0.4';
      
      if (answers.framework.startsWith('react')) {
        packageJson.devDependencies['@testing-library/react'] = '^16.0.0';
        packageJson.devDependencies['@testing-library/jest-dom'] = '^6.4.6';
      }
    }
  
    if (answers.additionalTools.includes('playwright')) {
      packageJson.devDependencies['@playwright/test'] = '^1.45.3';
    }
  
    return packageJson;
  }