import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function EmployeesTable<TData, TValue>({
    columns,
    data
}: DataTableProps<TData, TValue>) {
    // TanStack Table usa APIs no compatibles con memoizacion del React Compiler.
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div className="rounded-xl border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b px-4 py-3">
                <p className="text-sm font-medium text-foreground">Listado de empleados</p>
                <p className="text-xs text-muted-foreground">
                    {data.length} {data.length === 1 ? "registro" : "registros"}
                </p>
            </div>

            <Table className="min-w-[720px]">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="bg-muted/40 hover:bg-muted/40">
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className="px-4">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row, index) => {
                            return (
                                <TableRow
                                    key={row.id}
                                    className={cn(index % 2 === 0 ? "bg-background" : "bg-muted/20")}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell key={cell.id} className="px-4 py-3">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center text-muted-foreground"
                            >
                                No hay empleados registrados.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {table.getPageCount() > 1 && (
                <div className="flex items-center justify-between border-t px-4 py-3 bg-muted/10">
                    <div className="text-sm text-muted-foreground">
                        Página {table.getState().pagination.pageIndex + 1} de{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            className="bg-background dark:bg-slate-800 border-border"
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Anterior
                        </Button>
                        <Button
                            className="bg-background dark:bg-slate-800 border-border"
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Siguiente
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
