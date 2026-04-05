import { CalendarDays, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { ChevronLeft } from "lucide-react"

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
                className={`fixed right-0 top-0 h-full w-60 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full p-4">
                    <div className="flex items-center justify-between py-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div onClick={onClose} className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <ChevronLeft className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Cerrar</p>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={clearFilters}
                            disabled={!hasActiveFilters}
                            className="w-1/2 xl:w-auto"
                        >
                            <RotateCcw />
                            Limpiar
                        </Button>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Desde
                            </label>
                            <div className="relative">
                                <CalendarDays className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(event) => setStartDate(event.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Hasta
                            </label>
                            <div className="relative">
                                <CalendarDays className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(event) => setEndDate(event.target.value)}
                                    min={startDate || undefined}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Estado
                            </label>

                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Todos los estados" />
                                </SelectTrigger>
                                <SelectContent>
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
            </div>
        </div>
    )
}