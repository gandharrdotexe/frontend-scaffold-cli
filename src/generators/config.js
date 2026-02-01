export function generateConfigFiles(answers) {
    const configs = {};
  
    // Vite config
    if (answers.framework.includes('vite')) {
      configs['vite.config.' + (answers.typescript ? 'ts' : 'js')] = generateViteConfig(answers);
    }
  
    // TypeScript config
    if (answers.typescript) {
      configs['tsconfig.json'] = generateTsConfig(answers);
      
      if (answers.framework.startsWith('react') || answers.framework === 'nextjs') {
        configs['tsconfig.node.json'] = JSON.stringify({
          compilerOptions: {
            composite: true,
            skipLibCheck: true,
            module: 'ESNext',
            moduleResolution: 'bundler',
            allowSyntheticDefaultImports: true
          },
          include: ['vite.config.ts']
        }, null, 2);
      }
    }
  
    // Tailwind config
    if (answers.cssFramework === 'tailwind') {
      configs['tailwind.config.js'] = generateTailwindConfig(answers);
      configs['postcss.config.js'] = `export default {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
  `;
    }
  
    // ESLint config
    if (answers.additionalTools.includes('eslint')) {
      configs['.eslintrc.json'] = generateEslintConfig(answers);
    }
  
    // Prettier config
    if (answers.additionalTools.includes('prettier')) {
      configs['.prettierrc'] = generatePrettierConfig(answers);
      configs['.prettierignore'] = `# Dependencies
  node_modules
  
  # Production
  dist
  build
  .next
  out
  
  # Misc
  .cache
  coverage
  `;
    }
  
    // Vitest config
    if (answers.additionalTools.includes('vitest')) {
      configs['vitest.config.' + (answers.typescript ? 'ts' : 'js')] = generateVitestConfig(answers);
    }
  
    // Playwright config
    if (answers.additionalTools.includes('playwright')) {
      configs['playwright.config.' + (answers.typescript ? 'ts' : 'js')] = generatePlaywrightConfig(answers);
    }
  
    // Docker files
    if (answers.additionalTools.includes('docker')) {
      configs['Dockerfile'] = generateDockerfile(answers);
      configs['.dockerignore'] = `node_modules
  npm-debug.log
  .git
  .gitignore
  README.md
  .env
  .DS_Store
  `;
    }
  
    // GitHub Actions
    if (answers.additionalTools.includes('github-actions')) {
      configs['.github/workflows/ci.yml'] = generateGithubActions(answers);
    }
  
    // shadcn/ui config
    if (answers.uiLibrary === 'shadcn') {
      configs['components.json'] = generateShadcnConfig(answers);
    }
  
    // Next.js config
    if (answers.framework === 'nextjs') {
      configs['next.config.' + (answers.typescript ? 'ts' : 'js')] = generateNextConfig(answers);
    }
  
    // Husky
    if (answers.additionalTools.includes('husky')) {
      configs['.husky/pre-commit'] = `#!/usr/bin/env sh
  . "$(dirname -- "$0")/_/husky.sh"
  
  npx lint-staged
  `;
      configs['.lintstagedrc.json'] = JSON.stringify({
        "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
        "*.{json,css,md}": ["prettier --write"]
      }, null, 2);
    }
  
    return configs;
  }
  
  function generateViteConfig(answers) {
    const isTS = answers.typescript;
    const ext = isTS ? 'ts' : 'js';
    
    let plugin = '';
    let imports = `import { defineConfig } from 'vite'\n`;
    
    if (answers.framework === 'react-vite') {
      imports += `import react from '@vitejs/plugin-react'\n`;
      plugin = 'react()';
    } else if (answers.framework === 'vue-vite') {
      imports += `import vue from '@vitejs/plugin-vue'\n`;
      plugin = 'vue()';
    }
    
    if (answers.uiLibrary === 'shadcn') {
      imports += `import path from 'path'\n`;
    }
  
    let config = `${imports}
  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [${plugin}],`;
  
    if (answers.uiLibrary === 'shadcn') {
      config += `
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },`;
    }
  
    config += `
  })
  `;
  
    return config;
  }
  
  function generateTsConfig(answers) {
    const config = {
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true
      },
      include: ['src']
    };
  
    if (answers.framework.startsWith('react') || answers.framework === 'nextjs') {
      config.compilerOptions.jsx = 'react-jsx';
    }
  
    if (answers.uiLibrary === 'shadcn') {
      config.compilerOptions.baseUrl = '.';
      config.compilerOptions.paths = {
        '@/*': ['./src/*']
      };
    }
  
    return JSON.stringify(config, null, 2);
  }
  
  function generateTailwindConfig(answers) {
    let content = `/** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],`;
  
    if (answers.uiLibrary === 'daisyui') {
      content += `
    plugins: [require("daisyui")],`;
    } else if (answers.uiLibrary === 'shadcn') {
      content += `
    theme: {
      extend: {},
    },
    plugins: [require("tailwindcss-animate")],`;
    } else {
      content += `
    theme: {
      extend: {},
    },
    plugins: [],`;
    }
  
    content += `
  }
  `;
  
    return content;
  }
  
  function generateEslintConfig(answers) {
    const config = {
      env: {
        browser: true,
        es2021: true,
        node: true
      },
      extends: ['eslint:recommended'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      rules: {}
    };
  
    if (answers.typescript) {
      config.extends.push('plugin:@typescript-eslint/recommended');
      config.parser = '@typescript-eslint/parser';
      config.plugins = ['@typescript-eslint'];
    }
  
    if (answers.framework.startsWith('react') || answers.framework === 'nextjs') {
      config.extends.push('plugin:react/recommended', 'plugin:react-hooks/recommended');
      config.plugins = config.plugins || [];
      config.plugins.push('react', 'react-hooks');
      config.settings = {
        react: {
          version: 'detect'
        }
      };
      config.rules['react/react-in-jsx-scope'] = 'off';
    }
  
    return JSON.stringify(config, null, 2);
  }
  
  function generatePrettierConfig(answers) {
    const config = {
      semi: true,
      trailingComma: 'es5',
      singleQuote: true,
      printWidth: 80,
      tabWidth: 2,
      useTabs: false
    };
  
    if (answers.cssFramework === 'tailwind') {
      config.plugins = ['prettier-plugin-tailwindcss'];
    }
  
    return JSON.stringify(config, null, 2);
  }
  
  function generateVitestConfig(answers) {
    return `import { defineConfig } from 'vitest/config'
  
  export default defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './tests/setup.${answers.typescript ? 'ts' : 'js'}',
    },
  })
  `;
  }
  
  function generatePlaywrightConfig(answers) {
    return `import { defineConfig, devices } from '@playwright/test';
  
  export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
      baseURL: 'http://localhost:5173',
      trace: 'on-first-retry',
    },
    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
    ],
    webServer: {
      command: '${answers.packageManager} run dev',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
    },
  });
  `;
  }
  
  function generateDockerfile(answers) {
    return `# Build stage
  FROM node:18-alpine AS builder
  
  WORKDIR /app
  
  COPY package*.json ./
  RUN npm ci
  
  COPY . .
  RUN npm run build
  
  # Production stage
  FROM nginx:alpine
  
  COPY --from=builder /app/dist /usr/share/nginx/html
  
  EXPOSE 80
  
  CMD ["nginx", "-g", "daemon off;"]
  `;
  }
  
  function generateGithubActions(answers) {
    return `name: CI
  
  on:
    push:
      branches: [ main ]
    pull_request:
      branches: [ main ]
  
  jobs:
    build:
      runs-on: ubuntu-latest
  
      steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: '${answers.packageManager}'
      
      - name: Install dependencies
        run: ${answers.packageManager} ${answers.packageManager === 'npm' ? 'ci' : 'install'}
      
      ${answers.additionalTools.includes('eslint') ? `- name: Lint
        run: ${answers.packageManager} run lint
      ` : ''}
      ${answers.additionalTools.includes('vitest') ? `- name: Test
        run: ${answers.packageManager} run test
      ` : ''}
      - name: Build
        run: ${answers.packageManager} run build
  `;
  }
  
  function generateShadcnConfig(answers) {
    return JSON.stringify({
      "$schema": "https://ui.shadcn.com/schema.json",
      "style": "default",
      "rsc": false,
      "tsx": answers.typescript,
      "tailwind": {
        "config": "tailwind.config.js",
        "css": "src/styles/globals.css",
        "baseColor": "slate",
        "cssVariables": true
      },
      "aliases": {
        "components": "@/components",
        "utils": "@/lib/utils"
      }
    }, null, 2);
  }
  
  function generateNextConfig(answers) {
    return `/** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
  }
  
  export default nextConfig
  `;
  }