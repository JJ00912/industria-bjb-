import { useState } from 'react'
import Img from '../components/Img'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import SectionIntro from '../components/SectionIntro'
import { solutions } from '../data/content'

/**
 * Soluciones como índice editorial: la lista numerada controla una
 * fotografía grande (escritorio) o se despliega en acordeón (móvil).
 */
export default function Solutions() {
  const [active, setActive] = useState(0)
  const current = solutions[active]

  return (
    <section id="soluciones" className="bg-ivory py-24 lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionIntro
            eyebrow="Nuestras soluciones"
            title={['Mobiliario comercial', 'para cada tipo de proyecto.']}
            text="Diseñamos, fabricamos e instalamos soluciones que se adaptan a la operación de cada cliente y sector, combinando funcionalidad, estética y durabilidad."
          />

          <Reveal as="ol" delay={120} className="mt-12 border-t border-graphite/12">
            {solutions.map((s, i) => {
              const isActive = i === active
              return (
                <li key={s.id} className="border-b border-graphite/12">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => window.matchMedia('(min-width: 1024px)').matches && setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-expanded={isActive}
                    aria-controls={`sol-panel-${s.id}`}
                    className="group flex w-full items-center gap-5 py-5 text-left"
                  >
                    <span
                      className={`w-7 text-[12px] font-semibold tracking-[0.1em] transition-colors duration-300 ${
                        isActive ? 'text-wine' : 'text-stone'
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`flex-1 font-display text-[1.65rem] leading-tight transition-colors duration-300 sm:text-[1.85rem] ${
                        isActive ? 'text-ink' : 'text-graphite-500 group-hover:text-ink'
                      }`}
                    >
                      {s.title}
                    </span>
                    <Icon
                      name="arrow"
                      size={18}
                      className={`shrink-0 transition-all duration-500 ${
                        isActive ? 'translate-x-0 text-wine opacity-100' : '-translate-x-2 text-stone opacity-0 group-hover:opacity-60'
                      } max-lg:hidden`}
                    />
                    <Icon
                      name="plus"
                      size={18}
                      className={`shrink-0 text-stone transition-transform duration-500 lg:hidden ${isActive ? 'rotate-45' : ''}`}
                    />
                  </button>

                  {/* Panel: en escritorio solo texto; en móvil, texto + imagen */}
                  <div
                    id={`sol-panel-${s.id}`}
                    className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-refined)] ${
                      isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6 pl-12">
                        <p className="max-w-sm text-[15px] leading-relaxed text-stone">{s.text}</p>
                        <Img
                          name={s.image}
                          sizes="(min-width: 1024px) 1px, 90vw"
                          className="mt-5 aspect-[4/3] w-full lg:hidden"
                        />
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </Reveal>
        </div>

        {/* Fotografía principal (escritorio) */}
        <Reveal delay={200} className="relative hidden lg:col-span-7 lg:block">
          <div className="sticky top-28 isolate">
            <div className="relative aspect-[5/6] max-h-[720px] w-full overflow-hidden bg-graphite-700">
              {solutions.map((s, i) => (
                <div
                  key={s.id}
                  className={`absolute inset-0 transition-[opacity,transform] duration-[1100ms] ease-[var(--ease-refined)] ${
                    i === active ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'
                  }`}
                  aria-hidden={i !== active}
                >
                  <Img name={s.image} sizes="(min-width: 1024px) 55vw, 1px" className="h-full w-full" />
                </div>
              ))}
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(20,17,16,0.75),transparent)] p-8 pt-24">
                <p className="eyebrow text-bronze-200">Solución 0{active + 1}</p>
                <p className="mt-2 font-display text-3xl text-ivory">{current.title}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {current.tags.map((t) => (
                    <li
                      key={t}
                      className="border border-ivory/30 px-3 py-1.5 text-[11px] tracking-[0.12em] text-ivory/90 uppercase"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Bloque decorativo vinotinto (composición asimétrica) */}
            <div className="absolute -bottom-6 -left-6 -z-10 h-40 w-40 bg-wine" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
