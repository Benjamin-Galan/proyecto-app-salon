import { Dialog, DialogContent, DialogTitle } from "../ui/dialog"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { ScrollArea } from "../ui/scroll-area"
import { Clock, Tag, Percent, Sparkles } from "lucide-react"
import { formatDuration } from "@/utils/formatDuration"
import { formatCurrency } from "@/utils/formatCurrency"

import { Service } from "@/types"

interface ServiceDetailsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    service: Service | null
}

export default function ServiceDetailsDialog({ open, onOpenChange, service }: ServiceDetailsDialogProps) {
    const hasDiscount = Number(service?.discount) > 0

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTitle className="sr-only">{service?.name || "Detalles del servicio"}</DialogTitle>
            <DialogContent className="max-w-md gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-lg md:max-w-xl [&>button]:z-20 [&>button]:rounded-full [&>button]:bg-black/40 [&>button]:p-1.5 [&>button]:text-white [&>button]:backdrop-blur-sm [&>button]:hover:bg-black/60 [&>button]:opacity-100">
                <ScrollArea className="max-h-[90vh] sm:max-h-[85vh]">
                    {/* Hero image section */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-video">
                        <img
                            src={service?.image ? `/storage/services/${service.image}` : "/placeholder.svg?height=400&width=600"}
                            alt={`Imagen de ${service?.name}`}
                            className="h-full w-full object-cover"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                        {/* Title over image */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                            <h2 className="text-lg font-bold text-white drop-shadow-lg sm:text-xl md:text-2xl">
                                {service?.name}
                            </h2>
                        </div>

                        {/* Discount badge - floating */}
                        {hasDiscount && (
                            <div className="absolute top-3 left-3">
                                <Badge variant="destructive" className="gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shadow-lg backdrop-blur-sm sm:text-sm">
                                    <Percent className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                    -{service?.discount}%
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Content section */}
                    <div className="space-y-3 p-4 sm:p-5">
                        {/* Description */}
                        {service?.description && (
                            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                {service.description}
                            </p>
                        )}

                        {/* Price inline */}
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                C$ {formatCurrency(service?.total_price || 0)}
                            </span>
                            {hasDiscount && (
                                <span className="text-xs text-gray-400 line-through dark:text-gray-500">
                                    C$ {formatCurrency(service?.price || 0)}
                                </span>
                            )}
                        </div>

                        <Separator className="bg-gray-100 dark:bg-gray-700/40" />

                        {/* Info row */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                                <span>{formatDuration(service?.duration || 0)}</span>
                            </div>
                            <div className="h-3 w-px bg-gray-200 dark:bg-gray-700" />
                            <div className="flex items-center gap-1.5">
                                <Tag className="h-3.5 w-3.5 text-purple-500 dark:text-purple-400" />
                                <span>{service?.category?.name || "Sin categoría"}</span>
                            </div>
                            <div className="h-3 w-px bg-gray-200 dark:bg-gray-700" />
                            <div className="flex items-center gap-1.5">
                                <Sparkles className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
                                <span>{hasDiscount ? `${service?.discount}% dto.` : "Sin descuento"}</span>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}