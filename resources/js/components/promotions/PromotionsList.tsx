import { Promotion } from "@/types"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PromotionsOptions from "./PromotionsOptions"
import ServicesDetailsModal from "./ServicesDetailsModal"
import { cardStyle, imageStyle } from "@/utils/servicesCardStyles"

interface PromotionListProps {
    promotions: Promotion[]
    onEdit: (promotion: Promotion) => void
    onDelete: (promotion: Promotion) => void
}

const formatNumber = (number: number) => Number(number).toFixed(0)
const getPromotionType = (promotion: Promotion): string => {
    const direct = (promotion as Promotion & { promotion_type?: string }).promotion_type
    if (typeof direct === "string") return direct.toLowerCase()
    if (promotion.promotion_type) return String(promotion.promotion_type).toLowerCase()
    return ""
}

const renderTypeBadge = (promotion: Promotion) => {
    const type = getPromotionType(promotion)
    const label = type === "general" ? "General" : type === "individual" ? "Individual" : "Promocion"
    const classes = type === "general"
        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
        : "bg-sky-50 text-sky-700 border-sky-100"

    return (
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${classes}`}>
            {label}
        </span>
    )
}

export default function PromotionsList({ promotions, onEdit, onDelete }: PromotionListProps) {
    const [openServicesModal, setOpenServicesModal] = useState(false)
    const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null)

    if (!promotions.length) {
        return (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
                No hay promociones disponibles.
            </div>
        )
    }

    const handleViewServices = (promotion: Promotion) => {
        setSelectedPromotion(promotion)
        setOpenServicesModal(true)
    }

    console.log(promotions, 'LISTA PROMOS')

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {promotions?.map((promotion) => (
                    <Card
                        key={promotion.id}
                        className={cardStyle}
                    >
                        {/* Imagen del servicio */}
                        <div className={imageStyle}>
                            <img
                                src={promotion.image ? `/storage/promotions/${promotion.image}` : "/placeholder.svg?height=200&width=400"}
                                alt={promotion.name}
                                className="w-full object-cover"
                            />
                        </div>

                        <article className="px-2.5 py-1.5 space-y-1.5">
                            <div className="flex items-center justify-between gap-1">
                                <div className="flex-1 min-w-0">
                                    <CardTitle className="text-md font-semibold leading-snug text-gray-900 dark:text-gray-100 line-clamp-2">
                                        {promotion.name}
                                    </CardTitle>
                                </div>

                                <PromotionsOptions
                                    promotion={promotion}
                                    onEdit={() => onEdit(promotion)}
                                    onDelete={() => onDelete(promotion)}
                                    onView={handleViewServices}
                                />
                            </div>

                            {/* Descripción */}
                            {promotion.description && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                    {promotion.description}
                                </p>
                            )}

                            {/* Precio y descuento */}
                            <div className="pt-1.5 border-t border-gray-100 dark:border-gray-700/50">
                                <div className="flex items-center justify-between gap-2">
                                    <Badge variant="outline">
                                        {promotion.promotion_type}
                                    </Badge>

                                    <span className="text-sm font-bold text-green-600 dark:text-green-400">
                                        C$ {promotion.total}
                                    </span>
                                </div>
                            </div>
                        </article>
                    </Card>
                ))}
            </div>

            <ServicesDetailsModal
                promotion={selectedPromotion}
                open={openServicesModal}
                onClose={() => setOpenServicesModal(false)}
                formatNumber={formatNumber}
            />
        </div>
    )
}
