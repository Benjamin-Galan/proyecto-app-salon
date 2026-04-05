import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Promotion, Service } from "@/types"
import { Sparkles } from "lucide-react"
import React from "react"

interface PromotionsProps {
  promotions: Promotion[]
}

function PromotionServices({ services }: { services: Service[] }) {
  return (
    <div className="space-y-3 pt-3 md:space-y-4 md:pt-5">
      {services.map((detail: Service) => (
        <div
          key={detail.id}
          className="flex items-center justify-between rounded-2xl border border-amber-100 bg-white/95 p-3 shadow-sm shadow-amber-100/40"
        >
          <span className="pr-3 text-sm font-medium text-gray-800 md:text-base">{detail.name}</span>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-sm font-bold text-beauty-deep md:text-base">C${detail.price}</span>
            <span className="text-xs text-gray-400 line-through md:text-sm">C${detail.discount}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function CompactPromotionCard({ promo }: { promo: Promotion }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={`/storage/promotions/${promo.image}`}
          alt={promo.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-beauty-deep/70 via-beauty-deep/20 to-transparent" />
        <div className="absolute left-4 top-4">
          <Badge className="rounded-full border border-white/40 bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm hover:bg-white/20">
            Oferta especial
          </Badge>
        </div>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div>
          <h3 className="mb-2 text-xl font-bold text-gray-800">{promo.name}</h3>
          <p className="line-clamp-2 text-sm text-gray-600">{promo.description}</p>
        </div>

        <div className="space-y-2">
          {promo.services.slice(0, 2).map((detail: Service) => (
            <div key={detail.id} className="flex items-center justify-between rounded-xl bg-amber-50/70 px-3 py-2">
              <span className="pr-3 text-sm text-gray-700">{detail.name}</span>
              <span className="text-sm font-semibold text-beauty-deep">C${detail.price}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <Button className="rounded-full bg-beauty-deep px-4 py-2 text-white hover:bg-beauty-dark">
            Reservar
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-beauty-medium/40 bg-white px-4 py-2 text-beauty-deep hover:bg-beauty-light"
          >
            Ver mas
          </Button>
        </div>
      </div>
    </article>
  )
}

export default function Promotions({ promotions }: PromotionsProps) {
  const mainPromotion = promotions.find((promotion) => promotion.main)
  const secondaryPromotions = mainPromotion
    ? promotions.filter((promotion) => promotion.id !== mainPromotion.id)
    : promotions

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-beauty-light via-white to-beauty-soft/20 py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[8%] right-[6%] h-64 w-64 rounded-full bg-beauty-soft/70 blur-[120px]"></div>
        <div className="absolute bottom-[8%] left-[6%] h-64 w-64 rounded-full bg-beauty-light blur-[120px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-beauty-medium"></div>
            <div className="h-[1px] w-8 bg-beauty-medium"></div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">Promocion del mes</h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Descubre nuestras ofertas exclusivas disenadas para realzar tu belleza
          </p>
        </div>

        {mainPromotion && (
          <div className="mb-10 overflow-hidden rounded-3xl border border-white/70 bg-white/70 shadow-[0_24px_80px_-32px_rgba(120,84,58,0.28)] backdrop-blur-sm">
            <div className="flex flex-col md:grid md:grid-cols-2 md:items-stretch">
              <div className="order-2 p-6 md:order-1 md:p-12 lg:p-16">
                <Badge
                  variant="secondary"
                  className="mb-4 w-fit rounded-full border border-beauty-medium/20 bg-white/90 px-3 py-1 text-beauty-deep hover:bg-white"
                >
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Sparkles width={16} height={16} />
                    <span>Promocion principal</span>
                  </div>
                </Badge>

                <div className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-800 md:text-3xl lg:text-4xl">
                      {mainPromotion.name}
                    </h3>
                    <p className="text-base text-gray-600 md:text-lg">{mainPromotion.description}</p>
                  </div>

                  <PromotionServices services={mainPromotion.services} />

                  <div className="flex flex-col gap-3 pt-4 sm:flex-row md:pt-6">
                    <Button className="rounded-full bg-beauty-deep px-6 py-3 text-sm text-white shadow-lg shadow-beauty-soft/30 transition-all duration-300 hover:bg-beauty-dark hover:shadow-beauty-soft/50 md:text-base">
                      Reservar ahora
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full border-beauty-medium/40 bg-white px-6 py-3 text-sm text-beauty-deep transition-all duration-300 hover:bg-beauty-light md:text-base"
                    >
                      Ver mas ofertas
                    </Button>
                  </div>

                  <p className="pt-2 text-xs italic text-gray-500 md:pt-4">
                    * Promocion valida hasta agotar existencias.
                  </p>
                </div>
              </div>

              <div className="relative order-1 min-h-[260px] md:order-2 md:min-h-[500px]">
                <img
                  src={`/storage/promotions/${mainPromotion.image}`}
                  alt={mainPromotion.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-beauty-deep/70 via-beauty-deep/25 to-white/10">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white md:p-8">
                    <div className="max-w-md">
                      <Badge className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-sm hover:bg-white/20 md:px-4 md:py-2 md:text-sm">
                        Hasta 30% de descuento
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {secondaryPromotions.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryPromotions.map((promo) => (
              <CompactPromotionCard key={promo.id} promo={promo} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
