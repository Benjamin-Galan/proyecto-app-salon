import { CalendarDays, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"


interface Props {
    open: boolean
    onClose: () => void
    startDate: string
    endDate: string
    status: string
    statusOptions: string[]
    clearFilters: () => void
    hasActiveFilters: boolean
    setStartDate: (date: string) => void
    setEndDate: (date: string) => void
    setStatus: (status: string) => void
}

const STATUS_LABELS: Record<string, string> = {
    Completada: "Completada",
    Cancelada: "Cancelada",
}

export default function HistoryFilters({
    open,
    onClose,
    startDate,
    endDate,
    status,
    statusOptions,
    clearFilters,
    hasActiveFilters,
    setStartDate,
    setEndDate,
    setStatus,
}: Props) {
    return (
        <div>
            {/**Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            <div
                className={`fixed right-0 top-0 h-full w-[22rem] max-w-full bg-white dark:bg-[#15171a] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">Filtrar búsqueda</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <X className="w-4 h-4" />
                        <span className="sr-only">Cerrar</span>
                    </Button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
                    {/* Fechas */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wide text-gray-900 dark:text-gray-100">PERIODO</h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Fecha inicial
                                </label>
                                <div className="relative">
                                    <CalendarDays className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="date"
                                        value={startDate}
                                        onChange={(event) => setStartDate(event.target.value)}
                                        className="pl-9 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-purple-500 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Fecha final
                                </label>
                                <div className="relative">
                                    <CalendarDays className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="date"
                                        value={endDate}
                                        onChange={(event) => setEndDate(event.target.value)}
                                        min={startDate || undefined}
                                        className="pl-9 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-purple-500 rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Estado */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Estado de la cita
                            </label>

                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-purple-500 rounded-xl">
                                    <SelectValue placeholder="Todos los estados" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="all">Todos los estados</SelectItem>
                                    {statusOptions.map((statusOption) => (
                                        <SelectItem key={statusOption} value={statusOption}>
                                            {STATUS_LABELS[statusOption] ?? statusOption}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={clearFilters}
                        disabled={!hasActiveFilters}
                        className="w-full rounded-xl border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-700 transition-colors"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Limpiar todos los filtros
                    </Button>
                </div>
            </div>
        </div>
    )
}