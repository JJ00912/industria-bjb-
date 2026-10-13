import Icon from './Icon'

const variants = {
  bronze: 'bg-bronze-600 text-white hover:bg-bronze-700',
  wine: 'bg-wine text-ivory hover:bg-wine-800',
  outlineLight: 'border border-ivory/35 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink',
  outlineDark: 'border border-graphite/25 text-graphite hover:border-wine hover:bg-wine hover:text-ivory',
}

/**
 * Botón/enlace principal. Usa `href` para anclas o enlaces y
 * `type` para botones de formulario.
 */
export default function Button({ href, variant = 'bronze', arrow = true, className = '', children, ...rest }) {
  const cls = `group inline-flex min-h-12 items-center justify-center gap-3 px-6 text-[12px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <Icon name="arrow" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  )
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  )
}

/** Enlace textual subrayado con flecha. */
export function TextLink({ href, children, light = false, className = '' }) {
  return (
    <a
      href={href}
      className={`group inline-flex min-h-11 items-center gap-2 text-[12px] font-semibold tracking-[0.2em] uppercase ${light ? 'text-ivory' : 'text-graphite'} ${className}`}
    >
      <span className="border-b border-current pb-1">{children}</span>
      <Icon name="arrow" size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  )
}
