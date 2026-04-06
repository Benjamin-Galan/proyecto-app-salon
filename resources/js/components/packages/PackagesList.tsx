import { Package, Service } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "../ui/separator"
import PackagesOptions from "./PackagesOptions"
import { useState } from "react"
import { formatDuration } from "@/utils/formatDuration"

interface PackagesListProps {
    packages: Package[]
    onEdit: (pack: Package) => void;
    onDelete: (pack: Package) => void;
}

const totalDuration = (services: Service[]) => {
    return services.reduce((total, service) => Number(total) + Number(service.duration), 0)
}

const formatNumber = (number: number) => {
    return Number(number).toFixed(0)
}

export default function PackagesList({ packages, onEdit, onDelete }: PackagesListProps) {
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    console.log(packages, 'pacquetes')

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {packages.map((pack) => {
                const isExpanded = expandedCard === pack.id
                const visibleServices = isExpanded ? pack.services : pack.services.slice(0, 3);
                return (
                    <Card
                        key={pack.id}
                        className={
                            `
                        group 
                        relative 
                        overflow-hidden 
                        border 
                        border-pink-100 
                        dark:border-gray-700 
                        bg-white 
                        dark:bg-gray-900
                        transition-all 
                        duration-300 
                        hover:-translate-y-0.5
                        hover:shadow-lg 
                        hover:shadow-pink-100
                        `
                        }
                    >
                        {/* Header */}
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex flex-col flex-1 min-w-0 gap-2">
                                    <CardTitle className="text-base font-semibold leading-tight line-clamp-2">
                                        {pack.name}
                                    </CardTitle>

                                    {pack.description && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                            {pack.description}
                                        </p>
                                    )}
                                </div>

                                <PackagesOptions onEdit={onEdit} onDelete={onDelete} pack={pack} />
                            </div>
                        </CardHeader>

                        <CardContent className="px-4 space-y-3">
                            <Separator className="bg-gray-100 dark:bg-gray-700/40" />

                            <div className="flex items-center justify-between">
                                {pack.discount > 0 ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-400 line-through">
                                            {formatNumber(pack.subtotal)} C$
                                        </span>
                                        <span className="text-base font-bold text-green-600 dark:text-green-400">
                                            {formatNumber(pack.total)} C$
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-base font-bold text-green-600 dark:text-green-400">
                                        {formatNumber(pack.total)} C$
                                    </span>
                                )}

                                {pack.discount > 0 && (
                                    <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                                        {formatNumber(pack.discount)}%
                                    </span>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Duración:
                                </span>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    {formatDuration(totalDuration(pack.services))}
                                </span>
                            </div>

                            {/* Servicios */}
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Incluye:
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {visibleServices?.map((service) => (
                                        <span
                                            key={service.id}
                                            className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px]
                                         dark:bg-gray-800 dark:text-gray-300"
                                        >
                                            {service.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {pack.services.length > 3 && (
                                <button
                                    onClick={() =>
                                        setExpandedCard(isExpanded ? null : pack.id)
                                    }
                                    className="text-xs font-medium text-pink-600 hover:underline mt-2"
                                >
                                    {isExpanded ? "Ver menos" : `Ver más (${pack.services.length - 3})`}
                                </button>
                            )}

                        </CardContent>

                        {/* Accent hover */}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-pink-400 to-pink-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Card>
                )
            })}
        </div>
    )
}
