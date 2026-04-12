import type { Promotion, Service } from "@/types"
import { Sparkles } from "lucide-react"
import React from "react"

interface PromotionsProps {
  promotions: Promotion[]
}

function PromotionServices({ services }: { services: Service[] }) {
  return (
    <div className="flex flex-col gap-3 pt-3 md:gap-4 md:pt-5">
      {services.map((detail: Service) => (
        <div
          key={detail.id}
          className="flex items-center justify-between rounded-2xl border border-amber-100 bg-white/95 p-3 shadow-[0_1px_2px_0_rgba(254,243,199,0.4)]"
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
    <article className="bg-white rounded-2xl border border-amber-100 overflow-hidden relative shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={`/storage/promotions/${promo.image}`}
          alt={promo.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-beauty-deep/70 via-beauty-deep/20 to-transparent" />
        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full py-1 px-3 text-xs text-white">
          Oferta especial
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4 sm:p-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{promo.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{promo.description}</p>
        </div>

        <div className="flex flex-col gap-2">
          {promo.services.slice(0, 2).map((detail: Service) => (
            <div key={detail.id} className="flex items-center justify-between rounded-xl bg-amber-50/70 p-2 px-3">
              <span className="text-sm text-gray-700 pr-3">{detail.name}</span>
              <span className="text-sm font-semibold text-beauty-deep">C${detail.price}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <button className="bg-beauty-deep text-white px-4 py-2 rounded-full text-sm border-none cursor-pointer transition-colors duration-300 hover:bg-beauty-dark">
            Reservar
          </button>
          <button className="bg-white text-beauty-deep px-4 py-2 rounded-full text-sm border border-beauty-medium/40 cursor-pointer transition-colors duration-300 hover:bg-beauty-light">
            Ver mas
          </button>
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

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-beauty-medium"></div>
            <div className="h-px w-8 bg-beauty-medium"></div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">Promocion del mes</h2>
          <p className="mt-3 max-w-xl text-gray-500 mx-auto">
            Descubre nuestras ofertas exclusivas disenadas para realzar tu belleza
          </p>
        </div>

        {mainPromotion && (
          <div className="mb-10 overflow-hidden rounded-3xl border border-white/70 bg-white/70 shadow-[0_24px_80px_-32px_rgba(120,84,58,0.28)] backdrop-blur-sm">
            <div className="flex flex-col md:grid md:grid-cols-2 md:items-stretch">
              <div className="order-2 p-6 md:order-1 md:p-12 lg:p-16">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-beauty-medium/20 bg-white/90 py-1 px-3 text-sm font-medium text-beauty-deep">
                  <Sparkles width={16} height={16} />
                  <span>Promocion principal</span>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-800 md:text-3xl lg:text-4xl">
                    {mainPromotion.name}
                  </h3>
                  <p className="text-base text-gray-600 md:text-lg">{mainPromotion.description}</p>
                </div>

                <PromotionServices services={mainPromotion.services} />

                <div className="flex flex-col gap-3 pt-4 sm:flex-row md:pt-6">
                  <button className="bg-beauty-deep text-white py-3 px-6 rounded-full text-sm font-semibold border-none cursor-pointer transition-all duration-300 shadow-[0_10px_15px_-3px_rgba(var(--color-beauty-soft),0.3)] hover:bg-beauty-dark hover:shadow-[0_10px_15px_-3px_rgba(var(--color-beauty-soft),0.5)] md:text-base">
                    Reservar ahora
                  </button>
                  <button className="bg-white text-beauty-deep py-3 px-6 rounded-full text-sm font-semibold border border-beauty-medium/40 cursor-pointer transition-colors duration-300 hover:bg-beauty-light md:text-base">
                    Ver mas ofertas
                  </button>
                </div>

                <p className="pt-2 text-xs italic text-gray-500 md:pt-4">
                  * Promocion valida hasta agotar existencias.
                </p>
              </div>

              <div className="relative order-1 min-h-[260px] md:order-2 md:min-h-[500px]">
                <img
                  src={`/storage/promotions/${mainPromotion.image}`}
                  alt={mainPromotion.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-beauty-deep/70 via-beauty-deep/25 to-white/10">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white md:p-8">
                    <div className="inline-block rounded-full border border-white/30 bg-white/20 py-1 px-3 text-xs font-medium backdrop-blur-sm shadow-sm md:py-2 md:px-4 md:text-sm">
                      Hasta 30% de descuento
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
