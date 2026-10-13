import { useState } from 'react'
import { getImageSources, media } from '../data/media'

/**
 * Imagen responsiva registrada en src/data/media.js.
 * - srcset + sizes para servir el ancho adecuado en cada pantalla
 * - lazy loading por defecto (usa priority en el hero)
 * - fundido suave al cargar y color de fondo mientras llega
 */
export default function Img({ name, sizes = '100vw', priority = false, className = '', imgClassName = '', alt }) {
  const [loaded, setLoaded] = useState(false)
  const item = media[name]
  const { src, srcSet } = getImageSources(name)

  return (
    <div className={`relative overflow-hidden bg-graphite-700 ${className}`}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt ?? item.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        ref={(el) => {
          if (el && el.complete && el.naturalWidth && !loaded) setLoaded(true)
        }}
        style={{ objectPosition: item.position }}
        className={`img-fade absolute inset-0 h-full w-full object-cover ${loaded ? 'is-loaded' : ''} ${imgClassName}`}
      />
    </div>
  )
}
