import { Promotion } from "@/types"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PromotionsOptions from "./PromotionsOptions"
import ServicesDetailsModal from "./ServicesDetailsModal"

interface PromotionListProps {
    promotions: Promotion[]
}

const formatNumber = (number: number) => Number(number).toFixed(0)
const formatCurrency = (number: number) => new Intl.NumberFormat("es-NI").format(Number(number || 0))
const getPromotionType = (promotion: Promotion): string => {
    const direct = (promotion as Promotion & { promotion_type?: string }).promotion_type
    if (typeof direct === "string") return direct.toLowerCase()
    if (promotion.promotion_type?.name) return String(promotion.promotion_type.name).toLowerCase()
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

export default function PromotionsList({ promotions }: PromotionListProps) {
    const [openServicesModal, setOpenServicesModal] = useState(false)
    const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null)

    const renderLegendType = (promotion: Promotion) => {
        const type = getPromotionType(promotion)

        if (type === "individual") {
            return "Promocion individual con descuento especifico por servicio."
        }

        if (type === "general") {
            return `Promocion general con ${formatNumber(promotion.discount)}% aplicado al total.`
        }

        return "Promocion con descuentos en servicios seleccionados."
    }

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

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {promotions.map((promotion) => {
                return (
                    <Card
                        key={promotion.id}
                        className="group relative flex h-full flex-col overflow-hidden border border-pink-100 bg-white p-1 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-100 dark:border-gray-700 dark:bg-gray-900"
                    >
                        <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-100">
                            <img
                                src={promotion.image ? `/storage/promotions/${promotion.image}` : "/placeholder.svg?height=200&width=400"}
                                alt={`Imagen de ${promotion.name}`}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        <CardHeader className="px-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1 space-y-2">
                                    {renderTypeBadge(promotion)}
                                    <CardTitle className="line-clamp-2 text-base font-semibold leading-tight">
                                        {promotion.name}
                                    </CardTitle>
                                </div>

                                <PromotionsOptions
                                    promotion={promotion}
                                    onEdit={(selectedPromotion) => {
                                        console.log("Edit promotion:", selectedPromotion)
                                    }}
                                    onDelete={(selectedPromotion) => {
                                        console.log("Delete promotion:", selectedPromotion)
                                    }}
                                />
                            </div>

                            {promotion.description && (
                                <p className="min-h-8 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                                    {promotion.description}
                                </p>
                            )}
                        </CardHeader>

                        <CardContent className="flex flex-1 flex-col p-4 pt-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-green-600 dark:text-green-400">
                                    {formatCurrency(promotion.total)} C$
                                </span>
                                <span className="text-xs text-gray-500">
                                    {promotion.services.length} servicios
                                </span>
                            </div>

                            <p className="mt-2 min-h-10 text-xs leading-5 text-gray-500 dark:text-gray-400">
                                {renderLegendType(promotion)}
                            </p>

                            <button
                                type="button"
                                onClick={() => handleViewServices(promotion)}
                                className="mt-auto pt-2 text-left text-xs font-medium text-pink-600 hover:underline"
                            >
                                Ver detalles de servicios
                            </button>
                        </CardContent>
                    </Card>
                )
            })}

            <ServicesDetailsModal
                promotion={selectedPromotion}
                open={openServicesModal}
                onClose={() => setOpenServicesModal(false)}
                formatNumber={formatNumber}
            />
        </div>
    )
}
