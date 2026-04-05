import type React from "react"
import { Star, Users, SprayCan, Clock } from "lucide-react"
import { aboutUs } from "@/utils/data"

// Componente personalizado para las características
type FeatureProps = {
  icon: React.ReactNode
  title: string
}

const Feature = ({ icon, title }: FeatureProps) => (
  <div className="flex items-center gap-3">
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-beauty-light">
      <div className="text-beauty-deep">{icon}</div>
    </div>
    <span className="font-medium text-gray-800">{title}</span>
  </div>
)

// Componente personalizado para la calificación con estrellas
type RatingProps = {
  value: number
  total: number
}

const Rating = ({ value, total }: RatingProps) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < Math.floor(value) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
      <div className="text-2xl font-bold text-gray-800">
        {value}/{total}
      </div>
      <div className="text-sm text-gray-500">Calificación de clientes</div>
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
    <section className="py-20 bg-gradient-to-b from-white to-beauty-light relative" id="nosotros">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full bg-beauty-soft/40 blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[10%] left-[5%] w-64 h-64 rounded-full bg-beauty-medium/40 blur-[100px] opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Columna izquierda: Contenido */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-beauty-deep">{aboutUs.title}</h2>

            <p className="text-gray-600 leading-relaxed">{aboutUs.description}</p>

            <p className="text-gray-600 leading-relaxed">{aboutUs.history}</p>

            <div className="space-y-4 pt-4">
              {aboutUs.detalles.map((detalle) => (
                <Feature key={detalle.id} icon={getIcon(detalle.title)} title={detalle.title} />
              ))}
            </div>

            <div className="pt-4 md:hidden">
              <Rating value={aboutUs.calificacion.value} total={aboutUs.calificacion.total} />
            </div>
          </div>

          {/* Columna derecha: Imagen y calificación */}
          <div className="space-y-6">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
              <img src="/about.jpg" alt="Nuestro equipo" className="w-full h-full object-cover" />
            </div>

            <div className="hidden md:block">
              <Rating value={aboutUs.calificacion.value} total={aboutUs.calificacion.total} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
