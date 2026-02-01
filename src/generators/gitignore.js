export function generateGitignore(answers) {
    return `# Logs
  logs
  *.log
  npm-debug.log*
  yarn-debug.log*
  yarn-error.log*
  pnpm-debug.log*
  lerna-debug.log*
  
  # Dependencies
  node_modules
  dist
  dist-ssr
  *.local
  
  # Editor directories and files
  .vscode/*
  !.vscode/extensions.json
  .idea
  .DS_Store
  *.suo
  *.ntvs*
  *.njsproj
  *.sln
  *.sw?
  
  # Environment variables
  .env
  .env.local
  .env.development.local
  .env.test.local
  .env.production.local
  
  # Production
  build
  .next
  out
  .nuxt
  .output
  .vercel
  .netlify
  
  # Testing
  coverage
  .nyc_output
  
  # Misc
  .cache
  .parcel-cache
  .turbo
  `;
  }