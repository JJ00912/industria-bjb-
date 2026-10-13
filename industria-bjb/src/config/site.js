/**
 * ============================================================
 *  CONFIGURACIÓN DEL SITIO — INDUSTRIA B.J.B.
 * ============================================================
 *  Este es el ÚNICO archivo que hay que editar para conectar los
 *  canales de contacto. También se pueden definir como variables
 *  de entorno (recomendado en Vercel), copiando `.env.example`
 *  a `.env` o configurándolas en el panel del hosting.
 *
 *  Ningún dato de contacto viene inventado: mientras estén vacíos,
 *  los botones de WhatsApp/correo no se muestran y el formulario
 *  avisa de que el canal de envío está pendiente de configurar.
 * ============================================================
 */

const env = import.meta.env

export const site = {
  name: 'INDUSTRIA B.J.B.',
  tagline: 'Mobiliario comercial y carpintería arquitectónica',

  contact: {
    /**
     * Número de WhatsApp en formato internacional, SOLO dígitos.
     * Ejemplo de formato (Colombia): 57 + número → "573001234567".
     */
    whatsapp: env.VITE_WHATSAPP_NUMBER || '',

    /** Correo comercial que recibe solicitudes. */
    email: env.VITE_CONTACT_EMAIL || '',

    /**
     * (Opcional) Endpoint que recibe el formulario por POST (JSON).
     * Compatible con Formspree, Getform, Basin, un webhook de Make/Zapier
     * o una función propia. Si se define, tiene prioridad sobre WhatsApp.
     * Ejemplo: "https://formspree.io/f/xxxxxxx"
     */
    formEndpoint: env.VITE_FORM_ENDPOINT || '',

    /** Ciudad o dirección visible en el pie de página (opcional). */
    address: env.VITE_COMPANY_ADDRESS || '',
  },

  /** Redes sociales opcionales. Deja vacío lo que no exista. */
  social: {
    instagram: env.VITE_INSTAGRAM_URL || '',
    linkedin: env.VITE_LINKEDIN_URL || '',
  },
}

export const navLinks = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'soluciones', label: 'Soluciones' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'capacidad', label: 'Capacidad' },
  { id: 'empresa', label: 'Empresa' },
  { id: 'contacto', label: 'Contacto' },
]

/** Enlace de WhatsApp con mensaje prellenado (o null si no está configurado). */
export function whatsappLink(message = '') {
  const number = String(site.contact.whatsapp).replace(/\D/g, '')
  if (!number) return null
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${number}${text}`
}
