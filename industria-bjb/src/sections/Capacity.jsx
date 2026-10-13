import Img from '../components/Img'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import SectionIntro from '../components/SectionIntro'
import { capacity } from '../data/content'

export default function Capacity() {
  return (
    <section id="capacidad" className="overflow-hidden bg-ink py-24 text-ivory lg:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <SectionIntro
            tone="dark"
            className="lg:col-span-6"
            eyebrow={capacity.eyebrow}
            title={capacity.title}
            text={capacity.text}
          />
          <Reveal as="ul" delay={150} className="self-end border-t border-ivory/12 lg:col-span-5 lg:col-start-8">
            {capacity.points.map((p) => (
              <li key={p.label} className="flex items-center gap-5 border-b border-ivory/12 py-4">
                <Icon name={p.icon} size={22} className="shrink-0 text-bronze-300" />
                <span className="text-[15px] text-ivory/90">{p.label}</span>
              </li>
            ))}
          </Reveal>
        </div>

        {/* Tríptico industrial asimétrico */}
        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-12 lg:grid-rows-2">
          <Reveal className="col-span-2 lg:col-span-8 lg:row-span-2">
            <Img name="capMain" sizes="(min-width: 1024px) 62vw, 100vw" className="aspect-[16/10] w-full lg:aspect-auto lg:h-full lg:min-h-[520px]" />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4">
            <Img name="capCnc" sizes="(min-width: 1024px) 30vw, 50vw" className="aspect-square w-full lg:aspect-[4/3]" />
          </Reveal>
          <Reveal delay={220} className="lg:col-span-4">
            <Img name="capStock" sizes="(min-width: 1024px) 30vw, 50vw" className="aspect-square w-full lg:aspect-[4/3]" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
