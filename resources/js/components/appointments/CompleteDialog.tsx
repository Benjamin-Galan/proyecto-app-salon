import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Appointment } from "@/types"
import { formatDate } from "@/utils/formatDateTime"
import { CheckCircle2, X } from "lucide-react"

interface CompleteDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onComplete: (appointment: Appointment) => void
    appointment: Appointment | null
}

export default function CompleteDialog({ open, onOpenChange, onComplete, appointment }: CompleteDialogProps) {
    if (!appointment) {
        return null
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm p-0 border-0 overflow-hidden">
                <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-900 p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                            <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>

                        <DialogHeader className="space-y-2">
                            <DialogTitle className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                                Completar cita
                            </DialogTitle>
                            <DialogDescription className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {`¿Marcar como completada la cita con `}
                                <span className="font-semibold text-slate-700 dark:text-slate-300">
                                    {appointment?.user?.name}
                                </span>
                                {` el `}
                                <span className="font-semibold text-slate-700 dark:text-slate-300">
                                    {formatDate(appointment?.date)}
                                </span>
                                {`?`}
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                </div>

                <DialogFooter className="flex gap-2 px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
                    <DialogClose asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                        >
                            <X className="w-4 h-4 mr-1.5" />
                            Cancelar
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            onClick={() => onComplete(appointment)}
                            size="sm"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                        >
                            <CheckCircle2 className="w-4 h-4 mr-1.5" />
                            Completar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
