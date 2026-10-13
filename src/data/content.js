/**
 * Textos del sitio. Edita aquí sin tocar los componentes.
 * Regla editorial: no publicar cifras, años, certificaciones ni
 * clientes que no estén confirmados por INDUSTRIA B.J.B.
 */

export const hero = {
  eyebrow: 'Diseño · Fabricación · Instalación',
  titleA: 'Espacios comerciales',
  titleB: 'que generan valor.',
  text: 'Desarrollamos y fabricamos mobiliario para proyectos comerciales, corporativos e institucionales, con altos estándares de calidad y precisión.',
  slides: ['hero1', 'hero2', 'hero3'],
  pillars: [
    ['Diseño', 'a la medida'],
    ['Fabricación', 'especializada'],
    ['Instalación', 'profesional'],
    ['Proyectos', 'para empresas y constructoras'],
  ],
}

export const solutions = [
  {
    id: 'comercial',
    title: 'Mobiliario comercial',
    text: 'Estanterías, góndolas y sistemas de exhibición para puntos de venta, pensados para el tráfico diario y la operación de cadenas.',
    tags: ['Góndolas', 'Estanterías', 'Islas'],
    image: 'solComercial',
  },
  {
    id: 'mostradores',
    title: 'Mostradores y puntos de pago',
    text: 'Mostradores, cajas y recepciones que integran cableado, almacenamiento y la imagen de la marca en una sola pieza.',
    tags: ['Cajas', 'Recepciones', 'Puntos de atención'],
    image: 'solMostradores',
  },
  {
    id: 'exhibidores',
    title: 'Exhibidores',
    text: 'Vitrinas, muebles de pared y exhibidores con iluminación integrada para destacar producto y ordenar el recorrido.',
    tags: ['Vitrinas', 'Muebles de pared', 'Iluminación integrada'],
    image: 'solExhibidores',
  },
  {
    id: 'medida',
    title: 'Mobiliario a medida',
    text: 'Piezas diseñadas para un espacio y una necesidad específicos: oficinas, áreas de servicio, almacenamiento y zonas de espera.',
    tags: ['Oficinas', 'Almacenamiento', 'Piezas especiales'],
    image: 'solMedida',
  },
  {
    id: 'carpinteria',
    title: 'Carpintería arquitectónica',
    text: 'Revestimientos, listones, cielos rasos y paneles que aportan calidez y carácter arquitectónico a los interiores.',
    tags: ['Revestimientos', 'Listones', 'Paneles'],
    image: 'solCarpinteria',
  },
]

/**
 * Portafolio. Las imágenes son de referencia (ver media.js).
 * Para publicar un proyecto real: cambia `image` por una foto real
 * (conceptual: false) y ajusta título y descripción.
 */
export const projects = [
  {
    id: 'retail',
    category: 'Retail',
    title: 'Tiendas y cadenas comerciales',
    text: 'Mobiliario de exhibición, mostradores y carpintería para locales comerciales y cadenas.',
    image: 'projRetail',
  },
  {
    id: 'farmacias',
    category: 'Retail · Farmacias',
    title: 'Farmatodo',
    text: 'Fabricación de mobiliario para puntos de venta de la cadena. Referencia del sector farmacia.',
    image: 'projFarmacias',
    reference: true,
  },
  {
    id: 'corporativo',
    category: 'Corporativo',
    title: 'Oficinas y espacios empresariales',
    text: 'Puestos de trabajo, recepciones, almacenamiento y revestimientos para sedes corporativas.',
    image: 'projCorporativo',
  },
  {
    id: 'restaurantes',
    category: 'Comercial',
    title: 'Restaurantes y hospitality',
    text: 'Barras, bancas, revestimientos y mobiliario fijo para espacios gastronómicos.',
    image: 'projRestaurantes',
  },
  {
    id: 'constructoras',
    category: 'Comercial · Institucional',
    title: 'Proyectos con constructoras',
    text: 'Carpintería y mobiliario para obras desarrolladas junto a constructoras, coordinados con el cronograma de obra.',
    image: 'projInstitucional',
  },
]

export const process = [
  {
    n: '01',
    title: 'Entendemos el proyecto',
    text: 'Analizamos necesidades, espacio, operación y presupuesto con el cliente o la constructora.',
    icon: 'chat',
  },
  {
    n: '02',
    title: 'Diseño a la medida',
    text: 'Proponemos soluciones funcionales y estéticas, con planos y definición de materiales.',
    icon: 'compass',
  },
  {
    n: '03',
    title: 'Fabricación',
    text: 'Producimos en planta con procesos industriales y control de calidad en cada etapa.',
    icon: 'gear',
  },
  {
    n: '04',
    title: 'Entrega e instalación',
    text: 'Transportamos e instalamos en sitio, coordinando tiempos con la obra o la apertura.',
    icon: 'truck',
  },
]

export const capacity = {
  eyebrow: 'Capacidad industrial',
  title: ['Tecnología, oficio', 'y compromiso.'],
  text: 'Contamos con maquinaria especializada, personal calificado y procesos que nos permiten ejecutar proyectos con precisión, en los tiempos acordados y con resultados de alto nivel.',
  points: [
    { icon: 'gear', label: 'Maquinaria especializada' },
    { icon: 'team', label: 'Equipo calificado' },
    { icon: 'shield', label: 'Control de calidad' },
    { icon: 'layers', label: 'Producción en serie y a medida' },
    { icon: 'check', label: 'Cumplimiento de cronogramas' },
  ],
}

export const company = {
  eyebrow: 'La empresa',
  title: ['Una firma de fabricación', 'con criterio arquitectónico.'],
  paragraphs: [
    'INDUSTRIA B.J.B. diseña, fabrica e instala mobiliario comercial y carpintería arquitectónica para empresas, cadenas y constructoras.',
    'Trabajamos cada proyecto como una pieza única: entendemos cómo se usa el espacio, cuidamos el detalle de los materiales y respondemos con la capacidad de una planta industrial.',
  ],
  values: [
    { title: 'Precisión', text: 'Medidas, acabados y ensambles controlados desde el diseño hasta la instalación.' },
    { title: 'Cumplimiento', text: 'Planeación de producción alineada con los cronogramas de obra y apertura.' },
    { title: 'Acompañamiento', text: 'Un solo equipo responsable del proyecto, de la idea a la entrega.' },
  ],
}

export const projectTypes = [
  'Mobiliario comercial / retail',
  'Mostradores y puntos de pago',
  'Exhibidores',
  'Mobiliario corporativo',
  'Carpintería arquitectónica',
  'Proyecto con constructora',
  'Otro',
]
