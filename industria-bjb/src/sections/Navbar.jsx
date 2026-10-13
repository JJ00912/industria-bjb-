import { useEffect, useState } from 'react'
import Logo from '../components/Logo'
import Icon from '../components/Icon'
import { navLinks } from '../config/site'
import { useScrollSpy, useScrolled } from '../hooks/useScrollSpy'

const ids = navLinks.map((l) => l.id)
const desktopLinks = navLinks.filter((l) => l.id !== 'inicio' && l.id !== 'contacto')

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(ids)
  const scrolled = useScrolled()

  // Bloquea el scroll del fondo con el menú móvil abierto; Esc lo cierra.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[box-shadow,background-color] duration-500 ${
        scrolled ? 'bg-ivory/95 shadow-[0_1px_0_rgba(20,17,16,0.08)] backdrop-blur-md' : 'bg-ivory'
      }`}
    >
      <nav className="container-x flex h-[72px] items-center justify-between gap-6 lg:h-20" aria-label="Principal">
        <a href="#inicio" className="shrink-0" aria-label="INDUSTRIA B.J.B. — inicio" onClick={() => setOpen(false)}>
          <Logo className="h-11 lg:h-[52px]" />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {desktopLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`relative inline-flex h-11 items-center px-3.5 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 xl:px-4 ${
                  active === l.id ? 'text-wine' : 'text-graphite-500 hover:text-ink'
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-3.5 bottom-1.5 h-px origin-left bg-wine transition-transform duration-500 ease-[var(--ease-refined)] xl:inset-x-4 ${
                    active === l.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contacto"
            className="group hidden min-h-12 items-center gap-3 bg-wine px-6 text-[11px] font-semibold tracking-[0.18em] text-ivory uppercase transition-colors duration-300 hover:bg-wine-800 sm:inline-flex"
          >
            Cotizar proyecto
            <Icon name="arrow" size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center text-ink lg:hidden"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={26} />
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        className={`fixed inset-x-0 top-[72px] bottom-0 bg-ink text-ivory transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="container-x flex h-full flex-col justify-between overflow-y-auto pt-8 pb-10">
          <ul>
            {navLinks.map((l, i) => (
              <li
                key={l.id}
                className="border-b border-ivory/10 transition-[transform,opacity] duration-700 ease-[var(--ease-refined)]"
                style={{
                  transitionDelay: open ? `${80 + i * 45}ms` : '0ms',
                  transform: open ? 'none' : 'translateY(14px)',
                  opacity: open ? 1 : 0,
                }}
              >
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4"
                >
                  <span className="font-display text-[2rem] leading-none">{l.label}</span>
                  <span className="text-[11px] tracking-[0.2em] text-bronze-300">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-10 inline-flex min-h-14 items-center justify-center gap-3 bg-bronze-600 text-[12px] font-semibold tracking-[0.2em] uppercase"
          >
            Cotizar proyecto <Icon name="arrow" size={16} />
          </a>
        </div>
      </div>
    </header>
  )
}
