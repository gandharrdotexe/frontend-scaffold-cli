export const templates = {
    'minimal': {
      description: 'Minimal React + Vite setup',
      config: {
        framework: 'react-vite',
        typescript: false,
        cssFramework: 'vanilla',
        uiLibrary: 'none',
        additionalTools: [],
        packageManager: 'npm'
      }
    },
    'react-ts-tailwind': {
      description: 'React + TypeScript + Tailwind CSS',
      config: {
        framework: 'react-vite',
        typescript: true,
        cssFramework: 'tailwind',
        uiLibrary: 'none',
        additionalTools: ['eslint', 'prettier'],
        packageManager: 'npm'
      }
    },
    'react-shadcn': {
      description: 'React + TypeScript + Tailwind + shadcn/ui',
      config: {
        framework: 'react-vite',
        typescript: true,
        cssFramework: 'tailwind',
        uiLibrary: 'shadcn',
        additionalTools: ['eslint', 'prettier'],
        packageManager: 'npm'
      }
    },
    'nextjs-full': {
      description: 'Next.js + TypeScript + Tailwind + ESLint + Prettier',
      config: {
        framework: 'nextjs',
        typescript: true,
        cssFramework: 'tailwind',
        uiLibrary: 'none',
        additionalTools: ['eslint', 'prettier'],
        packageManager: 'npm'
      }
    },
    'vue-ts': {
      description: 'Vue 3 + TypeScript + Tailwind CSS',
      config: {
        framework: 'vue-vite',
        typescript: true,
        cssFramework: 'tailwind',
        uiLibrary: 'none',
        additionalTools: ['eslint', 'prettier'],
        packageManager: 'npm'
      }
    },
    'enterprise': {
      description: 'Next.js + TS + Tailwind + shadcn + Testing + Docker + CI',
      config: {
        framework: 'nextjs',
        typescript: true,
        cssFramework: 'tailwind',
        uiLibrary: 'shadcn',
        additionalTools: ['eslint', 'prettier', 'husky', 'vitest', 'playwright', 'docker', 'github-actions'],
        packageManager: 'pnpm'
      }
    }
  };