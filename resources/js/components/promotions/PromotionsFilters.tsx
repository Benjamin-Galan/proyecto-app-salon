import { Paintbrush, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "../ui/card"

interface Props {
    search: string
    setSearch: (value: string) => void
    type: string
    setType: (value: string) => void
}

export default function PromotionsFilters({ search, setSearch, type, setType }: Props) {
    const cleanFilters = () => {
        setSearch('')
        setType('all')
    }

    return (
        <Card className="flex flex-col sm:flex-row items-center gap-2 p-4 mb-4">
            {/* Búsqueda */}
            <div className="w-full">
                <label className="text-sm font-medium">Buscar Promocion</label>
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

            <div className="w-full">
                <label className="text-sm font-medium">Tipo de promocion</label>
                <div className="relative mt-2">
                    <Select value={type} onValueChange={setType}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tipo de promocion" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="General">General</SelectItem>
                            <SelectItem value="Individual">Individual</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex items-end justify-end pt-8 w-full md:w-auto">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" onClick={cleanFilters} className="w-full md:w-auto">
                            <Paintbrush className="w-4 h-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Limpiar filtros</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </Card>
    )
}