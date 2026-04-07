import type React from "react"
import { Star, Users, SprayCan, Clock } from "lucide-react"
import { aboutUs } from "@/utils/data"

// Componente personalizado para las características
type FeatureProps = {
  icon: React.ReactNode
  title: string
}

const Feature = ({ icon, title }: FeatureProps) => (
  <div className="feature-item">
    <div className="icon-wrapper">
      <div className="icon-content">{icon}</div>
    </div>
    <span className="feature-label">{title}</span>
  </div>
)

// Componente personalizado para la calificación con estrellas
type RatingProps = {
  value: number
  total: number
}

const Rating = ({ value, total }: RatingProps) => {
  return (
    <div className="rating-card">
      <div className="stars-list">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`star-icon ${i < Math.floor(value) ? "active" : "inactive"}`}
          />
        ))}
      </div>
      <div className="rating-number">
        {value}/{total}
      </div>
      <div className="rating-text">Calificación de clientes</div>
    </div>
  )
}

export default function About() {
  // Mapeo de iconos según el título
  const getIcon = (title: string) => {
    if (title.includes("Equipo")) return <Users className="w-5 h-5" />
    if (title.includes("Productos")) return <SprayCan className="w-5 h-5" />
    if (title.includes("años")) return <Clock className="w-5 h-5" />
    return <Star className="w-5 h-5" />
  }

  return (
    <section className="about-section" id="nosotros">
      {/* Elementos decorativos de fondo */}
      <div className="about-background">
        <div className="circle-1"></div>
        <div className="circle-2"></div>
      </div>

      <div className="about-container">
        <div className="about-grid">
          {/* Columna izquierda: Contenido */}
          <div className="about-content">
            <h2 className="about-title">{aboutUs.title}</h2>

            <p className="about-description">{aboutUs.description}</p>

            <p className="about-history">{aboutUs.history}</p>

            <div className="about-features">
              {aboutUs.detalles.map((detalle) => (
                <Feature key={detalle.id} icon={getIcon(detalle.title)} title={detalle.title} />
              ))}
            </div>

            <div className="about-mobile-rating">
              <Rating value={aboutUs.calificacion.value} total={aboutUs.calificacion.total} />
            </div>
          </div>

          {/* Columna derecha: Imagen y calificación */}
          <div className="about-visuals">
            <div className="image-wrapper">
              <img src="/about.jpg" alt="Nuestro equipo" />
            </div>

            <div className="desktop-rating">
              <Rating value={aboutUs.calificacion.value} total={aboutUs.calificacion.total} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
