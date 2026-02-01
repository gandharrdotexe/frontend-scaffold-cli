# create-frontend-app

🚀 A powerful CLI tool to scaffold modern frontend applications with your favorite frameworks and tools.

[![npm version](https://img.shields.io/npm/v/create-frontend-app.svg)](https://www.npmjs.com/package/create-frontend-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Interactive CLI** - Easy-to-use prompts guide you through project setup
- ⚡ **Multiple Frameworks** - Support for React, Next.js, Vue, Nuxt, Svelte, and more
- 🎨 **Styling Solutions** - Tailwind CSS, Sass, Styled Components, CSS Modules, and more
- 🧩 **UI Libraries** - Pre-configured shadcn/ui, Material-UI, Ant Design, Chakra UI, and more
- 🛠️ **Development Tools** - ESLint, Prettier, Husky, Vitest, Playwright, and more
- 📦 **Package Manager Agnostic** - Works with npm, yarn, pnpm, and bun
- 🎁 **Predefined Templates** - Quick start with opinionated templates
- 🔧 **TypeScript Support** - Optional TypeScript configuration
- 🐳 **Docker Ready** - Optional Docker configuration
- 🤖 **CI/CD Ready** - GitHub Actions workflows included

## 🚀 Quick Start

### Create a New Project

```bash
npx create-frontend-app my-app
```

Or with your preferred package manager:

```bash
# npm
npm create frontend-app my-app

# yarn
yarn create frontend-app my-app

# pnpm
pnpm create frontend-app my-app

# bun
bun create frontend-app my-app
```

### Using Templates

Skip the prompts with predefined templates:

```bash
npx create-frontend-app my-app --template react-shadcn
```

Available templates:
- `minimal` - Minimal React + Vite setup
- `react-ts-tailwind` - React + TypeScript + Tailwind CSS
- `react-shadcn` - React + TypeScript + Tailwind + shadcn/ui
- `nextjs-full` - Next.js + TypeScript + Tailwind + ESLint + Prettier
- `vue-ts` - Vue 3 + TypeScript + Tailwind CSS
- `enterprise` - Next.js + TS + Tailwind + shadcn + Testing + Docker + CI

## 📖 Usage

### Interactive Mode

Simply run the command and follow the prompts:

```bash
npx create-frontend-app my-app
```

You'll be asked about:
1. Project name
2. Framework (React, Next.js, Vue, etc.)
3. TypeScript preference
4. CSS solution
5. UI component library
6. Additional tools (ESLint, Prettier, Testing, etc.)
7. Package manager

### Command Line Options

```bash
create-frontend-app [project-name] [options]
```

Options:
- `-t, --template <template>` - Use a predefined template
- `--skip-git` - Skip git initialization
- `--skip-install` - Skip dependency installation
- `-V, --version` - Output version number
- `-h, --help` - Display help

## 🎯 Supported Technologies

### Frameworks

- ⚛️ **React** (with Vite)
- ⚡ **Next.js** (App Router)
- 💚 **Vue 3** (with Vite)
- 🔷 **Nuxt 3**
- 🔥 **SvelteKit**
- 🟦 **Solid** (with Vite)
- 📝 **Vanilla JS** (with Vite)

### CSS Solutions

- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📦 **CSS Modules** - Scoped CSS
- 🎭 **Sass/SCSS** - CSS preprocessor
- 💅 **Styled Components** - CSS-in-JS
- 😶 **Emotion** - CSS-in-JS
- 📄 **Vanilla CSS** - Plain CSS

### UI Component Libraries

- 🎨 **shadcn/ui** - Re-usable components (React + Tailwind)
- 🎯 **Material-UI** - React components
- 🐜 **Ant Design** - Enterprise-class UI
- ⚡ **Chakra UI** - Accessible component library
- 🌼 **DaisyUI** - Tailwind CSS components
- 💎 **Vuetify** - Vue Material Design
- 🎭 **PrimeVue** - Vue UI suite

### Development Tools

- ✅ **ESLint** - Code linting
- 🎨 **Prettier** - Code formatting
- 🐶 **Husky** - Git hooks
- ⚡ **Vitest** - Unit testing
- 🎭 **Playwright** - E2E testing
- 🐳 **Docker** - Containerization
- 🤖 **GitHub Actions** - CI/CD workflows

## 📁 Project Structure

Generated projects follow best practices:

```
my-app/
├── .github/
│   └── workflows/          # CI/CD workflows
├── .husky/                 # Git hooks
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # React/Vue components
│   │   └── ui/           # UI library components
│   ├── lib/              # Utility functions
│   ├── styles/           # Global styles
│   ├── App.tsx           # Main component
│   └── main.tsx          # Entry point
├── tests/                 # Test files
├── .env.example          # Environment variables template
├── .eslintrc.json        # ESLint configuration
├── .gitignore            # Git ignore rules
├── .prettierrc           # Prettier configuration
├── package.json          # Dependencies and scripts
├── README.md             # Project documentation
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## 🎓 Examples

### React + TypeScript + Tailwind + shadcn/ui

```bash
npx create-frontend-app my-app --template react-shadcn
cd my-app
npm run dev
```

### Next.js with Full Setup

```bash
npx create-frontend-app my-app --template nextjs-full
cd my-app
npm run dev
```

### Vue 3 + TypeScript

```bash
npx create-frontend-app my-app --template vue-ts
cd my-app
npm run dev
```

### Custom Configuration

```bash
npx create-frontend-app my-app
# Follow interactive prompts to customize your setup
```

## 🔧 Configuration

### ESLint

Projects with ESLint include recommended configurations:
- Framework-specific rules
- TypeScript support (if enabled)
- React Hooks rules (for React projects)

### Prettier

Prettier is configured with sensible defaults:
- 2 spaces indentation
- Single quotes
- Semicolons enabled
- Tailwind CSS plugin (if Tailwind is selected)

### TypeScript

TypeScript projects include:
- Strict mode enabled
- Modern ES features
- Path aliases (for shadcn/ui projects)
- Framework-specific configurations

### Tailwind CSS

Tailwind projects include:
- PostCSS configuration
- Content paths configured
- Tailwind plugins (if UI libraries require them)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [create-react-app](https://github.com/facebook/create-react-app)
- Built with [Commander.js](https://github.com/tj/commander.js/)
- Uses [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) for prompts
- Styling with [Chalk](https://github.com/chalk/chalk)

## 📧 Support

- 📖 [Documentation](https://github.com/yourusername/create-frontend-app)
- 🐛 [Issue Tracker](https://github.com/yourusername/create-frontend-app/issues)
- 💬 [Discussions](https://github.com/yourusername/create-frontend-app/discussions)

## 🗺️ Roadmap

- [ ] Add support for Remix
- [ ] Add support for Astro
- [ ] Custom template creation from existing projects
- [ ] Plugin system for community extensions
- [ ] Configuration presets
- [ ] Interactive upgrade command
- [ ] Monorepo support (Turborepo, Nx)

---

Made with ❤️ by the community