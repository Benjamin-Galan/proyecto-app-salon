import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Appointment } from "@/types"
import { formatDateTime, formatTime } from "@/utils/formatDateTime"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, MoreHorizontal, MoreVertical } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const STATUS_LABELS: Record<string, string> = {
    pending: "Pendiente",
    confirmed: "Confirmada",
    completed: "Completada",
    cancelled: "Cancelada",
}

interface AppointmentTableActions {
    onView: (id: number) => void
    onConfirm: (appointment: Appointment) => void
    onCancel: (appointment: Appointment) => void
    onComplete: (appointment: Appointment) => void
}

export const appointmentsTableColums = ({
    onView,
    onConfirm,
    onCancel,
    onComplete
}: AppointmentTableActions): ColumnDef<Appointment>[] => [
        {
            id: "client",
            header: "Cliente",
            accessorFn: (row) => row.user?.name,
            cell: ({ row }) => row.original.user?.name ?? "-"
        },
        {
            accessorKey: "date",
            header: "Fecha",
            cell: ({ row }) => formatDateTime(row.original.date, { includeTime: false })
        },
        {
            accessorKey: "time",
            header: "Hora",
            cell: ({ row }) => formatTime(row.original.time)
        },
        {
            accessorKey: "status",
            header: "Estado",
            cell: ({ row }) => {
                const status = row.original.status

                const variant =
                    status === "Confirmada"
                        ? "info"
                        : status === "Pendiente"
                            ? "warning"
                            : status === "Completada"
                                ? "success"
                                : "destructive"

                return <Badge variant={variant}>{STATUS_LABELS[status] ?? status}</Badge>
            }
        },
        {
            id: "employee",
            header: "Atendido por",
            accessorFn: (row) => row.employee?.name,
            cell: ({ row }) => row.original.employee?.name ?? "-"
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const appointment = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                aria-label="Opciones"
                            >
                                <MoreVertical className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onView(appointment.id)}>Mas detalles</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onComplete(appointment)}>Completar</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onConfirm(appointment)}>Confirmar</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onCancel(appointment)}>Cancelar</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        }
    ]


// import { ColumnDef } from "@tanstack/react-table"
// import { Badge } from "@/components/ui/badge"
// import { Appointment } from "@/types"
// import { formatDateTime, formatTime } from "@/utils/formatDateTime"
// import { Button } from "@/components/ui/button"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Check, Eye, MoreHorizontal, MoreVertical, X } from "lucide-react"

// const STATUS_LABELS: Record<string, string> = {
//     pending: "Pendiente",
//     confirmed: "Confirmada",
//     completed: "Completada",
//     cancelled: "Cancelada",
// }

// // interface AppointmentTableActions {
// //     onView: (appointment: Appointment) => void
// //     onEdit: (appointment: Appointment) => void
// //     onConfirm: (appointment: Appointment) => void
// //     onCancel: (appointment: Appointment) => void
// // }

// export const appointmentsTableColums = (): ColumnDef<Appointment>[] => [
//     {
//         id: "client",
//         header: "Cliente",
//         accessorFn: (row) => row.user?.name,
//         cell: ({ row }) => row.original.user?.name ?? "-"
//     },
//     {
//         accessorKey: "date",
//         header: "Fecha",
//         cell: ({ row }) => formatDateTime(row.original.date, { includeTime: false })
//     },
//     {
//         accessorKey: "time",
//         header: "Hora",
//         cell: ({ row }) => formatTime(row.original.time)
//     },
//     {
//         accessorKey: "status",
//         header: "Estado",
//         cell: ({ row }) => {
//             const status = row.original.status

//             const variant =
//                 status === "confirmed"
//                     ? "secondary"
//                     : status === "pending"
//                         ? "outline"
//                         : status === "completed"
//                             ? "default"
//                             : "destructive"

//             return <Badge variant={variant}>{STATUS_LABELS[status] ?? status}</Badge>
//         }
//     },
//     {
//         id: "employee",
//         header: "Atendido por",
//         accessorFn: (row) => row.employee?.name,
//         cell: ({ row }) => row.original.employee?.name ?? "-"
//     },
//     {
//         id: 'actions',
//         cell: ({ row }) => {
//             const appointment = row.original

//             return (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <button
//                             className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
//                             aria-label="Opciones"
//                         >
//                             <MoreVertical className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
//                         </button>
//                     </DropdownMenuTrigger>

//                     <DropdownMenuContent
//                         className="flex flex-col w-44 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg overflow-hidden"
//                         sideOffset={4}
//                     >
//                         {/* Detalles */}
//                         <DropdownMenuItem asChild className="w-full">
//                             <button
//                                 className="flex items-center w-full px-3 py-2 text-blue-700 dark:text-blue-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
//                                 onClick={() => {

//                                     setTimeout(() => console.log(appointment), 100);
//                                 }}
//                             >
//                                 <Eye className="mr-2 h-4 w-4" />
//                                 Revisar
//                             </button>
//                         </DropdownMenuItem>

//                         {/* Confirmar */}
//                         <DropdownMenuItem asChild className="w-full">
//                             <button
//                                 className="flex items-center w-full px-3 py-2 text-lime-500 dark:text-lime-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
//                                 onClick={() => {

//                                     console.log(appointment)
//                                 }}
//                             >
//                                 <Check className="mr-2 h-4 w-4" />
//                                 Confirmar
//                             </button>
//                         </DropdownMenuItem>

//                         {/* Cancelar */}
//                         <DropdownMenuItem asChild className="w-full">
//                             <button
//                                 className="flex items-center w-full px-3 py-2 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
//                                 onClick={() => {

//                                     console.log(appointment)
//                                 }}
//                             >
//                                 <X className="mr-2 h-4 w-4" />
//                                 Cancelar
//                             </button>
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             )
//         }
//     }
// ]


// // <DropdownMenuContent align="end">
// //                         <DropdownMenuLabel>Acciones</DropdownMenuLabel>
// //                         <DropdownMenuItem onClick={() => onView(appointment)}>Mas detalles</DropdownMenuItem>
// //                         <DropdownMenuItem onClick={() => onEdit(appointment)}>Editar</DropdownMenuItem>
// //                         <DropdownMenuItem onClick={() => onConfirm(appointment)}>Confirmar</DropdownMenuItem>
// //                         <DropdownMenuItem onClick={() => onCancel(appointment)}>Cancelar</DropdownMenuItem>
// //                     </DropdownMenuContent>