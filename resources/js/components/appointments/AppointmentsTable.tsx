import { useEffect, useMemo, useState } from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { CalendarDays, RotateCcw, Search } from "lucide-react"

import { Appointment } from "@/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface AppointmentsTableProps {
    columns: ColumnDef<Appointment>[]
    data: Appointment[]
}

const STATUS_LABELS: Record<string, string> = {
    Pendiente: "Pendiente",
    Confirmada: "Confirmada",
    Completada: "Completada",
    Cancelada: "Cancelada",
}

function normalizeDate(date: string) {
    return date.includes("T") ? date.split("T")[0] : date
}

export default function AppointmentsTable({
    columns,
    data,
}: AppointmentsTableProps) {
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("all")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const filteredAppointments = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase()

        return data.filter((appointment) => {
            const clientName = appointment.user?.name?.toLowerCase() ?? ""
            const code = appointment.code?.toLowerCase() ?? ""
            const appointmentDate = normalizeDate(appointment.date)

            const matchesSearch =
                normalizedSearch === "" ||
                clientName.includes(normalizedSearch) ||
                code.includes(normalizedSearch)

            const matchesStatus =
                status === "all" || appointment.status === status

            const matchesStartDate =
                startDate === "" || appointmentDate >= startDate

            const matchesEndDate =
                endDate === "" || appointmentDate <= endDate

            return (
                matchesSearch &&
                matchesStatus &&
                matchesStartDate &&
                matchesEndDate
            )
        })
    }, [data, endDate, search, startDate, status])

    const statusOptions = useMemo(() => {
        return Array.from(new Set(data.map((appointment) => appointment.status)))
    }, [data])

    const table = useReactTable({
        data: filteredAppointments,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    useEffect(() => {
        table.setPageIndex(0)
    }, [table, search, status, startDate, endDate])

    const clearFilters = () => {
        setSearch("")
        setStatus("all")
        setStartDate("")
        setEndDate("")
    }

    const hasActiveFilters =
        search !== "" || status !== "all" || startDate !== "" || endDate !== ""

    return (
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="flex flex-col gap-2 border-b px-4 py-4 sm:px-5">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-foreground">Listado de citas</p>
                        <p className="text-xs text-muted-foreground">
                            Encuentra citas por cliente, estado o rango de fechas.
                        </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {filteredAppointments.length} de {data.length}{" "}
                        {data.length === 1 ? "cita" : "citas"}
                    </div>
                </div>

                <div className="rounded-xl border bg-muted/30 p-3 sm:p-4">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1.35fr)_220px_180px_180px_auto]">
                        <div className="space-y-2">
                            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Cliente o codigo
                            </label>
                            <div className="relative">
                                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Buscar por nombre o codigo"
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

                        <div className="flex items-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={clearFilters}
                                disabled={!hasActiveFilters}
                                className="w-full xl:w-auto"
                            >
                                <RotateCcw />
                                Limpiar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table className="min-w-[720px]">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    className={cn(index % 2 === 0 ? "bg-background" : "bg-muted/20")}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="px-4 py-3 align-middle">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-28 px-4 text-center text-sm text-muted-foreground"
                                >
                                    No se encontraron citas con los filtros actuales.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                    Pagina {table.getState().pagination.pageIndex + 1} de {Math.max(table.getPageCount(), 1)}
                </p>

                <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
        </div>
    )
}
