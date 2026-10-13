import { useScrolled } from '../hooks/useScrollSpy'
import { whatsappLink } from '../config/site'
import Icon from './Icon'

/** Acceso flotante a WhatsApp. Solo aparece si el número está configurado. */
export default function WhatsAppFloat() {
  const visible = useScrolled(500)
  const href = whatsappLink('Hola, INDUSTRIA B.J.B. Quiero información sobre un proyecto.')
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className={`fixed right-4 bottom-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-wine text-ivory shadow-[0_10px_30px_rgba(20,17,16,0.35)] transition-[opacity,transform] duration-500 hover:bg-wine-800 sm:right-6 sm:bottom-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <Icon name="whatsapp" size={26} />
    </a>
  )
}
