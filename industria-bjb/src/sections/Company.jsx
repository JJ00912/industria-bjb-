import Img from '../components/Img'
import Logo from '../components/Logo'
import Reveal from '../components/Reveal'
import SectionIntro from '../components/SectionIntro'
import { company } from '../data/content'

export default function Company() {
  return (
    <section id="empresa" className="bg-ivory-50 py-24 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative lg:col-span-6">
          <Img name="company" sizes="(min-width: 1024px) 48vw, 100vw" className="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]" />
          {/* Firma de marca sobre la fotografía */}
          <div className="absolute right-0 bottom-0 bg-ivory-50 px-6 py-5 sm:px-8 sm:py-6">
            <Logo className="h-12 sm:h-14" />
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <SectionIntro eyebrow={company.eyebrow} title={company.title} />
          <Reveal delay={100} className="mt-8 space-y-5 text-[16px] leading-relaxed text-graphite-500">
            {company.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal as="dl" delay={180} className="mt-12 grid gap-8 border-t border-graphite/12 pt-8 sm:grid-cols-3 sm:gap-6">
            {company.values.map((v, i) => (
              <div key={v.title}>
                <dt className="flex items-baseline gap-3">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-bronze-700">0{i + 1}</span>
                  <span className="font-display text-[1.6rem] leading-none text-wine">{v.title}</span>
                </dt>
                <dd className="mt-3 text-[14px] leading-relaxed text-stone">{v.text}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
