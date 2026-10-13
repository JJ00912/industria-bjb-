import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Solutions from './sections/Solutions'
import Projects from './sections/Projects'
import Process from './sections/Process'
import Capacity from './sections/Capacity'
import Company from './sections/Company'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  return (
    <>
      <a
        href="#soluciones"
        className="sr-only z-[70] bg-wine px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <Projects />
        <Process />
        <Capacity />
        <Company />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
