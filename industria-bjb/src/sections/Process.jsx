import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import SectionIntro from '../components/SectionIntro'
import { TextLink } from '../components/Button'
import { process } from '../data/content'

export default function Process() {
  return (
    <section id="proceso" className="bg-ivory py-24 lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-12">
        <SectionIntro
          className="lg:col-span-4"
          eyebrow="Nuestro proceso"
          title={['De la idea', 'a la realidad.']}
          text="Acompañamos cada proyecto desde el diseño hasta la instalación, garantizando calidad, cumplimiento y atención al detalle."
        >
          <TextLink href="#contacto" className="mt-8">
            Iniciar un proyecto
          </TextLink>
        </SectionIntro>

        <ol className="grid gap-0 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4 lg:gap-8">
          {process.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              delay={i * 110}
              className="relative flex gap-6 pb-10 sm:block sm:pr-6 sm:pb-12 lg:pr-0 lg:pb-0"
            >
              {/* Conector: vertical en móvil, horizontal en escritorio */}
              <div className="flex flex-col items-center sm:flex-row">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-bronze/45 text-wine">
                  <Icon name={step.icon} size={24} />
                </span>
                {i < process.length - 1 && (
                  <span className="mt-3 w-px flex-1 bg-bronze/30 sm:mt-0 sm:ml-4 sm:h-px sm:w-auto sm:flex-1 max-lg:sm:hidden" />
                )}
              </div>
              <div className="pt-2 sm:pt-7">
                <p className="text-[12px] font-semibold tracking-[0.16em] text-bronze-700">{step.n}</p>
                <h3 className="mt-2 font-sans text-[16px] font-semibold tracking-normal text-ink">{step.title}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-stone">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
