# INDUSTRIA B.J.B. — Sitio corporativo

Landing corporativa para INDUSTRIA B.J.B.: mobiliario comercial, mostradores, exhibidores, mobiliario a medida y carpintería arquitectónica.

**Stack:** React 19 · Vite 8 · Tailwind CSS 4 · tipografías autoalojadas (Cormorant Garamond + Manrope). Sin backend.

---

## 1. Ejecutar en local

Requisitos: **Node.js 20.19+ o 22.12+** (`node -v` para comprobar).

```bash
npm install
npm run dev        # http://localhost:5173
```

Versión de producción:

```bash
npm run build      # genera /dist
npm run preview    # sirve /dist en http://localhost:4173
```

## 2. Configurar los canales de contacto

No se incluyó ningún teléfono ni correo inventado. Define los reales en **una** de estas dos formas:

**a) Variables de entorno (recomendado).** Copia `.env.example` como `.env`:

```env
VITE_WHATSAPP_NUMBER=57XXXXXXXXXX     # solo dígitos, con indicativo de país
VITE_CONTACT_EMAIL=ventas@tudominio.com
VITE_FORM_ENDPOINT=                   # opcional (ver abajo)
VITE_COMPANY_ADDRESS=                 # opcional, se ve en el pie de página
```

**b) Directamente** en `src/config/site.js`.

Cómo se comporta el formulario (valida siempre todos los campos antes de enviar):

| Configuración | Qué pasa al enviar |
|---|---|
| `VITE_FORM_ENDPOINT` definido | Envía la solicitud por POST (JSON) y muestra confirmación. Sirve con Formspree, Getform, Basin, un webhook de Make/Zapier o una función propia. |
| Solo WhatsApp | Abre WhatsApp con la solicitud ya redactada. |
| Solo correo | Abre el cliente de correo del visitante con la solicitud redactada. |
| Nada configurado | Muestra un aviso indicando que falta configurar el canal. |

> Para recibir solicitudes en tu correo sin programar: crea un formulario gratuito en formspree.io y pega su URL en `VITE_FORM_ENDPOINT`.

Con WhatsApp configurado aparecen también el acceso directo en Contacto, en el pie y un botón flotante.

## 3. Fotografías

Las imágenes actuales son **conceptuales** (Unsplash, licencia de uso comercial gratuito) y se sirven optimizadas desde su CDN con `srcset` responsivo. El sitio las identifica como imágenes de referencia: **no se presentan como obras de INDUSTRIA B.J.B.**

**Sustituir por fotos reales** (todo está en `src/data/media.js`):

1. Copia la foto en `public/images/reales/` (JPG/WebP de ~2000 px de ancho, ≤ 500 KB).
2. En la entrada correspondiente añade `file: '/images/reales/mi-foto.webp'` y `conceptual: false`, y actualiza `alt`.

**Servirlas desde tu propio dominio** (opcional): `npm run images:local` descarga versiones WebP en `public/images/conceptual/` y el sitio las usa automáticamente.

## 4. Editar textos y portafolio

- Textos, soluciones, proyectos, proceso y capacidades: `src/data/content.js`
- Farmatodo aparece solo como una referencia más del portafolio (`projects` → `farmacias`).
- Para añadir un proyecto real: añade su foto en `media.js` y un objeto en `projects`. La galería muestra 5 piezas (1 grande + 4); si añades más, ajusta `layout` en `src/sections/Projects.jsx`.

Revisa antes de publicar que las afirmaciones del texto (instalación, capacidades, sectores) coinciden con los servicios reales de la empresa.

## 5. Desplegar en Vercel

**Opción A — desde GitHub (recomendado)**
1. Sube esta carpeta a un repositorio de GitHub.
2. En vercel.com → *Add New → Project* → importa el repositorio. Vercel detecta Vite solo (Build: `npm run build`, Output: `dist`).
3. En *Settings → Environment Variables* añade `VITE_WHATSAPP_NUMBER`, `VITE_CONTACT_EMAIL`, etc.
4. *Deploy*. Cada `git push` vuelve a publicar.
5. Dominio propio: *Settings → Domains* y sigue las indicaciones de DNS.

**Opción B — desde la terminal**
```bash
npm i -g vercel
vercel          # primera vez: vincula el proyecto
vercel --prod
```

> Las variables `VITE_*` se insertan al compilar: si las cambias en Vercel, vuelve a desplegar.

## 6. Otros alojamientos

El resultado de `npm run build` es una carpeta estática (`dist/`) que funciona en cualquier hosting:

- **Netlify:** build `npm run build`, publish `dist`.
- **Cloudflare Pages:** framework preset *Vite*, output `dist`.
- **Hosting tradicional (cPanel/FTP):** ejecuta `npm run build` en tu equipo (con el `.env` listo) y sube el *contenido* de `dist/` a `public_html`.

## Estructura

```
public/brand/        Logo original (y versión con fondo transparente), favicons
src/config/site.js   Contacto y navegación  ← configurar aquí
src/data/content.js  Todos los textos
src/data/media.js    Registro de imágenes (conceptuales / reales)
src/components/      Piezas reutilizables (Img, Button, Reveal, Lightbox, Icon…)
src/sections/        Secciones de la página
scripts/             Descarga opcional de imágenes
```
