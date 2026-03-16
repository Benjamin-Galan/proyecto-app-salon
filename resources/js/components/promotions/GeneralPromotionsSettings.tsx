import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PromotionFormData, Service } from "@/types";
import type { InertiaFormProps } from "@inertiajs/react";

interface GeneralPromotionsSettingsProps {
    data: InertiaFormProps<PromotionFormData>["data"];
    setData: InertiaFormProps<PromotionFormData>["setData"];
    errors: InertiaFormProps<PromotionFormData>["errors"];
    selectedServices: Service[];
}

export default function GeneralPromotionsSettings({
    data,
    setData,
    errors,
    selectedServices,
}: GeneralPromotionsSettingsProps) {
    return (
        <div className="space-y-4 rounded-lg border bg-gray-50 p-4">
            <div className="space-y-2">
                <Label htmlFor="general-discount">Descuento general (%)</Label>
                <Input
                    id="general-discount"
                    type="number"
                    min={0}
                    max={100}
                    value={data.discount}
                    onChange={(e) => setData("discount", e.target.value)}
                    placeholder="0"
                />
                {errors.discount && <p className="text-sm text-red-500">{errors.discount}</p>}
            </div>

            <div className="space-y-1 text-sm text-gray-700">
                <p>Servicios seleccionados: <strong>{selectedServices.length}</strong></p>
                <p>Subtotal: <strong>C$ {Number(data.subtotal || 0).toFixed(2)}</strong></p>
                <p>Total: <strong>C$ {Number(data.total || 0).toFixed(2)}</strong></p>
            </div>
        </div>
    )
}
