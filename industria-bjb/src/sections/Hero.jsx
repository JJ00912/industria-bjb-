import { useEffect, useState } from 'react'
import Img from '../components/Img'
import Button from '../components/Button'
import { hero } from '../data/content'

const INTERVAL = 7000

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = hero.slides.length

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || paused) return
    const t = setTimeout(() => setIndex((i) => (i + 1) % total), INTERVAL)
    return () => clearTimeout(t)
  }, [index, paused, total])

  return (
    <section
      id="inicio"
      aria-label="Presentación"
      className="relative isolate flex min-h-[640px] flex-col overflow-hidden bg-ink pt-[72px] text-ivory lg:h-[min(100svh,900px)] lg:min-h-[680px] lg:pt-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fondo: fotografías en fundido cruzado */}
      <div className="absolute inset-0 -z-10">
        {hero.slides.map((name, i) => (
          <div
            key={name}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-[var(--ease-refined)] ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={i !== index}
          >
            <Img
              name={name}
              priority={i === 0}
              sizes="100vw"
              className="h-full w-full"
              imgClassName={i === index ? 'animate-slow-zoom' : ''}
            />
          </div>
        ))}
        {/* Velo para legibilidad: oscuro a la izquierda y en la base */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,17,16,0.88)_0%,rgba(20,17,16,0.62)_42%,rgba(20,17,16,0.12)_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(0deg,rgba(20,17,16,0.85),transparent)]" />
      </div>

      <div className="container-x relative flex flex-1 flex-col justify-center py-16 lg:py-0">
        <div className="max-w-[780px]">
          <p className="eyebrow animate-[fadeUp_1s_var(--ease-refined)_both] text-bronze-300">{hero.eyebrow}</p>
          <h1 className="mt-6 text-[clamp(3rem,7vw,5.6rem)] leading-[0.95]">
            <span className="block animate-[fadeUp_1.1s_var(--ease-refined)_0.1s_both]">{hero.titleA}</span>
            <span className="block animate-[fadeUp_1.1s_var(--ease-refined)_0.22s_both] text-bronze-300 italic">
              {hero.titleB}
            </span>
          </h1>
          <p className="mt-7 max-w-[30rem] animate-[fadeUp_1.1s_var(--ease-refined)_0.34s_both] text-[16px] leading-relaxed text-ivory/80 sm:text-[17px]">
            {hero.text}
          </p>
          <div className="mt-10 flex animate-[fadeUp_1.1s_var(--ease-refined)_0.46s_both] flex-wrap gap-3">
            <Button href="#soluciones">Conoce nuestras soluciones</Button>
            <Button href="#proyectos" variant="outlineLight" arrow={false}>
              Ver proyectos
            </Button>
          </div>
        </div>

        {/* Indicadores del carrusel */}
        <div className="absolute right-5 bottom-8 flex items-center gap-1 max-lg:hidden sm:right-8 lg:top-1/2 lg:right-12 lg:bottom-auto lg:-translate-y-1/2 lg:flex-col lg:items-end">
          {hero.slides.map((name, i) => (
            <button
              key={name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Mostrar imagen ${i + 1} de ${total}`}
              aria-pressed={i === index}
              className="group flex h-11 min-w-11 items-center justify-end gap-3 px-1"
            >
              <span
                className={`hidden h-px bg-ivory transition-all duration-700 lg:block ${
                  i === index ? 'w-10 opacity-100' : 'w-4 opacity-30 group-hover:opacity-60'
                }`}
              />
              <span
                className={`text-[12px] font-semibold tracking-[0.12em] transition-colors ${
                  i === index ? 'text-ivory' : 'text-ivory/45 group-hover:text-ivory/80'
                }`}
              >
                0{i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Pilares */}
      <div className="relative border-t border-ivory/12">
        <ul className="container-x grid grid-cols-2 gap-y-5 py-6 sm:py-7 lg:grid-cols-4">
          {hero.pillars.map(([a, b], i) => (
            <li
              key={a}
              className={`border-ivory/15 pr-4 ${i % 2 === 1 ? 'border-l pl-5' : ''} ${
                i > 0 ? 'lg:border-l lg:pl-7' : ''
              }`}
            >
              <p className="text-[12px] font-semibold tracking-[0.2em] uppercase">{a}</p>
              <p className="mt-1 text-[12px] tracking-[0.06em] text-ivory/60 uppercase">{b}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
