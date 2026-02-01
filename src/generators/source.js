export function generateSourceFiles(answers) {
    const files = {};
    const ext = answers.typescript ? 'tsx' : 'jsx';
    const jsExt = answers.typescript ? 'ts' : 'js';
  
    // Generate based on framework
    if (answers.framework === 'react-vite') {
      files['index.html'] = generateIndexHtml(answers);
      files[`src/main.${ext}`] = generateReactMain(answers);
      files[`src/App.${ext}`] = generateReactApp(answers);
      files['src/styles/globals.css'] = generateGlobalCSS(answers);
    } else if (answers.framework === 'nextjs') {
      files['src/app/layout.' + ext] = generateNextLayout(answers);
      files['src/app/page.' + ext] = generateNextPage(answers);
      files['src/app/globals.css'] = generateGlobalCSS(answers);
    } else if (answers.framework === 'vue-vite') {
      files['index.html'] = generateIndexHtml(answers);
      files[`src/main.${jsExt}`] = generateVueMain(answers);
      files[`src/App.vue`] = generateVueApp(answers);
      files['src/styles/globals.css'] = generateGlobalCSS(answers);
    }
  
    // shadcn/ui utils
    if (answers.uiLibrary === 'shadcn') {
      files[`src/lib/utils.${jsExt}`] = generateShadcnUtils(answers);
    }
  
    // Test setup
    if (answers.additionalTools.includes('vitest')) {
      files[`tests/setup.${jsExt}`] = generateVitestSetup(answers);
    }
  
    return files;
  }
  
  function generateIndexHtml(answers) {
    return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${answers.projectName}</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.${answers.typescript ? 'tsx' : 'jsx'}"></script>
    </body>
  </html>
  `;
  }
  
  function generateReactMain(answers) {
    const isTS = answers.typescript;
    
    return `import ${isTS ? '{ StrictMode }' : 'React'} from 'react'
  import { createRoot } from 'react-dom/client'
  import './styles/globals.css'
  import App from './App${isTS ? '.tsx' : '.jsx'}'
  
  createRoot(document.getElementById('root')${isTS ? '!' : ''}).render(
    <${isTS ? 'StrictMode' : 'React.StrictMode'}>
      <App />
    </${isTS ? 'StrictMode' : 'React.StrictMode'}>,
  )
  `;
  }
  
  function generateReactApp(answers) {
    const isTS = answers.typescript;
    
    let content = `import { useState } from 'react'\n\n`;
    
    if (answers.uiLibrary === 'shadcn') {
      content += `import { Button } from '@/components/ui/button'\n\n`;
    }
  
    content += `function App() {
    const [count, setCount] = useState(0)
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to ${answers.projectName}
          </h1>
          <p className="text-gray-600 mb-8">
            Built with React + Vite${answers.cssFramework === 'tailwind' ? ' + Tailwind CSS' : ''}
          </p>
          <div className="space-y-4">
  `;
  
    if (answers.uiLibrary === 'shadcn') {
      content += `          <Button onClick={() => setCount(count + 1)}>
              Count is {count}
            </Button>
  `;
    } else {
      content += `          <button 
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Count is {count}
            </button>
  `;
    }
  
    content += `          <p className="text-sm text-gray-500">
              Edit <code className="bg-gray-200 px-2 py-1 rounded">src/App.${isTS ? 'tsx' : 'jsx'}</code> and save to test HMR
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  export default App
  `;
  
    return content;
  }
  
  function generateNextLayout(answers) {
    const isTS = answers.typescript;
    
    return `${isTS ? `import type { Metadata } from 'next'
  ` : ''}import './globals.css'
  
  ${isTS ? `export const metadata: Metadata = {
    title: '${answers.projectName}',
    description: 'Created with create-frontend-app',
  }
  
  ` : ''}export default function RootLayout({
    children,
  }${isTS ? `: {
    children: React.ReactNode
  }` : ''}) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }
  `;
  }
  
  function generateNextPage(answers) {
    return `'use client'
  
  import { useState } from 'react'
  
  export default function Home() {
    const [count, setCount] = useState(0)
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to ${answers.projectName}
          </h1>
          <p className="text-gray-600 mb-8">
            Built with Next.js${answers.cssFramework === 'tailwind' ? ' + Tailwind CSS' : ''}
          </p>
          <button 
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Count is {count}
          </button>
        </div>
      </div>
    )
  }
  `;
  }
  
  function generateVueMain(answers) {
    return `import { createApp } from 'vue'
  import './styles/globals.css'
  import App from './App.vue'
  
  createApp(App).mount('#app')
  `;
  }
  
  function generateVueApp(answers) {
    return `<script setup${answers.typescript ? ' lang="ts"' : ''}>
  import { ref } from 'vue'
  
  const count = ref(0)
  </script>
  
  <template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Welcome to ${answers.projectName}
        </h1>
        <p class="text-gray-600 mb-8">
          Built with Vue 3 + Vite${answers.cssFramework === 'tailwind' ? ' + Tailwind CSS' : ''}
        </p>
        <button 
          @click="count++"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Count is {{ count }}
        </button>
      </div>
    </div>
  </template>
  `;
  }
  
  function generateGlobalCSS(answers) {
    let css = '';
    
    if (answers.cssFramework === 'tailwind') {
      css = `@tailwind base;
  @tailwind components;
  @tailwind utilities;
  `;
    } else {
      css = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  `;
    }
    
    return css;
  }
  
  function generateShadcnUtils(answers) {
    return `import { type ClassValue, clsx } from "clsx"
  import { twMerge } from "tailwind-merge"
  
  export function cn(...inputs${answers.typescript ? ': ClassValue[]' : ''}) {
    return twMerge(clsx(inputs))
  }
  `;
  }
  
  function generateVitestSetup(answers) {
    if (answers.framework.startsWith('react')) {
      return `import { expect, afterEach } from 'vitest'
  import { cleanup } from '@testing-library/react'
  import * as matchers from '@testing-library/jest-dom/matchers'
  
  expect.extend(matchers)
  
  afterEach(() => {
    cleanup()
  })
  `;
    }
    
    return `import { expect } from 'vitest'
  
  // Add any global test setup here
  `;
  }