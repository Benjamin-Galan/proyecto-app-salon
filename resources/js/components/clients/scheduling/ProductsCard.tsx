import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Plus } from "lucide-react"
import { Service, Promotion, Package } from "@/types"

interface ProductsCardProps {
    item: Service | Promotion | Package
    type: "service" | "promotion" | "package"
    onAdd: () => void
}

export function ProductsCard({ item, type, onAdd }: ProductsCardProps) {
    const typedItem = item as Service | Package
    const itemDiscount = typedItem.discount

    const getPrice = () => {
        if (type === "service") {
            const service = item as Service
            return Number.parseFloat(service.price) - Number.parseFloat(service.discount)
        }

        const other = item as Promotion | Package
        return Number.parseFloat(String(other.total ?? "0"))
    }

    const getOriginalPrice = () => {
        if (type === "service") {
            const service = item as Service
            return Number.parseFloat(service.price)
        }

        const other = item as Package | Promotion
        return Number.parseFloat(String(other.subtotal ?? "0"))
    }

    const hasDiscount = () => {
        if (type === "service") {
            const service = item as Service
            return Number.parseFloat(service.discount) > 0
        }

        const other = item as Package
        return Number.parseFloat(String(other.discount ?? "0")) > 0
    }

    const getDuration = () => {
        if (type === "service") {
            return (item as Service).duration
        }
        if ("services" in item) {
            return item.services.reduce((total: number, service: Service) => total + service.duration, 0)
        }
        return 0
    }

    const getImageUrl = () => {
        if (!item.image) return null

        if (type === "service") {
            return `/storage/services/${item.image}`
        }
        if (type === "promotion") {
            return `/storage/promotions/${item.image}`
        }
        if (type === "package") {
            return `/storage/package/${item.image}`
        }

        return null
    }

    return (
        <Card className="overflow-hidden">
            <div className={`py-2 px-3 ${item.image || type !== "package" ? "gap-3" : ""}`}>
                {/*Imagen a la izquierda - solo mostrar si hay una imagen o no es un paquete */}
                {(item.image || type !== "package") && (
                    <div className="w-full h-30 bg-muted rounded-lg flex-shrink-0 overflow-hidden mb-3">
                        {item.image ? (
                            <img
                                src={getImageUrl() || `/placeholder.svg?height=80&width=80`}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = `/placeholder.svg?height=80&width=80`
                                }}
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">Sin imagen</span>
                            </div>
                        )}
                    </div>
                )}

                {/*Contenido a la derecha */}
                <div className="flex-1 flex flex-col min-h-[80px]">
                    {/*Header con titulo y badges */}
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-sm leading-tight flex-1 pr-2">
                            {item.name}
                        </h3>
                        <div className="flex gap-1 flex-shrink-0">
                            {/*Imprimir un badge dependiendo del tipo */}
                            {type !== "service" && (
                                <Badge variant="secondary" className="text-xs px-2 py-0">
                                    {type === "promotion" ? "Promo" : "Pack"}
                                </Badge>
                            )}

                            {/*Imprimir un badge dependiendo del tipo */}
                            {hasDiscount() && (
                                <Badge className="bg-red-500 text-xs px-2 py-0">
                                    {type === "service" ? `$${(item as Service).discount} OFF` : `${itemDiscount}% OFF`}
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Descripción */}
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{item.description}</p>

                    {/*Servicios incluidos para paquetes y promociones (services de cada interface) */}
                    {type !== "service" && "services" in item && (
                        <div className="mb-2">
                            <div className="flex flex-wrap gap-1">
                                {item.services.map((service) => (
                                    <Badge key={service.id} variant="outline" className="text-xs px-1 py-0">
                                        {service.name}
                                    </Badge>
                                ))}
                                {item.services.length > 2 && (
                                    <Badge variant="outline" className="text-xs px-1 py-0">
                                        +{item.services.length - 2} más
                                    </Badge>
                                )}
                            </div>
                        </div>
                    )}

                    {/*Footer con duración, precio y boton */}
                    <div className="mt-auto">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{getDuration()} min</span>
                            </div>
                            <div className="text-right">
                                {hasDiscount() && (
                                    <p className="text-xs text-muted-foreground line-through">C$ {getOriginalPrice().toFixed(2)}</p>
                                )}
                                <p className="text-sm font-bold text-primary">C$ {getPrice().toFixed(2)}</p>
                            </div>
                        </div>

                        <Button onClick={onAdd} className="w-full" size="sm">
                            <Plus className="w-3 h-3 mr-1" />
                            Agregar
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}
