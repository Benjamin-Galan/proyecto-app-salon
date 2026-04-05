import { Link } from "@inertiajs/react"
import Header from "./Header"
import { MobileMenu } from "./MobileMenu"
import { useMediaQuery } from "@/hooks/use-media-query"
import { gotoRegister } from "@/utils/goToRegister"

export default function Hero() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const { handleNavigate } = gotoRegister()

  return (
    <section className="hero">
      {/* Renderizado condicional basado en el tamaño de pantalla */}
      {isDesktop ? <Header /> : <MobileMenu />}

      {/* Contenido */}
      <div className="hero__content">
        <p className="hero__subtitle">Desde 2020</p>

        {/* Título principal */}
        <h1 className="hero__title">Uñas & Mechas</h1>

        {/* Descripción */}
        <p className="hero__description">
          Descubre la experiencia de belleza definitiva con nuestros servicios exclusivos y profesionales diseñados para
          realzar tu belleza natural.
        </p>

        {/* Botones */}
        <div className="hero__buttons">
          <button className="hero__button--primary" onClick={handleNavigate}>
            Agendar cita
          </button>

          <button className="hero__button--secondary">
            <Link href="#servicios" className="hover:text-white">
              Ver servicios
            </Link>
          </button>
        </div>
      </div>

      <div className="hero__background">
        <img src="/girl2.png" alt="Modelo mostrando peinado y maquillaje en Uñas & Mechas" />
      </div>
    </section>
  )
}
