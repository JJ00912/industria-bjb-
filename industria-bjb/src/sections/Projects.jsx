import { useCallback, useState } from 'react'
import Img from '../components/Img'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import Lightbox from '../components/Lightbox'
import { projects } from '../data/content'

/** Distribución editorial: 1 pieza protagonista + 4 piezas en cuadrícula. */
const layout = [
  'col-span-2 aspect-[4/3] md:col-span-1 md:row-span-2 md:aspect-auto',
  'aspect-[4/5] md:aspect-auto',
  'aspect-[4/5] md:aspect-auto',
  'aspect-[4/5] md:aspect-auto',
  'aspect-[4/5] md:aspect-auto',
]

export default function Projects() {
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])
  const navigate = useCallback(
    (dir) => setOpen((i) => (i === null ? null : (i + dir + projects.length) % projects.length)),
    [],
  )

  return (
    <section id="proyectos" className="bg-ink lg:grid lg:grid-cols-12">
      {/* Panel vinotinto */}
      <div className="bg-wine-900 px-5 py-20 sm:px-8 lg:col-span-4 lg:flex lg:flex-col lg:justify-center lg:px-12 lg:py-28 xl:pl-[max(3rem,calc((100vw-1320px)/2+3rem))]">
        <Reveal className="max-w-md">
          <p className="eyebrow text-bronze-300">Proyectos</p>
          <h2 className="mt-4 text-[clamp(2.4rem,4.2vw,3.5rem)] leading-[1.02] text-ivory">
            Espacios que hablan por sí solos.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ivory/75">
            Hemos participado en el desarrollo y la fabricación de mobiliario para sectores comerciales, corporativos e
            institucionales, trabajando de la mano con constructoras, cadenas y empresas de distintos tamaños.
          </p>
          <Button href="#contacto" className="mt-10">
            Hablemos de tu proyecto
          </Button>
        </Reveal>
      </div>

      {/* Galería */}
      <div className="px-3 py-3 sm:px-4 sm:py-4 lg:col-span-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:h-[min(82vh,760px)] md:min-h-[600px] md:grid-cols-3 md:grid-rows-2">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 90} className={`${layout[i]} relative`}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group absolute inset-0 block w-full overflow-hidden text-left"
                aria-label={`Ver ${p.title}`}
              >
                <Img
                  name={p.image}
                  sizes={i === 0 ? '(min-width: 768px) 30vw, 100vw' : '(min-width: 768px) 25vw, 50vw'}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-refined)] group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(20,17,16,0.82)_0%,rgba(20,17,16,0.15)_45%,transparent_70%)] transition-opacity duration-500" />
                {p.reference && (
                  <span className="absolute top-3 left-3 bg-ivory/95 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-wine uppercase sm:top-4 sm:left-4">
                    Cliente referencia
                  </span>
                )}
                <span className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center bg-ink/40 text-ivory opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:top-4 sm:right-4">
                  <Icon name="expand" size={16} />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <span className="eyebrow block text-[10px] text-bronze-200">{p.category}</span>
                  <span className="mt-1.5 block font-display text-[1.25rem] leading-tight text-ivory sm:text-[1.5rem]">
                    {p.title}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
        <p className="px-1 pt-3 text-[11px] tracking-[0.06em] text-ivory/45">
          Fotografías conceptuales de referencia. Selecciona un proyecto para ver el detalle.
        </p>
      </div>

      <Lightbox items={projects} index={open} onClose={close} onNavigate={navigate} />
    </section>
  )
}
