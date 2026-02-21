import { Paintbrush, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props {
    search: string
    setSearch: (value: string) => void
}

export default function PackagesFilters({ search, setSearch }: Props) {
    return (
        <div className="
            bg-white mb-5 
            dark:bg-gray-800/50 
            p-6 rounded-xl 
            border
            border-gray-200 
            dark:border-gray-700 
            shadow-sm
            flex
            flex-col
            md:flex-row justify-between gap-4
            "
        >
            {/* Búsqueda */}
            <div className="space-y-2 w-full">
                <label className="text-sm font-medium">Buscar Paquete</label>
                <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        value={search}
                        onChange={(e) => { setSearch(e.target.value) }}
                        placeholder="Nombre del paquete..."
                        className="pl-10"
                    />
                </div>
            </div>
            <div className="flex items-end justify-end">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" onClick={() => setSearch('')} className="w-1/3 md:w-auto">
                            <Paintbrush className="w-4 h-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Limpiar filtros</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    )
}