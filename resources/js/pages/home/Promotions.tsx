import type { Promotion, Service } from "@/types"
import { Sparkles } from "lucide-react"
import React from "react"

interface PromotionsProps {
  promotions: Promotion[]
}

function PromotionServices({ services }: { services: Service[] }) {
  return (
    <div className="services-list">
      {services.map((detail: Service) => (
        <div
          key={detail.id}
          className="service-row"
        >
          <span className="name">{detail.name}</span>
          <div className="prices">
            <span className="current">C${detail.price}</span>
            <span className="old">C${detail.discount}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function CompactPromotionCard({ promo }: { promo: Promotion }) {
  return (
    <article className="compact-promo-card">
      <div className="card-media">
        <img
          src={`/storage/promotions/${promo.image}`}
          alt={promo.name}
        />
        <div className="card-overlay" />
        <div className="card-badge">
          Oferta especial
        </div>
      </div>

      <div className="card-body">
        <div className="card-info">
          <h3 className="card-promo-title">{promo.name}</h3>
          <p className="card-promo-description">{promo.description}</p>
        </div>

        <div className="compact-services">
          {promo.services.slice(0, 2).map((detail: Service) => (
            <div key={detail.id} className="compact-service-item">
              <span className="name">{detail.name}</span>
              <span className="price">C${detail.price}</span>
            </div>
          ))}
        </div>

        <div className="card-actions">
          <button className="reserve-btn">
            Reservar
          </button>
          <button className="more-btn">
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
    <section className="promotions-section">
      <div className="promotions-background">
        <div className="circle-1"></div>
        <div className="circle-2"></div>
      </div>

      <div className="promotions-container">
        <div className="promotions-header">
          <div className="decoration">
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <h2 className="title">Promocion del mes</h2>
          <p className="subtitle">
            Descubre nuestras ofertas exclusivas disenadas para realzar tu belleza
          </p>
        </div>

        {mainPromotion && (
          <div className="main-promotion-card">
            <div className="card-layout">
              <div className="content-side">
                <div className="main-badge">
                  <Sparkles width={16} height={16} />
                  <span>Promocion principal</span>
                </div>

                <div className="promo-info">
                  <h3 className="promo-title">
                    {mainPromotion.name}
                  </h3>
                  <p className="promo-description">{mainPromotion.description}</p>
                </div>

                <PromotionServices services={mainPromotion.services} />

                <div className="button-group">
                  <button className="primary-btn">
                    Reservar ahora
                  </button>
                  <button className="secondary-btn">
                    Ver mas ofertas
                  </button>
                </div>

                <p className="disclaimer">
                  * Promocion valida hasta agotar existencias.
                </p>
              </div>

              <div className="image-side">
                <img
                  src={`/storage/promotions/${mainPromotion.image}`}
                  alt={mainPromotion.name}
                />

                <div className="image-overlay">
                  <div className="overlay-content">
                    <div className="overlay-badge">
                      Hasta 30% de descuento
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {secondaryPromotions.length > 0 && (
          <div className="secondary-promotions-grid">
            {secondaryPromotions.map((promo) => (
              <CompactPromotionCard key={promo.id} promo={promo} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
