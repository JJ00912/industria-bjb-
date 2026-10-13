import { useEffect, useRef } from 'react'
import Img from './Img'
import Icon from './Icon'
import { media } from '../data/media'

/** Visor de proyecto a pantalla completa (Esc, ← →, foco gestionado). */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const closeRef = useRef(null)
  const item = index !== null ? items[index] : null

  const isOpen = index !== null

  // Bloqueo de scroll y devolución del foco al cerrar
  useEffect(() => {
    if (!isOpen) return
    const prevFocus = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      prevFocus?.focus?.()
    }
  }, [isOpen])

  // Teclado solo mientras el visor está abierto
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(1)
      if (e.key === 'ArrowLeft') onNavigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose, onNavigate])

  if (!item) return null
  const conceptual = media[item.image]?.conceptual

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[60] flex animate-[fadeIn_0.4s_ease_both] flex-col bg-ink/96 text-ivory backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="container-x flex h-[72px] shrink-0 items-center justify-between">
        <p className="text-[12px] tracking-[0.2em] text-ivory/60">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="inline-flex h-12 w-12 items-center justify-center hover:text-bronze-300"
        >
          <Icon name="close" size={26} />
        </button>
      </div>

      <div className="container-x grid min-h-0 flex-1 gap-6 pb-6 lg:grid-cols-12 lg:gap-12 lg:pb-12">
        <div key={item.id} className="relative min-h-[40vh] animate-[fadeIn_0.6s_ease_both] lg:col-span-8">
          <Img name={item.image} sizes="(min-width: 1024px) 66vw, 100vw" className="absolute inset-0" />
        </div>
        <div className="flex flex-col justify-between gap-6 lg:col-span-4">
          <div>
            <p className="eyebrow text-bronze-300">{item.category}</p>
            <h3 className="mt-3 text-[2.4rem] leading-none">{item.title}</h3>
            <p className="mt-5 text-[15px] leading-relaxed text-mist">{item.text}</p>
            {conceptual && (
              <p className="mt-6 inline-block border border-ivory/20 px-3 py-1.5 text-[11px] tracking-[0.12em] text-ivory/70 uppercase">
                Imagen de referencia conceptual
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              aria-label="Proyecto anterior"
              className="inline-flex h-12 w-12 items-center justify-center border border-ivory/25 transition-colors hover:bg-ivory hover:text-ink"
            >
              <Icon name="arrowLeft" size={18} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              aria-label="Proyecto siguiente"
              className="inline-flex h-12 w-12 items-center justify-center border border-ivory/25 transition-colors hover:bg-ivory hover:text-ink"
            >
              <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
