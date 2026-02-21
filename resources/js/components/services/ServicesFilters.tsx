import { Paintbrush, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import { router } from "@inertiajs/react"
import { Select } from "@/components/ui/select"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FiltersProps {
    categories: { id: number; name: string }[]
}

export default function ServicesFilters({ categories }: FiltersProps) {
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("all")
    const [priceOrder, setPriceOrder] = useState<"asc" | "desc" | "">("")


    useEffect(() => {
        const applyFilters = () => {
            router.get("/admin/services", {
                search: search || undefined,
                category_id: category !== "all" ? category : undefined,
                price_sort: priceOrder !== "" ? priceOrder : undefined,
            }, { preserveState: true, replace: true });
        }

        const timeout = setTimeout(() => {
            applyFilters()
        }, 400)
        return () => clearTimeout(timeout)
    }, [search, category, priceOrder]) // agregar priceOrder

    const clearFilters = () => {
        setSearch("")
        setCategory("all") // reset categoría
        setPriceOrder("")
        router.get("/admin/services", {}, { preserveState: true, replace: true })
    }

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
            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {/* Búsqueda */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Buscar Cliente</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Nombre del cliente..."
                            className="pl-10"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Categorías</label>
                    <Select value={category} onValueChange={(v) => setCategory(v)}>
                        <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                            <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">Todas</SelectItem>
                            {categories.map((cat) => (
                                <SelectItem key={cat.id} value={String(cat.id)}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Ordenar por precio</label>
                    <Select value={priceOrder} onValueChange={(v) => setPriceOrder(v as "asc" | "desc" | "")}>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar orden" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">Ninguno</SelectItem> {/* NO usar value="" */}
                            <SelectItem value="asc">Precio más bajo</SelectItem>
                            <SelectItem value="desc">Precio más alto</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex items-end justify-end">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" onClick={clearFilters} className="w-1/3 md:w-auto">
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
