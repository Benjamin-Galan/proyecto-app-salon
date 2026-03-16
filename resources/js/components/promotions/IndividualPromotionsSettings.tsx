import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PromotionFormData, Service } from "@/types";
import type { InertiaFormProps } from "@inertiajs/react";
import { X } from "lucide-react";

interface IndividualPromotionsSettingsProps {
    data: InertiaFormProps<PromotionFormData>["data"];
    setData: InertiaFormProps<PromotionFormData>["setData"];
    errors: InertiaFormProps<PromotionFormData>["errors"];
    selectedServices: Service[];
    handleRemoveService: (serviceId: number) => void;
}

export default function IndividualPromotionsSettings({
    data,
    setData,
    errors,
    selectedServices,
    handleRemoveService,
}: IndividualPromotionsSettingsProps) {
    const updateServiceDiscount = (serviceId: number, discountValue: string) => {
        setData((prev) => ({
            ...prev,
            services: prev.services.map((service) =>
                service.service_id === serviceId
                    ? { ...service, service_discount: discountValue }
                    : service
            ),
        }))
    }

    return (
        <div className="space-y-4 rounded-lg border bg-gray-50 p-4 mt-4">
            <div className="text-sm text-gray-700">
                Descuento individual por servicio
            </div>

            {selectedServices.length === 0 && (
                <p className="text-sm text-gray-500">
                    Selecciona servicios para configurar descuentos individuales.
                </p>
            )}

            <div className="space-y-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                {selectedServices.map((service) => {
                    const selectedService = data.services.find(
                        (item) => item.service_id === service.id
                    )
                    const serviceDiscount = Number(selectedService?.service_discount ?? 0)
                    const clampedDiscount = Math.min(Math.max(serviceDiscount, 0), 100)
                    const serviceTotal = Number(service.price) * (1 - clampedDiscount / 100)

                    //TODO 
                    //handleRemoveService(service.id)

                    return (
                        <div
                            key={service.id}
                            className="rounded-md border bg-white p-3 space-y-2"
                        >
                            <div className="flex items-center justify-between text-sm">
                                <p className="font-medium">{service.name}</p>

                                <button
                                    type="button"
                                    onClick={() => handleRemoveService(service.id)}
                                    className="ml-2 p-1 hover:bg-purple-200 rounded transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>

                            <div className="space-y-1 flex items-center gap-2">
                                <Label htmlFor={`discount-${service.id}`}>Descuento (%)</Label>
                                <Input
                                    className="w-50"
                                    id={`discount-${service.id}`}
                                    placeholder="Porcentaje de descuento"
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={selectedService?.service_discount ?? "0"}
                                    onChange={(e) => updateServiceDiscount(service.id, e.target.value)}
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <p className="text-xs text-gray-600">
                                    Precio base: C$ {Number(service.price).toFixed(2)}
                                </p>

                                <p className="text-xs text-gray-600">
                                    Total con descuento: C$ {serviceTotal.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {errors.services && <p className="text-sm text-red-500">{errors.services}</p>}
        </div>
    )
}
