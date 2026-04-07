
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SelectTrigger, SelectValue, Select, SelectContent, SelectItem } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type {
    BookingDraft,
    BookingTotals,
} from "@/hooks/useCart";
import type { Appointment, ClientScreen, Employee } from "@/types";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { timeSlots } from "@/utils/timeSelectionData";
import { useEffect, useMemo } from "react";
import { formatDate, formatTime } from "@/utils/formatDateTime";

interface Props {
    handleScheduleScreenChange: (screen: ClientScreen) => void;
    draft: BookingDraft;
    totals: BookingTotals;
    canContinueToConfirmation: boolean;
    setQuantity: (key: string, quantity: number) => void;
    removeItem: (key: string) => void;
    setDate: (date: string | null) => void;
    setTime: (time: string | null) => void;
    setNotes: (notes: string) => void;
    clearItems: () => void;
    submitAppointment: () => void;
    isProcessing: boolean;
    uncompleted: Appointment[];
    employees: Employee[];
}

const typeLabel: Record<string, string> = {
    service: "Servicio",
    promotion: "Promo",
    package: "Paquete",
};

export default function ShoppingCartScreen({
    handleScheduleScreenChange,
    draft,
    totals,
    canContinueToConfirmation,
    setQuantity,
    removeItem,
    setDate,
    setTime,
    setNotes,
    clearItems,
    submitAppointment,
    isProcessing,
    uncompleted,
    employees
}: Props) {
    const handleContinue = () => {
        submitAppointment();
    };

    const appointmentsByDate = useMemo(() => {
        if (!draft.date) return [];

        return uncompleted.filter((appointment) => {
            const appointmentDate = appointment.date.split("T")[0];
            return appointmentDate === draft.date;
        });
    }, [draft.date, uncompleted]);

    const takenTime = new Set(
        appointmentsByDate.map((appointment) => formatTime(appointment.time))
    )

    const availableEmployees = employees.some((e) => e.available)
    const today = new Date();
    const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="font-bold sm:text-2xl">Carrito de compras</h1>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleScheduleScreenChange("products")}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver
                </Button>
            </div>

            {draft.items.length === 0 ? (
                <Card className="p-6 text-center space-y-3">
                    <ShoppingCart className="w-10 h-10 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                        Tu carrito esta vacio. Agrega servicios, promociones o
                        paquetes para continuar.
                    </p>
                    <Button
                        variant="secondary"
                        onClick={() => handleScheduleScreenChange("products")}
                    >
                        Seleccionar productos
                    </Button>
                </Card>
            ) : (
                <>
                    <div className="space-y-3">
                        {draft.items.map((item) => (
                            <Card key={item.key} className="p-4 space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="font-semibold text-sm">
                                                {item.name}
                                            </h2>
                                            <Badge variant="secondary">
                                                {typeLabel[item.type]}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            C$ {item.unitPrice.toFixed(2)} x {item.quantity}
                                        </p>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeItem(item.key)}
                                        aria-label={`Eliminar ${item.name}`}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                setQuantity(
                                                    item.key,
                                                    item.quantity - 1,
                                                )
                                            }
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <span className="w-6 text-center text-sm font-medium">
                                            {item.quantity}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                setQuantity(
                                                    item.key,
                                                    item.quantity + 1,
                                                )
                                            }
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <p className="text-sm font-semibold">
                                        C$ {(item.unitPrice * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <Card className="p-4 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span>Items</span>
                            <span>{totals.itemsCount}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>C$ {totals.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-red-600">
                            <span>Descuento</span>
                            <span>- C$ {totals.discount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Duracion estimada</span>
                            <span>{totals.durationMin} min</span>
                        </div>
                        <div className="border-t pt-3 flex justify-between font-semibold">
                            <span>Total</span>
                            <span>C$ {totals.total.toFixed(2)}</span>
                        </div>
                    </Card>

                    <Card className="p-4 space-y-3">
                        <h2 className="font-semibold text-sm p-0 m-0">Fecha y hora</h2>

                        {/**Como un tip para decir que las horas deshabilitadas estan elegidas */}
                        <div className="flex items-center gap-2 p-0 m-0">
                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                            <p className="text-xs text-muted-foreground">Las horas deshabilitadas pertenecen a una cita.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <label className="text-sm space-y-1">
                                <span className="text-muted-foreground">Fecha</span>
                                <input
                                    type="date"
                                    min={minDate}
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                    value={draft.date ?? ""}
                                    onChange={(event) =>
                                        setDate(event.target.value || null)
                                    }
                                />
                            </label>

                            <div>
                                <Label
                                    htmlFor="duration"
                                    className="flex items-center gap-2 text-sm font-light"
                                >
                                    Hora
                                </Label>
                                <Select
                                    value={draft.time ?? ""}
                                    onValueChange={(value) => setTime(value || null)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona una hora" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timeSlots.map((slot) => (
                                            <SelectItem
                                                key={slot.value}
                                                value={slot.value}
                                                disabled={takenTime.has(slot.value) && !availableEmployees}
                                            >
                                                {slot.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4 space-y-3">
                        <div className="space-y-1">
                            <h2 className="font-semibold text-sm p-0 m-0">Notas para la cita</h2>
                            <p className="text-xs text-muted-foreground">
                                Agrega instrucciones, preferencias o detalles importantes para el personal.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="appointment-notes" className="text-sm font-light">
                                Notas adicionales
                            </Label>
                            <Textarea
                                id="appointment-notes"
                                value={draft.notes}
                                onChange={(event) => setNotes(event.target.value)}
                                placeholder="Ej: prefiero a partir de las 3 pm, tengo el cabello sensible, deseo un acabado natural..."
                                maxLength={1000}
                                className="min-h-28 resize-none"
                            />
                            <p className="text-xs text-muted-foreground text-right">
                                {draft.notes.length}/1000
                            </p>
                        </div>
                    </Card>

                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            variant="outline"
                            onClick={clearItems}
                            disabled={draft.items.length === 0}
                        >
                            Limpiar carrito
                        </Button>
                        <Button
                            onClick={handleContinue}
                            disabled={!canContinueToConfirmation || isProcessing}
                        >
                            {isProcessing ? "Procesando..." : "Confirmar datos"}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
