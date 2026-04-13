import type { Promotion } from "@/types"
import { Sparkles, Tag, ChevronDown, ChevronUp } from "lucide-react"
import React, { useState } from "react"

interface PromotionsProps {
  promotions: Promotion[]
}

export default function Promotions({ promotions }: PromotionsProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const activePromotions = promotions.filter((p) => p.active)

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-beauty-light via-white to-beauty-soft/20 py-20">
      {/* Orbes decorativos de fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[8%] right-[6%] h-72 w-72 rounded-full bg-beauty-soft/60 blur-[130px]" />
        <div className="absolute bottom-[8%] left-[6%] h-72 w-72 rounded-full bg-beauty-light blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-beauty-medium/10 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Encabezado de sección */}
        <div className="mb-14 flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px w-10 bg-beauty-medium" />
            <Sparkles className="h-4 w-4 text-beauty-medium" />
            <div className="h-px w-10 bg-beauty-medium" />
          </div>

          <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
            Promociones
          </h2>
          <p className="mt-3 max-w-xl text-gray-500 mx-auto text-sm leading-relaxed">
            Descubre nuestras ofertas exclusivas diseñadas para realzar tu belleza
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {activePromotions.map((promotion) => {
            const isExpanded = expandedCard === promotion.id
            const visibleServices = isExpanded
              ? promotion.services
              : promotion.services.slice(0, 3)

            return (
              <div
                key={promotion.id}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-beauty-soft/60 shadow-sm shadow-beauty-soft/40 hover:shadow-lg hover:shadow-beauty-soft/50 hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Imagen con overlay gradiente */}
                <div className="relative aspect-video overflow-hidden shrink-0">
                  <img
                    src={
                      promotion.image
                        ? `/storage/promotions/${promotion.image}`
                        : "/placeholder.svg?height=200&width=400"
                    }
                    alt={promotion.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradiente inferior sobre la imagen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Badges sobre imagen */}
                  {promotion.main && (
                    <div className="absolute top-2.5 right-2.5 flex flex-wrap gap-1.5 justify-end">
                      <span className="inline-flex items-center gap-1 rounded-full bg-beauty-deep/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-semibold text-white shadow">
                        <Sparkles className="h-2.5 w-2.5" />
                        Del mes
                      </span>
                      {promotion.discount > 0 && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-beauty-deep shadow">
                          <Tag className="h-2.5 w-2.5" />
                          {promotion.discount}% desc
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
                      {promotion.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {promotion.description}
                    </p>
                  </div>

                  {/* Servicios incluidos */}
                  {promotion.services.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {visibleServices.map((service) => (
                        <span
                          key={service.id}
                          className="inline-flex items-center gap-1 rounded-full bg-beauty-light/70 border border-beauty-soft px-2.5 py-0.5 text-[10px] font-medium text-beauty-deep"
                        >
                          {service.name}
                          {promotion.promotion_type === "Individual" &&
                            service.pivot?.service_discount && (
                              <span className="text-beauty-medium font-semibold">
                                -{service.pivot.service_discount}%
                              </span>
                            )}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Ver más / Ver menos servicios */}
                  {promotion.services.length > 3 && (
                    <button
                      onClick={() =>
                        setExpandedCard(isExpanded ? null : promotion.id)
                      }
                      className="inline-flex items-center gap-0.5 text-[11px] font-medium text-beauty-deep hover:text-beauty-medium transition-colors self-start"
                    >
                      {isExpanded ? (
                        <>
                          Ver menos <ChevronUp className="h-3 w-3" />
                        </>
                      ) : (
                        <>
                          Ver más ({promotion.services.length - 3}){" "}
                          <ChevronDown className="h-3 w-3" />
                        </>
                      )}
                    </button>
                  )}

                  {/* Footer: precio */}
                  <div className="mt-auto pt-2 border-t border-beauty-soft/50 flex items-center justify-between">
                    <span className="text-sm font-bold text-beauty-deep">
                      C$ {promotion.total}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                      {promotion.promotion_type}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
