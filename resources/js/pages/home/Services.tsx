import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { Service } from "@/types"
import { gotoRegister } from "@/utils/goToRegister"

interface ServicesProps {
  services: Service[]
}

export default function Services({ services }: ServicesProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [visibleCount, setVisibleCount] = useState(4);
  const { handleNavigate } = gotoRegister()

  return (
    <section className="services-section">
      {/* Elementos decorativos de fondo */}
      <div className="services-background">
        <div className="circle-1"></div>
        <div className="circle-2"></div>
      </div>

      <div className="services-container">
        {/* Título de sección con decoración */}
        <div className="services-header">
          <div className="decoration-wrapper">
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <h2 className="title">Nuestros Servicios</h2>
          <p className="subtitle">
            Descubre nuestra exclusiva gama de servicios diseñados para realzar tu belleza natural
          </p>
        </div>

        {/* Grid de servicios con diseño mejorado */}
        <div className="services-grid">
          {services.slice(0, visibleCount).map((servicio) => (
            <div
              key={servicio.id}
              className="service-card"
              onMouseEnter={() => setHoveredCard(servicio.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Imagen con efecto hover */}
              <div className="image-container">
                <img
                  src={`/storage/services/${servicio.image}`}
                  alt={servicio.name}
                  className={hoveredCard === servicio.id ? "zoomed" : ""}
                />
              </div>

              {/* Contenido */}
              <div className="card-content">
                <div className="card-body">
                  <h3 className="service-name">{servicio.name}</h3>
                  <p className="service-description">
                    {servicio.description}
                  </p>
                </div>

                <div className="card-footer">
                  <span className="price">C${servicio.price}</span>
                  <button
                    className="reserve-btn"
                    onClick={handleNavigate}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón "Ver todos los servicios" */}
        {visibleCount < services.length && (
          <div className="view-more-wrapper">
            <button
              className="view-more-btn"
              onClick={() => setVisibleCount(visibleCount + 3)}
            >
              Ver más
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
