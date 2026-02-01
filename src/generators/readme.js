export function generateReadme(answers) {
    const pm = answers.packageManager;
    const installCmd = pm === 'npm' ? 'npm install' : pm === 'yarn' ? 'yarn' : `${pm} install`;
    
    return `# ${answers.projectName}
  
  A modern frontend application built with ${getFrameworkName(answers.framework)}${answers.cssFramework === 'tailwind' ? ' and Tailwind CSS' : ''}.
  
  ## 🚀 Features
  
  - **Framework**: ${getFrameworkName(answers.framework)}
  - **Language**: ${answers.typescript ? 'TypeScript' : 'JavaScript'}
  - **Styling**: ${getCSSFrameworkName(answers.cssFramework)}
  ${answers.uiLibrary !== 'none' ? `- **UI Library**: ${getUILibraryName(answers.uiLibrary)}\n` : ''}${answers.additionalTools.includes('eslint') ? '- **Linting**: ESLint\n' : ''}${answers.additionalTools.includes('prettier') ? '- **Formatting**: Prettier\n' : ''}${answers.additionalTools.includes('vitest') ? '- **Testing**: Vitest\n' : ''}${answers.additionalTools.includes('playwright') ? '- **E2E Testing**: Playwright\n' : ''}${answers.additionalTools.includes('husky') ? '- **Git Hooks**: Husky\n' : ''}
  
  ## 📦 Prerequisites
  
  - Node.js >= 16.0.0
  - ${pm}
  
  ## 🛠️ Installation
  
  \`\`\`bash
  ${installCmd}
  \`\`\`
  
  ## 🏃 Development
  
  Start the development server:
  
  \`\`\`bash
  ${pm} run dev
  \`\`\`
  
  ${answers.framework === 'nextjs' ? 'Open [http://localhost:3000](http://localhost:3000) in your browser.\n' : 'Open [http://localhost:5173](http://localhost:5173) in your browser.\n'}
  
  ## 🏗️ Build
  
  Build for production:
  
  \`\`\`bash
  ${pm} run build
  \`\`\`
  
  ${answers.framework.includes('vite') ? `Preview production build:
  
  \`\`\`bash
  ${pm} run preview
  \`\`\`
  
  ` : ''}## 📝 Available Scripts
  
  ${generateScriptsSection(answers)}
  
  ## 📁 Project Structure
  
  \`\`\`
  ${answers.projectName}/
  ├── public/           # Static assets
  ├── src/
  │   ├── assets/       # Images, fonts, etc.
  │   ├── components/   # Reusable components
  ${answers.uiLibrary === 'shadcn' ? '│   │   └── ui/       # shadcn/ui components\n' : ''}│   ├── lib/          # Utility functions
  │   ├── styles/       # Global styles
  │   ├── App.${answers.typescript ? 'tsx' : 'jsx'}         # Main App component
  │   └── main.${answers.typescript ? 'tsx' : 'jsx'}        # Entry point
  ${answers.additionalTools.includes('vitest') ? '├── tests/          # Test files\n' : ''}├── .gitignore
  ├── package.json
  ${answers.typescript ? '├── tsconfig.json\n' : ''}${answers.cssFramework === 'tailwind' ? '├── tailwind.config.js\n' : ''}└── README.md
  \`\`\`
  
  ## 🤝 Contributing
  
  Contributions are welcome! Please feel free to submit a Pull Request.
  
  ## 📄 License
  
  This project is licensed under the MIT License.
  
  ---
  
  Created with ❤️ using [create-frontend-app](https://github.com/yourusername/create-frontend-app)
  `;
  }
  
  function getFrameworkName(framework) {
    const map = {
      'react-vite': 'React + Vite',
      'nextjs': 'Next.js',
      'vue-vite': 'Vue 3 + Vite',
      'nuxt': 'Nuxt',
      'sveltekit': 'SvelteKit',
      'solid-vite': 'Solid + Vite',
      'vanilla-vite': 'Vanilla JS + Vite'
    };
    return map[framework] || framework;
  }
  
  function getCSSFrameworkName(css) {
    const map = {
      'tailwind': 'Tailwind CSS',
      'css-modules': 'CSS Modules',
      'sass': 'Sass/SCSS',
      'styled-components': 'Styled Components',
      'emotion': 'Emotion',
      'vanilla': 'Vanilla CSS',
      'none': 'None'
    };
    return map[css] || css;
  }
  
  function getUILibraryName(ui) {
    const map = {
      'shadcn': 'shadcn/ui',
      'mui': 'Material-UI',
      'antd': 'Ant Design',
      'chakra': 'Chakra UI',
      'daisyui': 'DaisyUI',
      'vuetify': 'Vuetify',
      'primevue': 'PrimeVue',
      'none': 'None'
    };
    return map[ui] || ui;
  }
  
  function generateScriptsSection(answers) {
    const pm = answers.packageManager;
    let scripts = `- \`${pm} run dev\` - Start development server
  - \`${pm} run build\` - Build for production
  `;
  
    if (answers.framework.includes('vite')) {
      scripts += `- \`${pm} run preview\` - Preview production build\n`;
    }
  
    if (answers.additionalTools.includes('eslint')) {
      scripts += `- \`${pm} run lint\` - Run ESLint\n`;
    }
  
    if (answers.additionalTools.includes('prettier')) {
      scripts += `- \`${pm} run format\` - Format code with Prettier\n`;
    }
  
    if (answers.additionalTools.includes('vitest')) {
      scripts += `- \`${pm} run test\` - Run tests with Vitest\n`;
      scripts += `- \`${pm} run test:ui\` - Run tests with UI\n`;
      scripts += `- \`${pm} run coverage\` - Generate coverage report\n`;
    }
  
    if (answers.additionalTools.includes('playwright')) {
      scripts += `- \`${pm} run test:e2e\` - Run E2E tests with Playwright\n`;
    }
  
    return scripts;
  }