import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { PromotionList, Service } from "@/types"
import { Sparkles } from "lucide-react"
import React from "react"

interface PromotionsProps {
  promotions: PromotionList
}

export default function Promotion({ promotions }: PromotionsProps) {
  return (
    <section className="py-20 overflow-hidden bg-yellow-950 relative">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-beauty-soft rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-beauty-medium rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Título de sección con decoración */}
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="h-[1px] w-8 bg-beauty-medium"></div>
            <div className="h-[1px] w-8 bg-beauty-medium"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Promoción del mes</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Descubre nuestras ofertas exclusivas diseñadas para realzar tu belleza
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          {/* Tarjeta de promoción con diseño mejorado */}
          <div className="flex flex-col md:grid md:grid-cols-2 items-stretch bg-gradient-to-r from-beauty-light to-beauty-soft/30">
            {promotions.map((promo) => (
              <React.Fragment key={promo.id}>
                {/* Imagen - Arriba en móvil, derecha en desktop */}
                <div className="relative h-48 md:h-full md:min-h-[500px] order-1 md:order-2">
                  <img
                    src={`/storage/promotions/${promo.image}`}
                    alt="Manicure Profesional"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Overlay con gradiente elegante */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
                      <div className="max-w-md">
                        <Badge className="bg-beauty-medium hover:bg-beauty-medium text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium shadow-lg">
                          Hasta 30% de descuento
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contenido - Abajo en móvil, izquierda en desktop */}
                <div className="p-6 md:p-12 lg:p-16 space-y-4 md:space-y-6 order-2 md:order-1">
                  {/* Badge */}
                  <Badge
                    variant="secondary"
                    className="w-fit mb-2 md:mb-4 bg-beauty-light text-beauty-deep hover:bg-beauty-light px-3 py-1 rounded-full"
                  >
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Sparkles width={16} height={16} />
                      <span>Oferta por tiempo limitado</span>
                    </div>
                  </Badge>

                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-800">
                      {promo.name}
                    </h3>
                    <p className="text-gray-600 text-base md:text-lg">{promo.description}</p>

                    {/* Ofertas con diseño mejorado */}
                    <div className="space-y-3 md:space-y-4 pt-2 md:pt-4">
                      {promo.services.map((detail: Service) => (
                        <div
                          key={detail.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm border border-gray-100"
                        >
                          <span className="font-medium text-gray-800 text-sm md:text-base">{detail.name}</span>
                          <div className="flex items-center gap-2 md:gap-3">
                            <span className="text-beauty-deep font-bold text-sm md:text-base">${detail.price}</span>
                            <span className="text-gray-400 text-xs md:text-sm line-through">${detail.discount}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Botones */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 md:pt-6">
                      <Button className="bg-beauty-deep hover:bg-beauty-dark text-white px-6 py-3 rounded-full shadow-lg shadow-beauty-soft/30 hover:shadow-beauty-soft/50 transition-all duration-300 text-sm md:text-base">
                        Reservar ahora
                      </Button>
                      <Button
                        variant="outline"
                        className="text-gray-700 border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-full transition-all duration-300 text-sm md:text-base"
                      >
                        Ver más ofertas
                      </Button>
                    </div>

                    {/* Nota de pie */}
                    <p className="text-xs text-gray-500 pt-2 md:pt-4 italic">
                      * Promoción válida hasta agotar existencias.
                    </p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
