/**
 * Descarga las imágenes conceptuales desde Unsplash en WebP optimizado
 * (4 anchos) a public/images/conceptual/ y actualiza
 * src/data/local-images.json para que el sitio las sirva localmente.
 *
 * Uso:  npm run images:local
 * Requiere Node 20+ y conexión a internet.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public', 'images', 'conceptual')
const manifest = path.join(root, 'src', 'data', 'local-images.json')
const WIDTHS = [640, 960, 1400, 2000] // mantener igual que WIDTHS en media.js

// Lee las entradas `clave: { unsplash: '...' }` de src/data/media.js
const source = await readFile(path.join(root, 'src', 'data', 'media.js'), 'utf8')
const entries = [...source.matchAll(/(\w+):\s*\{\s*unsplash:\s*'([^']+)'/g)].map(([, key, id]) => ({ key, id }))

await mkdir(outDir, { recursive: true })

const done = []
for (const { key, id } of entries) {
  try {
    for (const w of WIDTHS) {
      const url = `https://images.unsplash.com/${id}?fm=webp&fit=max&q=65&w=${w}`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`${res.status} ${url}`)
      await writeFile(path.join(outDir, `${key}-${w}.webp`), Buffer.from(await res.arrayBuffer()))
    }
    done.push(key)
    console.log(`✓ ${key}`)
  } catch (err) {
    console.warn(`✗ ${key}: ${err.message}`)
  }
}

await writeFile(manifest, JSON.stringify(done, null, 2) + '\n')
console.log(`\n${done.length}/${entries.length} imágenes guardadas en public/images/conceptual/`)
