import { Appointment } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, MoreVertical, X } from "lucide-react"

interface Props {
    appointment: Appointment
    appointmentId: number
    goToDetails: (id: number, role: string) => void
    onDeleteAppointment: (appointment: Appointment) => void
}

export default function OptionsMenu({
    appointment,
    appointmentId,
    goToDetails,
    onDeleteAppointment
}: Props) {
    const handleGoToDetails = () => {
        goToDetails(appointmentId, 'client')
    }

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

            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleGoToDetails}>
                    <Eye className="w-4 h-4 mr-2" />
                    Ver detalles
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onDeleteAppointment(appointment)}>
                    <X className="w-4 h-4 mr-2" />
                    Eliminar cita
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}