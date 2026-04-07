import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, Briefcase, UserCheck } from "lucide-react"

import { useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Employee } from "@/types"
import React, { useEffect } from "react"

interface Props {
    employee: Employee | null
    isCreating?: boolean
    onSuccess: (isCreating: boolean) => void;
}

export default function EmployeesManageForm({ employee, isCreating, onSuccess }: Props) {
    const { data, setData, post, put, processing, errors, clearErrors } = useForm<{
        name: string;
        email: string;
        phone: string;
        position: string;
        available?: boolean;
    }>({
        name: employee?.name || "",
        email: employee?.email || "",
        phone: employee?.phone || "",
        position: employee?.position || "",
        available: employee ? employee.available : true,
    })

    useEffect(() => {
        setData({
            name: employee?.name || "",
            email: employee?.email || "",
            phone: employee?.phone || "",
            position: employee?.position || "",
            available: employee ? employee.available : true,
        });
        clearErrors();
    }, [employee, isCreating, setData, clearErrors]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isCreating) {
            put(route("admin.employees.update", employee?.id), {
                onSuccess: () => {
                    onSuccess(false);
                }
            });
        } else {
            post(route("admin.employees.store"), {
                onSuccess: () => {
                    onSuccess(true);
                }
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 grid grid-cols-2 gap-2">
            {/**Name */}
            <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4" />
                    Nombre completo
                </Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="Ingresa el nombre completo"
                    className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.name && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                        {errors.name}
                    </p>
                )}
            </div>

            {/**Email */}
            <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4" />
                    Correo electrónico
                </Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                        {errors.email}
                    </p>
                )}
            </div>

            {/**Phone */}
            <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                    <Phone className="h-4 w-4" />
                    Teléfono
                </Label>
                <Input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.phone && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                        {errors.phone}
                    </p>
                )}
            </div>

            {/**Position */}
            <div className="space-y-2">
                <Label htmlFor="position" className="flex items-center gap-2 text-sm font-medium">
                    <Briefcase className="h-4 w-4" />
                    Puesto de trabajo
                </Label>
                <Input
                    id="position"
                    value={data.position}
                    onChange={(e) => setData("position", e.target.value)}
                    placeholder="Ej: Desarrollador, Diseñador, Gerente..."
                    className={errors.position ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.position && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                        {errors.position}
                    </p>
                )}
            </div>

            {/**Active */}
            <div className="col-span-2">
                {/* Estado de disponibilidad - Solo en modo edición */}
                {!isCreating && (
                    <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-sm font-medium">
                            <UserCheck className="h-4 w-4" />
                            Estado de disponibilidad
                        </Label>
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                            <div className="space-y-1">
                                <p className="text-sm font-medium">{data.available ? "Disponible" : "No disponible"}</p>
                                <p className="text-xs text-muted-foreground">
                                    {data.available
                                        ? "El personal está disponible para asignaciones"
                                        : "El personal no está disponible actualmente"}
                                </p>
                            </div>
                            <Switch
                                id="available"
                                checked={data.available}
                                onCheckedChange={(checked) => setData("available", checked)}
                            />
                        </div>
                    </div>
                )}

                {/* Botón de envío */}
                <div className="flex gap-3 pt-4">
                    <Button type="submit" disabled={processing} className="flex-1">
                        {processing ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                {isCreating ? "Creando..." : "Actualizando..."}
                            </>
                        ) : (
                            <>{isCreating ? "Crear Personal" : "Actualizar Personal"}</>
                        )}
                    </Button>
                </div>
            </div>
        </form>
    )
}
