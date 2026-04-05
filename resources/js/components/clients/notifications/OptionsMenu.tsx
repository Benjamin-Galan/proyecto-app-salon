import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, MoreVertical, X } from "lucide-react"
import { AppNotification } from "@/types"

interface Props {
    notification: AppNotification
    notificationId: string
    onMarkAsRead: (notification: AppNotification) => void
    onDeleteNotification: (notification: AppNotification) => void
}

export default function OptionsMenu({
    notification,
    notificationId,
    onMarkAsRead,
    onDeleteNotification
}: Props) {
    console.log(notification, 'notification options menu');

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
                <DropdownMenuItem onClick={() => onMarkAsRead(notification)}>
                    <Eye className="w-4 h-4 mr-2" />
                    Marcar como leída
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onDeleteNotification(notification)}>
                    <X className="w-4 h-4 mr-2" />
                    Eliminar notificación
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
