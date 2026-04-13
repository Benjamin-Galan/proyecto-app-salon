import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { Service } from "@/types"
import { gotoRegister } from "@/utils/goToRegister"
import { Tag } from "lucide-react"

interface ServicesProps {
  services: Service[]
}

export default function Services({ services }: ServicesProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [visibleCount, setVisibleCount] = useState(4);
  const { handleNavigate } = gotoRegister()

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-beauty-light to-[#f3f4f5]">
      {/* Elementos decorativos de fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[8%] right-[6%] h-72 w-72 rounded-full bg-beauty-soft/60 blur-[130px]" />
        <div className="absolute bottom-[8%] left-[6%] h-72 w-72 rounded-full bg-beauty-light blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-beauty-medium/10 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6">
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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {services.slice(0, visibleCount).map((servicio) => (
            <div
              key={servicio.id}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-beauty-soft/60 shadow-sm shadow-beauty-soft/40 hover:shadow-lg hover:shadow-beauty-soft/50 hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden shrink-0">
                <img
                  src={
                    servicio.image
                      ? `/storage/services/${servicio.image}`
                      : "/placeholder.svg?height=200&width=400"
                  }
                  alt={servicio.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradiente inferior sobre la imagen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Badges sobre imagen */}
                {servicio && (
                  <div className="absolute top-2.5 right-2.5 flex flex-wrap gap-1.5 justify-end">
                    {servicio.discount > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-beauty-deep shadow">
                        <Tag className="h-2.5 w-2.5" />
                        {servicio.discount}% desc
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Línea decorativa violeta */}
              <div className="h-[3px] w-full bg-gradient-to-r from-beauty-soft via-beauty-medium to-beauty-deep" />

              {/* Contenido */}
              <div className="flex flex-col flex-1 p-4 gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
                    {servicio.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {servicio.description}
                  </p>
                </div>

                {/* Footer: precio */}
                <div className="mt-auto pt-2 border-t border-beauty-soft/50 flex items-center justify-end">
                  <span className="text-sm font-bold text-beauty-deep">
                    C$ {servicio.price}
                  </span>
                  {/* <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                    {servicio.duration}
                  </span> */}
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
