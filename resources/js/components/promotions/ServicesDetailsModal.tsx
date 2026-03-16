import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog"
import { Promotion } from "@/types"
import { Tag } from "lucide-react"

interface Props {
    promotion: Promotion | null
    open: boolean
    onClose: () => void
    formatNumber: (number: number) => string
}

export default function ServicesDetailsModal({ promotion, open, onClose, formatNumber }: Props) {
    if (!promotion) return null

    const services = promotion.services || []
    const money = (value: number) =>
        new Intl.NumberFormat("es-NI", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)

    const rows = services.map((service) => {
        const price = Number(service.pivot?.service_price ?? service.price ?? 0)
        const discount = Number(service.pivot?.service_discount ?? 0)
        const total = price * (1 - discount / 100)

        return {
            id: service.id,
            name: service.name,
            price,
            discount,
            total,
        }
    })

    const subtotal = rows.reduce((acc, row) => acc + row.price, 0)
    const grandTotal = rows.reduce((acc, row) => acc + row.total, 0)

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="max-w-2xl" onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                    <DialogTitle>Detalles de servicios</DialogTitle>
                    <DialogDescription>
                        {promotion.name} - {services.length} servicios
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                    {rows.length === 0 && (
                        <p className="text-sm text-gray-500">Esta promocion no tiene servicios asociados.</p>
                    )}

                    {rows.length > 0 && (
                        <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
                            {rows.map((row) => (
                                <div
                                    key={row.id}
                                    className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
                                >
                                    <div className="mb-2 flex items-center justify-between">
                                        <p className="inline-flex items-center gap-2 text-sm font-medium">
                                            <Tag className="h-3.5 w-3.5 text-gray-400" />
                                            {row.name}
                                        </p>
                                        <span className="text-sm font-semibold text-green-600">
                                            C$ {money(row.total)}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                                        <span>Base: C$ {money(row.price)}</span>
                                        <span>Desc: {formatNumber(row.discount)}%</span>
                                        <span className="text-right">Final: C$ {money(row.total)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {rows.length > 0 && (
                        <div className="rounded-lg border border-pink-100 bg-pink-50/30 px-3 py-2 text-sm dark:border-pink-900 dark:bg-pink-950/20">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                                <span className="font-medium">C$ {money(subtotal)}</span>
                            </div>
                            <div className="mt-1 flex items-center justify-between">
                                <span className="text-gray-700 dark:text-gray-200">Total promocion</span>
                                <span className="font-semibold text-green-600 dark:text-green-400">
                                    C$ {money(grandTotal)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
