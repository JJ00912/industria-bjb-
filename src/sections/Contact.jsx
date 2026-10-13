import { cloneElement, useState } from 'react'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import SectionIntro from '../components/SectionIntro'
import { site, whatsappLink } from '../config/site'
import { projectTypes } from '../data/content'

const initial = {
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
  tipo: '',
  ciudad: '',
  mensaje: '',
  acepta: false,
  website: '', // honeypot anti-spam (oculto)
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v) {
  const e = {}
  if (v.nombre.trim().length < 3) e.nombre = 'Escribe tu nombre completo.'
  if (v.empresa.trim().length < 2) e.empresa = 'Indica la empresa o entidad.'
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Escribe un correo válido.'
  const digits = v.telefono.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15) e.telefono = 'Escribe un teléfono válido (7 a 15 dígitos).'
  if (!v.tipo) e.tipo = 'Selecciona el tipo de proyecto.'
  if (v.mensaje.trim().length < 20) e.mensaje = 'Cuéntanos un poco más (mínimo 20 caracteres).'
  if (!v.acepta) e.acepta = 'Debes autorizar el tratamiento de datos para continuar.'
  return e
}

function buildMessage(v) {
  return [
    'Hola, INDUSTRIA B.J.B. Quiero cotizar un proyecto.',
    '',
    `Nombre: ${v.nombre}`,
    `Empresa: ${v.empresa}`,
    `Correo: ${v.email}`,
    `Teléfono: ${v.telefono}`,
    `Tipo de proyecto: ${v.tipo}`,
    v.ciudad ? `Ciudad: ${v.ciudad}` : null,
    '',
    `Detalle: ${v.mensaje}`,
  ]
    .filter((l) => l !== null)
    .join('\n')
}

export default function Contact() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  // idle | sending | sent | error | unconfigured
  const [status, setStatus] = useState('idle')
  const [channel, setChannel] = useState(null)

  const wa = whatsappLink('Hola, INDUSTRIA B.J.B. Quiero información sobre un proyecto.')
  const { email, formEndpoint } = site.contact

  const set = (name) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const next = { ...values, [name]: value }
    setValues(next)
    if (touched[name]) setErrors(validate(next))
  }
  const blur = (name) => () => {
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validate(values))
  }

  async function onSubmit(e) {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setTouched(Object.fromEntries(Object.keys(initial).map((k) => [k, true])))
    if (Object.keys(errs).length) {
      const first = document.getElementById(`f-${Object.keys(errs)[0]}`)
      first?.focus()
      return
    }
    if (values.website) return // bot

    const message = buildMessage(values)

    // 1) Endpoint (Formspree, webhook, función propia...)
    if (formEndpoint) {
      setStatus('sending')
      try {
        const { website, ...payload } = values
        const res = await fetch(formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...payload, _subject: `Solicitud de cotización — ${values.empresa}` }),
        })
        if (!res.ok) throw new Error(String(res.status))
        setChannel('form')
        setStatus('sent')
        setValues(initial)
        setTouched({})
      } catch {
        setStatus('error')
      }
      return
    }

    // 2) WhatsApp con el mensaje prellenado
    const waLink = whatsappLink(message)
    if (waLink) {
      window.open(waLink, '_blank', 'noopener')
      setChannel('whatsapp')
      setStatus('sent')
      return
    }

    // 3) Correo con el cliente de email del usuario
    if (email) {
      const subject = encodeURIComponent(`Solicitud de cotización — ${values.empresa}`)
      window.location.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(message)}`
      setChannel('email')
      setStatus('sent')
      return
    }

    // 4) Sin canal configurado
    console.warn('[INDUSTRIA B.J.B.] Configura WhatsApp, correo o endpoint en src/config/site.js o en variables de entorno.')
    setStatus('unconfigured')
  }

  const reset = () => {
    setValues(initial)
    setErrors({})
    setTouched({})
    setStatus('idle')
  }

  return (
    <section id="contacto" className="bg-ivory py-24 lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionIntro
            eyebrow="Hablemos de tu proyecto"
            title={['Cotiza con', 'nuestro equipo.']}
            text="Cuéntanos qué necesitas y te ayudaremos a encontrar la mejor solución en mobiliario comercial y carpintería arquitectónica."
          />

          {(wa || email || import.meta.env.DEV) && (
            <Reveal delay={120} className="mt-10 border-t border-graphite/12">
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-16 items-center gap-4 border-b border-graphite/12 py-4"
                >
                  <Icon name="whatsapp" size={24} className="text-wine" />
                  <span className="flex-1">
                    <span className="block text-[11px] font-semibold tracking-[0.16em] text-stone uppercase">WhatsApp</span>
                    <span className="text-[15px] text-ink">Escríbenos directamente</span>
                  </span>
                  <Icon name="arrow" size={16} className="text-stone transition-transform group-hover:translate-x-1" />
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="group flex min-h-16 items-center gap-4 border-b border-graphite/12 py-4"
                >
                  <Icon name="mail" size={24} className="text-wine" />
                  <span className="flex-1 break-all">
                    <span className="block text-[11px] font-semibold tracking-[0.16em] text-stone uppercase">Correo</span>
                    <span className="text-[15px] text-ink">{email}</span>
                  </span>
                  <Icon name="arrow" size={16} className="text-stone transition-transform group-hover:translate-x-1" />
                </a>
              )}
              {!wa && !email && import.meta.env.DEV && (
                <p className="border-b border-dashed border-bronze/50 py-4 text-[13px] leading-relaxed text-bronze-700">
                  <strong>Solo visible en desarrollo:</strong> añade el WhatsApp y el correo comercial en{' '}
                  <code>src/config/site.js</code> o en <code>.env</code> para mostrar los accesos directos aquí.
                </p>
              )}
            </Reveal>
          )}
        </div>

        <Reveal delay={150} className="lg:col-span-8">
          <div className="bg-ivory-50 p-6 shadow-[0_1px_0_rgba(20,17,16,0.06)] sm:p-10 lg:p-12">
            {status === 'sent' ? (
              <div role="status" className="flex min-h-[420px] flex-col items-start justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-wine text-ivory">
                  <Icon name="check" size={26} />
                </span>
                <h3 className="mt-6 text-[2.4rem] leading-none text-ink">Solicitud lista.</h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone">
                  {channel === 'whatsapp' &&
                    'Abrimos WhatsApp con tu solicitud redactada. Solo tienes que enviarla para que nuestro equipo la reciba.'}
                  {channel === 'email' &&
                    'Abrimos tu aplicación de correo con la solicitud redactada. Envíala para que nuestro equipo la reciba.'}
                  {channel === 'form' && 'Recibimos tu solicitud. Nuestro equipo te contactará para conocer el proyecto.'}
                </p>
                <Button type="button" variant="outlineDark" arrow={false} className="mt-8" onClick={reset}>
                  Enviar otra solicitud
                </Button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} aria-describedby="form-status">
                <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
                  <Field id="nombre" label="Nombre" required error={touched.nombre && errors.nombre}>
                    <input id="f-nombre" type="text" autoComplete="name" value={values.nombre} onChange={set('nombre')} onBlur={blur('nombre')} />
                  </Field>
                  <Field id="empresa" label="Empresa" required error={touched.empresa && errors.empresa}>
                    <input id="f-empresa" type="text" autoComplete="organization" value={values.empresa} onChange={set('empresa')} onBlur={blur('empresa')} />
                  </Field>
                  <Field id="email" label="Correo corporativo" required error={touched.email && errors.email}>
                    <input id="f-email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={set('email')} onBlur={blur('email')} />
                  </Field>
                  <Field id="telefono" label="Teléfono" required error={touched.telefono && errors.telefono}>
                    <input id="f-telefono" type="tel" inputMode="tel" autoComplete="tel" value={values.telefono} onChange={set('telefono')} onBlur={blur('telefono')} />
                  </Field>
                  <Field id="tipo" label="Tipo de proyecto" required error={touched.tipo && errors.tipo}>
                    <select id="f-tipo" value={values.tipo} onChange={set('tipo')} onBlur={blur('tipo')}>
                      <option value="">Selecciona una opción</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field id="ciudad" label="Ciudad del proyecto">
                    <input id="f-ciudad" type="text" autoComplete="address-level2" value={values.ciudad} onChange={set('ciudad')} />
                  </Field>
                  <Field id="mensaje" label="Cuéntanos sobre tu proyecto" required error={touched.mensaje && errors.mensaje} className="sm:col-span-2">
                    <textarea
                      id="f-mensaje"
                      rows={4}
                      value={values.mensaje}
                      onChange={set('mensaje')}
                      onBlur={blur('mensaje')}
                      placeholder="Tipo de espacio, cantidades aproximadas, fechas de obra o apertura…"
                    />
                  </Field>
                </div>

                {/* Honeypot */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="f-website">Sitio web</label>
                  <input id="f-website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
                </div>

                <div className="mt-7">
                  <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-stone">
                    <input
                      id="f-acepta"
                      type="checkbox"
                      checked={values.acepta}
                      onChange={set('acepta')}
                      onBlur={blur('acepta')}
                      aria-invalid={Boolean(touched.acepta && errors.acepta)}
                      aria-describedby={touched.acepta && errors.acepta ? 'e-acepta' : undefined}
                      className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-wine"
                    />
                    <span>Autorizo a INDUSTRIA B.J.B. a tratar mis datos personales para atender esta solicitud.</span>
                  </label>
                  {touched.acepta && errors.acepta && (
                    <p id="e-acepta" className="mt-2 pl-8 text-[12px] text-wine-600">
                      {errors.acepta}
                    </p>
                  )}
                </div>

                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[12px] text-stone">* Campos obligatorios</p>
                  <Button type="submit" variant="wine" disabled={status === 'sending'} className="w-full sm:w-auto">
                    {status === 'sending' ? 'Enviando…' : 'Enviar solicitud'}
                  </Button>
                </div>

                <div id="form-status" aria-live="polite">
                  {status === 'error' && (
                    <p className="mt-6 border-l-2 border-wine bg-wine/5 px-4 py-3 text-[14px] text-wine">
                      No pudimos enviar la solicitud. Inténtalo de nuevo en unos minutos
                      {wa ? ' o escríbenos por WhatsApp.' : '.'}
                    </p>
                  )}
                  {status === 'unconfigured' && (
                    <p className="mt-6 border-l-2 border-bronze bg-bronze/10 px-4 py-3 text-[14px] leading-relaxed text-bronze-700">
                      Tu solicitud es válida, pero el canal de envío aún no está configurado. Define{' '}
                      <code>VITE_WHATSAPP_NUMBER</code>, <code>VITE_CONTACT_EMAIL</code> o <code>VITE_FORM_ENDPOINT</code>{' '}
                      (ver <code>src/config/site.js</code>).
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Campo con etiqueta flotante superior, error accesible y estilos consistentes. */
function Field({ id, label, required, error, className = '', children }) {
  const describedBy = error ? `e-${id}` : undefined
  return (
    <div className={className}>
      <label htmlFor={`f-${id}`} className="block text-[11px] font-semibold tracking-[0.16em] text-graphite-500 uppercase">
        {label}
        {required && <span className="text-wine"> *</span>}
      </label>
      <div
        className={`mt-2 border-b transition-colors duration-300 focus-within:border-wine ${
          error ? 'border-wine-600' : 'border-graphite/25'
        } [&_input]:min-h-11 [&_input]:w-full [&_input]:bg-transparent [&_input]:py-2 [&_input]:text-[16px] [&_input]:text-ink [&_input]:outline-none [&_select]:min-h-11 [&_select]:w-full [&_select]:cursor-pointer [&_select]:bg-transparent [&_select]:py-2 [&_select]:text-[16px] [&_select]:text-ink [&_select]:outline-none [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:bg-transparent [&_textarea]:py-2 [&_textarea]:text-[16px] [&_textarea]:text-ink [&_textarea]:outline-none [&_textarea]:placeholder:text-stone/70`}
      >
        {cloneWithAria(children, error, describedBy, required)}
      </div>
      {error && (
        <p id={describedBy} className="mt-2 text-[12px] text-wine-600">
          {error}
        </p>
      )}
    </div>
  )
}

function cloneWithAria(el, error, describedBy, required) {
  return cloneElement(el, {
    'aria-invalid': Boolean(error),
    'aria-describedby': describedBy,
    'aria-required': required ? true : undefined,
  })
}
