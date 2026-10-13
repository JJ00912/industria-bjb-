import Logo from '../components/Logo'
import Icon from '../components/Icon'
import { navLinks, site, whatsappLink } from '../config/site'
import { imageCredits } from '../data/media'
import { solutions } from '../data/content'

export default function Footer() {
  const year = new Date().getFullYear()
  const wa = whatsappLink()
  const { email, address } = site.contact

  return (
    <footer className="bg-ink text-ivory">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 lg:py-20">
        <div className="md:col-span-5">
          <a href="#inicio" aria-label="Volver al inicio" className="inline-block bg-ivory px-5 py-4">
            <Logo className="h-12" />
          </a>
          <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-mist">
            Diseño, fabricación e instalación de mobiliario comercial y carpintería arquitectónica para proyectos
            comerciales, corporativos e institucionales.
          </p>
        </div>

        <nav aria-label="Pie de página" className="md:col-span-2">
          <p className="eyebrow text-bronze-300">Navegación</p>
          <ul className="mt-5 space-y-1">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="inline-flex min-h-9 items-center text-[14px] text-ivory/75 hover:text-ivory">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="eyebrow text-bronze-300">Soluciones</p>
          <ul className="mt-5 space-y-1">
            {solutions.map((s) => (
              <li key={s.id}>
                <a href="#soluciones" className="inline-flex min-h-9 items-center text-[14px] text-ivory/75 hover:text-ivory">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow text-bronze-300">Contacto</p>
          <ul className="mt-5 space-y-3 text-[14px] text-ivory/75">
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-ivory">
                  <Icon name="whatsapp" size={18} /> WhatsApp
                </a>
              </li>
            )}
            {email && (
              <li>
                <a href={`mailto:${email}`} className="inline-flex items-center gap-2 break-all hover:text-ivory">
                  <Icon name="mail" size={18} className="shrink-0" /> {email}
                </a>
              </li>
            )}
            {address && (
              <li className="flex items-start gap-2">
                <Icon name="pin" size={18} className="mt-0.5 shrink-0" /> {address}
              </li>
            )}
            <li>
              <a href="#contacto" className="inline-flex items-center gap-2 text-ivory hover:text-bronze-300">
                Solicitar cotización <Icon name="arrow" size={15} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col gap-3 py-6 text-[12px] text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name} Todos los derechos reservados.
          </p>
          {imageCredits.length > 0 && (
            <p className="max-w-2xl md:text-right">
              Fotografías conceptuales de referencia vía Unsplash; no corresponden a obras ejecutadas por {site.name}
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
