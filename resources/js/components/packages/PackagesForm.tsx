import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Package, Service } from "@/types";
import { useForm, usePage, router } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { SelectServicesDialog } from "../SelectServicesDialog";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { route } from "ziggy-js";

interface PackagesFormProps {
    services?: Service[]
    package?: Package | null
    openSelectService: boolean
    onOpenSelectService: () => void
    onCloseSelectService: () => void
    onServicesCountChange: (count: number) => void
    onClose: () => void
    onSuccessCreate: () => void
}

export const PackagesForm = ({ services, package: currentPackage, openSelectService, onOpenSelectService, onCloseSelectService, onServicesCountChange, onClose, onSuccessCreate }: PackagesFormProps) => {
    const isEditing = !!currentPackage

    const { data, setData, post, put, processing, errors } = useForm<{
        name: string
        description: string
        discount: string
        services: { service_id: number, service_price?: number }[]
    }>({
        name: currentPackage?.name ?? "",
        description: currentPackage?.description ?? "",
        discount: currentPackage?.discount?.toString() ?? "",
        services: currentPackage?.services.map(service => ({
            service_id: service.id,
            service_price: service.price
        })) ?? [],
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            put(route('admin.packages.update', currentPackage.id), {
                onSuccess: () => {
                    toast.success("Paquete actualizado correctamente")
                    onClose()
                }
            })
        } else {
            post(route('admin.packages.store'), {
                onSuccess: () => {
                    onSuccessCreate()
                }
            })
        }
    }

    // Get selected service objects
    const selectedServiceObjects = data.services
        .map(s => (services || []).find(service => service.id === s.service_id))
        .filter(Boolean) as Service[]

    useEffect(() => {
        onServicesCountChange?.(selectedServiceObjects.length)
    }, [selectedServiceObjects.length])

    const handleRemoveService = (serviceId: number) => {
        setData(prev => ({
            ...prev,
            services: prev.services.filter(s => s.service_id !== serviceId)
        }))
    }

    const totalPrice = useMemo(() => {
        return selectedServiceObjects.reduce(
            (sum, s) => sum + Number(s.price),
            0
        )
    }, [selectedServiceObjects])

    const discountAmount = useMemo(() => {
        return (totalPrice * Number(data.discount || 0)) / 100
    }, [totalPrice, data.discount])

    const finalPrice = useMemo(() => {
        return totalPrice - discountAmount
    }, [totalPrice, discountAmount])

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className={`grid grid-cols-1 ${selectedServiceObjects.length > 0 ? "md:grid-cols-3" : "md:grid-cols-1"} gap-6`}>
                {/*Columna izquierda */}
                <div className="md:col-span-2 space-y-4">
                    <div>
                        <Label htmlFor="name">Nombre del paquete</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Ingresa el nombre del paquete"
                            className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <Label htmlFor="description">Descripción del paquete</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            placeholder="Ingresa la descripción del paquete"
                            className={errors.description ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                    </div>
                    <div>
                        <Label htmlFor="discount">Descuento del paquete</Label>
                        <Input
                            id="discount"
                            type="number"

                            max={100}
                            value={data.discount}
                            onChange={(e) => setData("discount", e.target.value)}
                            placeholder="Ingresa el descuento del paquete"
                            className={errors.discount ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        {errors.discount && <p className="text-sm text-red-500 mt-1">{errors.discount}</p>}
                    </div>
                    <div>
                        <Label>Servicios del paquete</Label>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onOpenSelectService}
                            className="w-full justify-start text-gray-500 mt-2"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Agregar servicios ({data.services.length})
                        </Button>
                        {errors.services && <p className="text-sm text-red-500 mt-1">{errors.services}</p>}
                    </div>

                    {/*Resumen del precio y descuento */}
                    <div className="rounded-lg border bg-gradient-to-br from-purple-50 to-purple-100 p-4 space-y-2">
                        <p>Resumen:</p>

                        <p className="text-sm text-gray-700">
                            Precio: <strong>C$ {totalPrice.toFixed(2)}</strong>
                        </p>

                        {Number(data.discount) > 0 && (
                            <>
                                <p className="text-sm text-gray-700">
                                    Descuento: <strong>{data.discount}%</strong>
                                </p>

                                <p className="text-sm text-green-600">
                                    Ahorro: <strong>C$ {discountAmount.toFixed(2)}</strong>
                                </p>
                            </>
                        )}

                        <div className="border-t pt-2">
                            <p className="text-lg font-bold text-purple-600">Total: C$ {finalPrice.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <div className="flex gap-3 pt-4 justify-end">
                            <Button type="submit" disabled={processing} className="flex-1">
                                {processing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                        {isEditing ? "Actualizando..." : "Creando..."}
                                    </>
                                ) : (
                                    <>{isEditing ? "Actualizar Paquete" : "Crear Paquete"}</>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/*Columna derecha */}
                {/*Price & services resume */}
                {selectedServiceObjects.length > 0 && (
                    <div className="md:col-span-1 space-y-4">
                        <div className="md:col-span-1 space-y-4">
                            <div className="mt-4 space-y-2 md:max-h-[50vh] overflow-y-auto">
                                {selectedServiceObjects.map(service => (
                                    <div
                                        key={service.id}
                                        className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg"
                                    >
                                        <div className="flex flex-col items-start gap-1">
                                            <p className="font-medium text-sm text-purple-900">
                                                {service.name}
                                            </p>

                                            <p className="text-sm text-purple-700">
                                                C$ {service.price}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleRemoveService(service.id)}
                                            className="ml-2 p-1 hover:bg-purple-200 rounded transition-colors"
                                        >
                                            <X className="w-4 h-4 text-purple-600" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <SelectServicesDialog
                open={openSelectService}
                onClose={onCloseSelectService}
                services={services}
                selectedServices={data.services}
                onServicesChange={(services) => setData("services", services)}
            />
        </form>
    )
}