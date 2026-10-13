/**
 * Logo original de INDUSTRIA B.J.B. (proporción 374×154 conservada).
 * logo-bjb.png es el mismo archivo con el fondo blanco convertido en
 * transparencia; colores y trazos sin modificar.
 */
export default function Logo({ className = 'h-12', original = false }) {
  return (
    <img
      src={original ? '/brand/logo-original.png' : '/brand/logo-bjb.png'}
      alt="INDUSTRIA B.J.B."
      width="374"
      height="154"
      className={`w-auto select-none ${className}`}
      draggable="false"
    />
  )
}
