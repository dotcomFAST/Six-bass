import { copyFileSync, writeFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const githubPagesFiles = {
  name: 'github-pages-fallback-files',
  apply: 'build',
  closeBundle() {
    copyFileSync('docs/index.html', 'docs/404.html')
    writeFileSync('docs/.nojekyll', '')
  },
}

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Six-bass/' : '/',
  build: { outDir: 'docs', emptyOutDir: true },
  plugins: [react(), tailwindcss(), githubPagesFiles],
}))
