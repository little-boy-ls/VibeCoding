import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const index = join('dist', 'index.html')
const notFound = join('dist', '404.html')

if (!existsSync(index)) {
  console.error('copy-404: dist/index.html not found — run vite build first')
  process.exit(1)
}

copyFileSync(index, notFound)
console.log('copy-404: dist/index.html -> dist/404.html')
