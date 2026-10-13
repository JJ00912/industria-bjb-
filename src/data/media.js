/**
 * ============================================================
 *  REGISTRO DE IMÁGENES
 * ============================================================
 *  Todas las fotografías actuales son IMÁGENES CONCEPTUALES de
 *  Unsplash (licencia Unsplash, uso comercial permitido). NO son
 *  proyectos ejecutados por INDUSTRIA B.J.B. y por eso las que
 *  aparecen en el portafolio llevan la etiqueta "Imagen de referencia".
 *
 *  CÓMO SUSTITUIRLAS POR FOTOGRAFÍAS REALES
 *  1. Copia la foto en  public/images/reales/  (JPG o WebP, ~2000 px de ancho).
 *  2. En la entrada correspondiente añade:
 *        file: '/images/reales/nombre-de-la-foto.webp',
 *        conceptual: false,
 *     y actualiza `alt` con una descripción real.
 *  Con `conceptual: false` la etiqueta de referencia desaparece.
 *
 *  SERVIR LAS CONCEPTUALES DESDE TU PROPIO DOMINIO (opcional)
 *  `npm run images:local` descarga versiones WebP optimizadas en
 *  public/images/conceptual/ y el sitio las usa automáticamente.
 * ============================================================
 */
import localImages from './local-images.json'

const UNSPLASH = 'https://images.unsplash.com/'
const localSet = new Set(localImages)

/** Anchos generados para srcset. */
export const WIDTHS = [640, 960, 1400, 2000]

export const media = {
  // ---------- Hero (fondos oscuros para texto claro)
  hero1: {
    unsplash: 'photo-1531973968078-9bb02785f13d',
    alt: 'Interior comercial con techo de listones de madera e iluminación cálida',
    credit: 'LYCS Architecture',
    conceptual: true,
    position: '50% 55%',
  },
  hero2: {
    unsplash: 'photo-1632378206664-853dabd4ffb4',
    alt: 'Revestimiento de madera oscura con línea de luz arquitectónica',
    credit: 'Ryunosuke Kikuno',
    conceptual: true,
    position: '50% 40%',
  },
  hero3: {
    unsplash: 'photo-1790135523542-47888abf4cf6',
    alt: 'Exhibidores de madera iluminados en un espacio comercial',
    credit: '一只猫的橘',
    conceptual: true,
    position: '50% 45%',
  },

  // ---------- Soluciones
  solComercial: {
    unsplash: 'photo-1771830938151-3d18dcf33659',
    alt: 'Estanterías comerciales de madera con iluminación integrada',
    credit: 'Elist Nguyen',
    conceptual: true,
    position: '50% 50%',
  },
  solMostradores: {
    unsplash: 'photo-1784012980517-005c26585344',
    alt: 'Mostrador de atención con frente en listones de madera',
    credit: 'Maverick Frame',
    conceptual: true,
    position: '60% 60%',
  },
  solExhibidores: {
    unsplash: 'photo-1775210727551-42bc213b2c44',
    alt: 'Exhibidor iluminado con repisas para productos',
    credit: 'T',
    conceptual: true,
    position: '50% 45%',
  },
  solMedida: {
    unsplash: 'photo-1782177388316-7546da332c3a',
    alt: 'Mueble de cajonería en madera fabricado a medida',
    credit: 'Declan Sun',
    conceptual: true,
    position: '50% 60%',
  },
  solCarpinteria: {
    unsplash: 'photo-1675528030748-d463ab87e8d5',
    alt: 'Revestimiento de listones verticales de madera natural',
    credit: 'Jan Kopřiva',
    conceptual: true,
    position: '50% 50%',
  },

  // ---------- Portafolio
  projRetail: {
    unsplash: 'photo-1778034758286-d58d597db0a4',
    alt: 'Tienda con mobiliario de exhibición en madera y estructura de vigas',
    credit: 'Declan Sun',
    conceptual: true,
    position: '50% 55%',
  },
  projFarmacias: {
    unsplash: 'photo-1576602976047-174e57a47881',
    alt: 'Punto de venta tipo farmacia con estanterías y góndolas',
    credit: 'Nathaniel Yeo',
    conceptual: true,
    position: '50% 50%',
  },
  projCorporativo: {
    unsplash: 'photo-1706074793638-da28b90ea8ae',
    alt: 'Oficina corporativa con estantería de madera y puestos de trabajo',
    credit: 'Hammer Group',
    conceptual: true,
    position: '50% 50%',
  },
  projRestaurantes: {
    unsplash: 'photo-1565650834520-0b48a5c83f43',
    alt: 'Restaurante con muro de listones de madera y banca corrida',
    credit: '99.films',
    conceptual: true,
    position: '50% 45%',
  },
  projInstitucional: {
    unsplash: 'photo-1762419757174-31e02475fc66',
    alt: 'Recepción institucional con mueble de madera y cielo raso arquitectónico',
    credit: 'Neon Wang',
    conceptual: true,
    position: '50% 60%',
  },

  // ---------- Capacidad industrial
  capMain: {
    unsplash: 'photo-1787422429898-709636d27d1a',
    alt: 'Operario trabajando en maquinaria de corte para tableros de madera',
    credit: 'PJ Wallace',
    conceptual: true,
    position: '50% 50%',
  },
  capCnc: {
    unsplash: 'photo-1532186773960-85649e5cb70b',
    alt: 'Detalle de cabezal de máquina CNC',
    credit: 'Louis Reed',
    conceptual: true,
    position: '50% 40%',
  },
  capStock: {
    unsplash: 'photo-1787422429897-ad354751e61c',
    alt: 'Tableros y piezas de madera apilados en planta de producción',
    credit: 'PJ Wallace',
    conceptual: true,
    position: '50% 50%',
  },

  // ---------- Empresa
  company: {
    unsplash: 'photo-1758448721205-8465cebc26af',
    alt: 'Recepción corporativa con mostrador iluminado y revestimiento de madera',
    credit: 'Aalo Lens',
    conceptual: true,
    position: '50% 55%',
  },
}

/** Devuelve { src, srcSet } listo para <img>. */
export function getImageSources(key) {
  const item = media[key]
  if (!item) throw new Error(`Imagen no registrada: ${key}`)

  // 1) Fotografía real definida manualmente
  if (item.file) return { src: item.file, srcSet: undefined }

  // 2) Copia local optimizada (npm run images:local)
  if (localSet.has(key)) {
    const base = `/images/conceptual/${key}`
    return {
      src: `${base}-1400.webp`,
      srcSet: WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(', '),
    }
  }

  // 3) CDN de Unsplash (redimensiona y entrega WebP/AVIF automáticamente)
  const url = (w) => `${UNSPLASH}${item.unsplash}?auto=format&fit=max&q=65&w=${w}`
  return {
    src: url(1400),
    srcSet: WIDTHS.map((w) => `${url(w)} ${w}w`).join(', '),
  }
}

export const imageCredits = Array.from(new Set(Object.values(media).filter((m) => m.conceptual).map((m) => m.credit)))
