import Reveal from './Reveal'

/** Antetítulo + titular editorial + texto. `tone` = light | dark. */
export default function SectionIntro({ eyebrow, title, text, tone = 'light', className = '', children }) {
  const dark = tone === 'dark'
  const lines = Array.isArray(title) ? title : [title]
  return (
    <Reveal className={className}>
      <p className={`eyebrow ${dark ? 'text-bronze-300' : 'text-bronze-700'}`}>{eyebrow}</p>
      <h2
        className={`mt-4 text-[clamp(2.4rem,4.4vw,3.6rem)] leading-[1.02] ${dark ? 'text-ivory' : 'text-ink'}`}
      >
        {lines.map((l, i) => (
          <span key={i} className="block">
            {l}
          </span>
        ))}
      </h2>
      {text && (
        <p className={`mt-6 max-w-md text-[15px] leading-relaxed ${dark ? 'text-mist' : 'text-stone'}`}>{text}</p>
      )}
      {children}
    </Reveal>
  )
}
