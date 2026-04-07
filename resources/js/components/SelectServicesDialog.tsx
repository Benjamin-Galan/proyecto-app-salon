'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { PromotionFormService, Service } from "@/types"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Search } from "lucide-react"

interface SelectServicesModalProps {
    open: boolean
    onClose: () => void
    services?: Service[]
    selectedServices: PromotionFormService[]
    onServicesChange: (services: PromotionFormService[]) => void
}

export const SelectServicesDialog = ({
    open,
    onClose,
    services,
    selectedServices,
    onServicesChange,
}: SelectServicesModalProps) => {
    const [searchTerm, setSearchTerm] = useState("")

    const selectedIds = new Set(selectedServices.map(s => s.service_id))

    const filteredServices = services?.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? []

    const handleToggleService = (serviceId: number) => {
        if (selectedIds.has(serviceId)) {
            onServicesChange(
                selectedServices.filter(s => s.service_id !== serviceId)
            )
        } else {
            const currentService = services?.find(s => s.id === serviceId)
            onServicesChange([
                ...selectedServices,
                {
                    service_id: serviceId,
                    service_price: currentService?.price,
                    service_discount: 0,
                },
            ])
        }
    }

    const handleSelectAll = () => {
        if (selectedIds.size === filteredServices.length && filteredServices.length > 0) {
            // Deseleccionar todos los filtrados
            const filteredIds = new Set(filteredServices.map(s => s.id))
            onServicesChange(
                selectedServices.filter(s => !filteredIds.has(s.service_id))
            )
        } else {
            // Seleccionar todos los filtrados
            const newServices = filteredServices.filter(
                service => !selectedIds.has(service.id)
            ).map(service => ({
                service_id: service.id,
                service_price: service.price,
                service_discount: 0,
            }))

            onServicesChange([...selectedServices, ...newServices])
        }
    }

    const allFiltered = filteredServices.length > 0 &&
        filteredServices.every(service => selectedIds.has(service.id))

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="md:max-w-2xl dark:bg-slate-900 dark:border-slate-800">
                <DialogHeader>
                    <DialogTitle>Selecciona los servicios del paquete</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Search Input */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Buscar servicios..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Select All */}
                    <div className="flex items-center space-x-2 pb-2 border-b dark:border-slate-800">
                        <Checkbox
                            id="select-all"
                            checked={allFiltered && filteredServices.length > 0}
                            onCheckedChange={handleSelectAll}
                        />
                        <Label
                            htmlFor="select-all"
                            className="font-semibold cursor-pointer text-sm"
                        >
                            Seleccionar todos los mostrados
                        </Label>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                        {filteredServices.length > 0 ? (
                            filteredServices.map(service => (
                                <div
                                    key={service.id}
                                    className="flex items-start space-x-3 p-3 border dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                                    onClick={() => handleToggleService(service.id)}
                                >
                                    <Checkbox
                                        id={`service-${service.id}`}
                                        checked={selectedIds.has(service.id)}
                                        onCheckedChange={() => handleToggleService(service.id)}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <Label
                                            htmlFor={`service-${service.id}`}
                                            className="font-medium cursor-pointer text-sm leading-tight"
                                        >
                                            {service.name}
                                        </Label>
                                        {service.description && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                                {service.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                                No se encontraron servicios
                            </div>
                        )}
                    </div>

                    {/* Summary */}
                    <div className="bg-purple-50 dark:bg-slate-800 p-3 rounded-lg">
                        <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                            {selectedServices.length === 0
                                ? "No hay servicios seleccionados"
                                : `${selectedServices.length} servicio${selectedServices.length !== 1 ? "s" : ""} seleccionado${selectedServices.length !== 1 ? "s" : ""}`}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700">
                            Confirmar
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
