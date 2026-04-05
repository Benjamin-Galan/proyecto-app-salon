import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Category, Service } from "@/types";
import { useForm, router } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { durationIntervals } from "@/utils/timeSelectionData";

interface Props {
    categories: Category[]
    service?: Service | null
    onCreated?: () => void
    onUpdated?: () => void
}

export const ServicesForm = ({ categories, service, onCreated, onUpdated }: Props) => {
    const [imagePreview, setImagePreview] = useState<string | null>("")
    const isEdit = !!service;

    const { data, setData, post, processing, errors, setError } = useForm<{
        name: string
        description: string
        price: string
        discount: string
        duration: string
        category_id: string
        image: File | null
    }>({
        name: service?.name ?? "",
        description: service?.description ?? "",
        price: service?.price.toString() ?? "",
        discount: service?.discount.toString() ?? "",
        duration: service?.duration.toString() ?? "",
        category_id: service?.category_id.toString() ?? "",
        image: null,
    })

    console.log(service?.image, "Que llega_")

    const imgPath = service?.image
        ? `/storage/services/${service.image}`
        : ""
    console.log(imgPath, "RUTA IMG")

    const pricePreview = useMemo(() => {
        const price = Number(data.price) || 0
        const discountPercent = Number(data.discount) || 0
        const discountAmount = (price * discountPercent) / 100
        const total = Math.max(price - discountAmount, 0)

        return { discountAmount, total }
    }, [data.price, data.discount])

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            router.post(`/admin/services/${service?.id}`, {
                _method: 'put',
                ...data,
            }, {
                onSuccess: onUpdated
            })
        } else {
            post('/admin/services', {
                onSuccess: onCreated
            })
        }
    };

    console.log(errors, "Errores")
    console.log(data, "Data")

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/*Columna izquireda */}
                <div className="md:col-span-2 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                            Nombre del Servicio
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
                            Descripción del Servicio
                        </Label>
                        <Textarea name="description" value={data.description} onChange={(e) => setData("description", e.target.value)} />
                        {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                    </div>

                    <div>
                        <Label>Imagen</Label>
                        <Input
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={e => handleImageChange(e)}
                        />
                        {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image}</p>}
                    </div>

                    {/*PRECIO Y DESCUENTO*/}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Precio</Label>
                            <Input
                                id="price"
                                type="number"
                                min={1}
                                value={data.price}
                                onChange={(e) => setData("price", e.target.value)}
                                placeholder="Ingresa el precio"
                                className={errors.price ? "border-red-500 focus-visible:ring-red-500" : ""}
                            />
                            {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="discount">Descuento del servicio</Label>
                            <Input
                                id="discount"
                                value={data.discount}
                                type="number"
                                min="0"
                                max="100"
                                onChange={(e) => setData("discount", e.target.value)}
                                placeholder="Ingresa el descuento"
                                className={errors.discount ? "border-red-500 focus-visible:ring-red-500" : ""}
                            />
                            {errors.discount && <p className="text-sm text-red-500 mt-1">{errors.discount}</p>}
                            {Number(data.discount) > 100 && (
                                <p className="text-sm text-red-500 mt-1">El descuento no puede ser mayor a 100%</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="duration" className="flex items-center gap-2 text-sm font-medium">
                            Duracion del servicio (En minutos)
                        </Label>
                        <Select
                            value={data.duration}
                            onValueChange={(value) => setData("duration", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona la duracion" />
                            </SelectTrigger>
                            <SelectContent>
                                {durationIntervals.map((interval) => (
                                    <SelectItem key={interval.value} value={interval.value}>
                                        {interval.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.duration && <p className="text-sm text-red-500 mt-1">{errors.duration}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category_id" className="text-sm font-medium">
                            Categoría
                        </Label>
                        <Select
                            value={data.category_id.toString()}
                            onValueChange={(value) => setData("category_id", value)}
                        >
                            <SelectTrigger id="category_id">
                                <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>

                            <SelectContent className="overflow-y-scroll max-h-60">
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id.toString()}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.category_id && <p className="text-sm text-red-500 mt-1">{errors.category_id}</p>}
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Image Preview / PRICE SUMMARY*/}
                    {imagePreview && (
                        <div className="rounded-lg border bg-gray-50 p-3 flex items-center justify-center h-48 md:h-56 overflow-hidden">
                            <img
                                src={imagePreview || "/placeholder.svg"}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    )}

                    {!imagePreview && imgPath && (
                        <div className="rounded-lg border bg-gray-50 p-3 flex items-center justify-center h-48 md:h-56 overflow-hidden">
                            <img
                                src={imgPath || "/placeholder.svg"}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    )}

                    {!imagePreview && !imgPath && (
                        <div className="rounded-lg border-2 border-dashed bg-gray-50 p-3 flex items-center justify-center h-48 md:h-56">
                            <p className="text-sm text-gray-500 text-center">Vista previa de la imagen</p>
                        </div>
                    )}

                    {/* Price Summary */}
                    <div className="rounded-lg border bg-gradient-to-br from-purple-50 to-purple-100 p-4 space-y-2">
                        <p className="text-sm text-gray-700">
                            Precio: <strong>C$ {Number(data.price).toFixed(2)}</strong>
                        </p>

                        {Number(data.discount) > 0 && (
                            <>
                                <p className="text-sm text-gray-700">
                                    Descuento: <strong>{data.discount}%</strong>
                                </p>

                                <p className="text-sm text-green-600">
                                    Ahorro: <strong>C$ {pricePreview.discountAmount.toFixed(2)}</strong>
                                </p>
                            </>
                        )}

                        <div className="border-t pt-2">
                            <p className="text-lg font-bold text-purple-600">Total: C$ {pricePreview.total.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="col-span-2">


                    <div className="flex gap-3 pt-4">
                        <Button type="submit" disabled={processing} className="flex-1">
                            {processing ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                    {isEdit ? "Actualizando..." : "Creando..."}
                                </>
                            ) : (
                                <>{isEdit ? "Actualizar Servicio" : "Crear Servicio"}</>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}
