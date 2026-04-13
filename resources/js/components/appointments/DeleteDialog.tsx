import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Appointment } from "@/types"
import { formatDateLong, formatTime } from "@/utils/formatDateTime"

interface DeleteDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: (appointment: Appointment) => void
    appointment: Appointment
}

export default function DeleteDialog({ open, onOpenChange, onConfirm, appointment }: DeleteDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Eliminar cita</DialogTitle>
                    <DialogDescription>
                        {`¿Eliminar la cita con el cliente 
                        ${appointment?.user?.name} 
                        el ${formatDateLong(appointment?.date)} a las ${formatTime(appointment?.date)}?`}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose>Cancelar</DialogClose>
                    <DialogClose asChild>
                        <Button onClick={() => onConfirm(appointment)} variant="destructive">Eliminar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}