import { Appointment } from "@/types";

interface Props {
    appointment: Appointment;
}

interface ColorStyles {
    service: string;
    promotion: string;
    package: string;
}

interface ItemCardProps {
    label: string;
    items: any[];
    color: keyof ColorStyles;
}

export default function DetailsIncludeList({ appointment }: Props) {
    const services = appointment.items.filter((item) => item.item_type === "service");
    const promotions = appointment.items.filter((item) => item.item_type === "promotion");
    const packages = appointment.items.filter((item) => item.item_type === "package");

    const ItemCard = ({ label, items, color }: ItemCardProps) => {
        if (items?.length === 0) return null;

        const colorStyles = {
            service: "from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400",
            promotion: "from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400",
            package: "from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400"
        };

        return (
            <div className="space-y-2">
                <div className="flex items-center gap-2">

                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                        {label}
                    </h3>
                </div>

                <div className="space-y-2">
                    {items.map((item: any, idx: number) => (
                        <div
                            key={idx}
                            className={`bg-gradient-to-br ${colorStyles[color]} border rounded-lg p-3 transition-all hover:shadow-sm`}
                        >
                            <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <p className="flex-1 break-words text-sm font-medium text-slate-900 dark:text-slate-50">
                                    {item?.item?.name}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 sm:ml-2 sm:justify-end">
                                    {item?.quantity > 0 && (
                                        <span className="text-xs font-semibold px-2 py-0.5 bg-white/50 dark:bg-black/30 rounded text-slate-600 dark:text-slate-300">
                                            x{item?.quantity}
                                        </span>
                                    )}
                                    <p className="text-sm font-bold text-slate-900 dark:text-slate-50 whitespace-nowrap">
                                        C${item?.unit_price * item?.quantity}
                                    </p>
                                </div>
                            </div>

                            {item?.item?.services && item.item.services.length > 0 && (
                                <div className="pt-2 border-t border-current/20">
                                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-1.5">
                                        Incluye:
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.item.services.map((service: any) => (
                                            <span
                                                key={service.id}
                                                className="text-xs px-2.5 py-1 bg-white/40 dark:bg-black/20 rounded-full text-slate-700 dark:text-slate-300"
                                            >
                                                {service.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-5 lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto lg:pr-1">
            <ItemCard label="Servicios" items={services} color="service" />
            <ItemCard label="Promociones" items={promotions} color="promotion" />
            <ItemCard label="Paquetes" items={packages} color="package" />
        </div>
    );
}
