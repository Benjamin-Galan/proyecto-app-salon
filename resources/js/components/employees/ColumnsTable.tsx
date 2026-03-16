import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Employee } from "@/types"

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface EmployeeTableActions {
    onEdit: (employee: Employee) => void
}

export const getEmployeesColumns = ({ onEdit }: EmployeeTableActions): ColumnDef<Employee>[] => [
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "email",
        header: "Correo electronico",
    },
    {
        accessorKey: "phone",
        header: "Telefono",
        cell: ({ row }) => row.original.phone || "Sin telefono",
    },
    {
        accessorKey: "position",
        header: "Puesto",
        cell: ({ row }) => row.original.position || "Sin puesto",
    },
    {
        accessorKey: "available",
        header: "Disponibilidad",
        cell: ({ row }) =>
            row.original.available ? (
                <Badge className="rounded-full" variant="secondary">
                    Disponible
                </Badge>
            ) : (
                <Badge className="rounded-full" variant="outline">
                    No disponible
                </Badge>
            ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const employee = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onEdit(employee)}>Editar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {}}>Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
