import { Check } from "lucide-react"
import type { Package } from "@/types"
import { gotoRegister } from "@/utils/goToRegister"

interface PackageListProps {
  packages: Package[]
}

export default function Packages({ packages }: PackageListProps) {
  const { handleNavigate } = gotoRegister()

  return (
    <section className="packages-section">
      <div className="packages-container">
        {/* Título y Descripción */}
        <div className="packages-header">
          <h2 className="title">Paquetes Especiales</h2>
          <p className="subtitle">
            Combina nuestros servicios y ahorra con estos paquetes diseñados para ti.
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="packages-grid">
          {packages.map((pack) => (
            <div
              key={pack.id}
              className="package-card"
            >
              <div className="package-header">
                <h3 className="package-title">{pack.name}</h3>
                <p className="package-description">{pack.description}</p>
              </div>

              <div className="package-content">
                <div className="price-wrapper">
                  <div className="price-amount">
                    C$ {pack.total}
                    <span className="price-unit"> / sesión</span>
                  </div>
                </div>

                {/* Lista de servicios con checkmarks */}
                <ul className="services-list">
                  {pack.services.map((service, index) => (
                    <li key={index} className="service-item">
                      <Check className="check-icon" />
                      <span className="service-name">{service.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="package-footer">
                <button
                  className="reserve-btn"
                  onClick={handleNavigate}
                >
                  Reservar ahora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
