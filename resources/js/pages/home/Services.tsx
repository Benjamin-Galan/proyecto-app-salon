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
    <section className="relative py-20 bg-gradient-to-b from-beauty-light to-[#f3f4f5]">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full bg-beauty-light blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[10%] left-[5%] w-64 h-64 rounded-full bg-beauty-soft blur-[100px] opacity-60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Título de sección con decoración */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <div className="flex items-center justify-center mb-3 gap-1">
            <div className="h-px w-8 bg-beauty-medium"></div>
            <div className="h-px w-8 bg-beauty-medium"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Nuestros Servicios</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Descubre nuestra exclusiva gama de servicios diseñados para realzar tu belleza natural
          </p>
        </div>

        {/* Grid de servicios con diseño mejorado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 min-[800px]:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
          {services.slice(0, visibleCount).map((servicio) => (
            <div
              key={servicio.id}
              className="relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-row sm:flex-col transition-all duration-300 hover:shadow-md"
              onMouseEnter={() => setHoveredCard(servicio.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Imagen con efecto hover */}
              <div className="w-32 aspect-video sm:w-full sm:aspect-[4/3] overflow-hidden shrink-0">
                <img
                  src={`/storage/services/${servicio.image}`}
                  alt={servicio.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out ${hoveredCard === servicio.id ? "scale-110" : ""}`}
                />
              </div>

              {/* Contenido */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{servicio.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                    {servicio.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-beauty-deep font-bold text-base sm:text-lg">C${servicio.price}</span>
                  <button
                    className="border border-beauty-medium text-beauty-deep bg-transparent rounded-full px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm transition-colors duration-300 hover:bg-beauty-medium hover:text-white cursor-pointer"
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
          <div className="flex justify-center mt-12">
            <button
              className="bg-transparent border border-beauty-medium text-beauty-deep px-8 py-3 rounded-full transition-colors duration-300 hover:bg-beauty-medium hover:text-white cursor-pointer"
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
