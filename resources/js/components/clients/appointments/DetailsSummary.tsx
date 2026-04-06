import { Appointment } from "@/types";

interface Props {
    appointment: Appointment | null;
}

export default function DetailsSummary({ appointment }: Props) {
    const subtotal = Number(appointment?.subtotal) ?? 0;
    const discount = Number(appointment?.discount) ?? 0;
    const total = Number(appointment?.total) ?? 0;

    const formatCurrency = (value: number) =>
        `C$${value?.toFixed(2)}`;

    return (
        <div className="space-y-3 rounded-2xl border border-border/70 bg-muted/60 p-5 dark:border-border dark:bg-muted/30">
            {/* Subtotal */}
            <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
            </div>

            {/* Discount */}
            <div className="flex justify-between text-sm text-red-500">
                <span>Discount</span>
                <span>-{formatCurrency(discount)}</span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-2">
                <span className="font-semibold text-foreground/90">
                    Total
                </span>
                <span className="text-xl font-bold text-foreground">
                    {formatCurrency(total)}
                </span>
            </div>
        </div>
    );
}
