import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Service, Promotion, PromotionType, PromotionFormData } from "@/types";
import { useForm, usePage, router } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";

import { SelectServicesDialog } from "../SelectServicesDialog";
import PromotionSettings from "./IndividualPromotionsSettings";
import GeneralPromotionsSettings from "./GeneralPromotionsSettings";
import ImagePreview from "../ImagePreview";
import { route } from "ziggy-js";
import { toast } from "sonner";

interface PromotionsProps {
    services: Service[];
    promotion?: Promotion | null
    openSelectService: boolean
    onOpenSelectService: () => void
    onCloseSelectService: () => void
    selectedOption: PromotionType | null
}

export default function PromotionsMainForm({
    services,
    promotion,
    openSelectService,
    onOpenSelectService,
    onCloseSelectService,
    selectedOption
}: PromotionsProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, put, processing, errors } = useForm<{
        name: string
        description: string
        discount: string
        image: File | null
        duration: string
        promotion_type: string
        expire_date?: string
        services: { service_id: number, service_price?: number, service_discount?: number }[]
    }>({
        name: promotion?.name ?? "",
        description: promotion?.description ?? "",
        discount: promotion?.discount?.toString() ?? "",
        image: null,
        duration: promotion?.duration.toString() ?? "",
        promotion_type: promotion?.promotion_type ?? selectedOption?.name ?? "",
        expire_date: promotion?.expire_date ?? new Date().toISOString().split("T")[0],
        services: promotion?.services.map(service => ({
            service_id: service.id,
            service_price: service?.price,
            service_discount: service?.discount
        })) ?? [],
    })

    const isEditing = !!promotion;

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();

    //     if (isEditing) {
    //         put(route('admin.promotions.update', promotion.id), {
    //             onSuccess: () => {
    //                 toast.success('Promocion actualizada')
    //             }
    //         })
    //     } else {
    //         post(route('admin.promotions.store'), {
    //             onSuccess: () => {
    //                 toast.success("Paquete creado")
    //             }
    //         })
    //     }
    // }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            router.post(`/admin/promotions/${promotion?.id}`, {
                _method: 'put',
                ...data,
            }, {
                onSuccess: () => {
                    toast.success('Promoción actualizada')
                }
            })
        } else {
            post('/admin/promotions', {
                onSuccess: () => {
                    toast.success('Promoción creada')
                }
            })
        }
    };

    const selectedServiceObjects = data.services
        .map(s => (services || []).find(service => service.id === s.service_id))
        .filter(Boolean) as Service[]

    const subtotal = useMemo(
        () => selectedServiceObjects.reduce((sum, service) => sum + Number(service.price || 0), 0),
        [selectedServiceObjects]
    )

    const totalDuration = useMemo(
        () => selectedServiceObjects.reduce((sum, service) => sum + Number(service.duration || 0), 0),
        [selectedServiceObjects]
    )

    const total = useMemo(() => {
        if (selectedOption?.name === "Individual") {
            return selectedServiceObjects.reduce((sum, service) => {
                const serviceInForm = data.services.find(item => item.service_id === service.id)
                const discount = Number(serviceInForm?.service_discount ?? 0)
                const clampedDiscount = Math.min(Math.max(discount, 0), 100)
                const serviceTotal = Number(service.price) * (1 - clampedDiscount / 100)
                return sum + serviceTotal
            }, 0)
        }

        const globalDiscount = Number(data.discount || 0)
        const clampedGlobalDiscount = Math.min(Math.max(globalDiscount, 0), 100)
        return subtotal * (1 - clampedGlobalDiscount / 100)
    }, [selectedOption?.name, selectedServiceObjects, data.services, data.discount, subtotal])

    useEffect(() => {
        const subtotalValue = subtotal.toFixed(2)
        const totalValue = total.toFixed(2)
        const durationValue = totalDuration.toString()
        const effectiveDiscount =
            subtotal > 0 ? (((subtotal - total) / subtotal) * 100).toFixed(2) : "0"

        setData(prev => {
            const nextDiscount = selectedOption?.name === "Individual" ? effectiveDiscount : prev.discount

            if (
                prev.subtotal === subtotalValue &&
                prev.total === totalValue &&
                prev.duration === durationValue &&
                prev.discount === nextDiscount
            ) {
                return prev
            }

            return {
                ...prev,
                subtotal: subtotalValue,
                total: totalValue,
                duration: durationValue,
                discount: nextDiscount,
            }
        })
    }, [subtotal, total, totalDuration, selectedOption?.name, setData])

    const handleRemoveService = (serviceId: number) => {
        setData(prev => ({
            ...prev,
            services: prev.services.filter(s => s.service_id !== serviceId)
        }))
    }

    const imgPath = promotion?.image
        ? `/storage/promotions/${promotion.image}`
        : ""

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null

        if (file) {
            setData("image", file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

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
        <div>
            <form encType="multipart/form-data" className="w-full" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/*Columna izquireda */}
                    <div className="md:col-span-2 space-y-4">
                        {/*Nombre de la promocion */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                                Nombre de la promoción
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="Ingresa el nombre completo"
                                className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                            />
                            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
                                Descripción de la promoción
                            </Label>
                            <Textarea name="description" value={data.description} onChange={(e) => setData("description", e.target.value)} />
                            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                        </div>

                        <div
                            className="flex flex-col md:flex-row items-center gap-4 w-full"
                        >
                            <div className="space-y-2 w-full">
                                <Label>Imagen</Label>
                                <Input
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={e => handleImageChange(e)}
                                />
                                {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image}</p>}
                            </div>

                            <div className="w-full">
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
                        </div>

                        {/*LUGAR TEMPORAL ACOMODAR BIEN LUEGO */}
                        <div className="space-y-2 w-full">
                            <Label>Fecha de expiracion</Label>
                            <Input
                                name="expire_date"
                                type="date"
                                onChange={e => setData("expire_date", e.target.value)}
                            />
                            {errors.expire_date && <p className="text-sm text-red-500 mt-1">{errors.expire_date}</p>}
                        </div>
                    </div>

                    {/*Columna derecha */}
                    <div className="space-y-4">
                        {/*Preview de imagen y servicios */}
                        <ImagePreview imagePreview={imagePreview} imgPath={imgPath} />
                    </div>
                </div>

                <div className="space-y-4 rounded-lg border bg-gray-50 p-4 mt-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="text-sm font-medium mb-2">
                            {`Descuento ${selectedOption?.name} por servicio`}
                        </div>

                        {selectedOption?.name === "General" && (

                            <div className="space-y-1 flex items-center gap-2">
                                <Label htmlFor='discount'>Descuento (%)</Label>
                                <Input
                                    className="w-50"
                                    id='discount'
                                    placeholder="Porcentaje de descuento"
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={data.discount}
                                    onChange={(e) => setData("discount", e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    {selectedServiceObjects.length === 0 && (
                        <p className="text-sm text-gray-500">
                            Selecciona servicios para configurar la promoción.
                        </p>
                    )}

                    <div className="space-y-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                        {selectedServiceObjects.map((service) => {
                            const selectedService = data.services.find(
                                (item) => item.service_id === service.id
                            )
                            const serviceDiscount = Number(selectedService?.service_discount ?? 0)
                            const clampedDiscount = Math.min(Math.max(serviceDiscount, 0), 100)
                            const serviceTotal = Number(service.price) * (1 - clampedDiscount / 100)

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

                                    {selectedOption?.name === "Individual" && (
                                        <div>
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
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {errors.services && <p className="text-sm text-red-500">{errors.services}</p>}
                </div>

                <div className="flex justify-end">
                    <div className="flex gap-3 pt-4 w-1/4">
                        <Button type="submit" className="flex-1">
                            Guardar
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
            </form>

            <SelectServicesDialog
                open={openSelectService}
                onClose={onCloseSelectService}
                services={services}
                selectedServices={data.services}
                onServicesChange={(services) => setData("services", services)}
            />
        </div>
    )
}
