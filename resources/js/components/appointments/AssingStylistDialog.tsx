import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Appointment, Employee } from "@/types"
import { useEffect, useMemo, useState } from "react"

interface AssignStylistDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: (appointment: Appointment, stylist: Employee) => void
    appointment: Appointment
    stylists: Employee[]
}

export default function AssignStylistDialog({
    open,
    onOpenChange,
    onConfirm,
    appointment,
    stylists
}: AssignStylistDialogProps) {
    const [selectedStylist, setSelectedStylist] = useState<string>("")

    const currentStylist = appointment?.employee ?? null
    const selectedStylistData = useMemo(
        () => stylists.find((s) => s.id.toString() === selectedStylist) ?? null,
        [stylists, selectedStylist]
    )

    useEffect(() => {
        if (!open) {
            setSelectedStylist("")
            return
        }

        setSelectedStylist(appointment?.employee?.id ? appointment.employee.id.toString() : "")
    }, [open, appointment])

    const handleConfirm = () => {
        const stylist = stylists.find((s) => s.id.toString() === selectedStylist)
        if (stylist) {
            onConfirm(appointment, stylist)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Asignar estilista</DialogTitle>
                    <DialogDescription>
                        Selecciona un estilista para la cita
                    </DialogDescription>
                </DialogHeader>
                <Select value={selectedStylist} onValueChange={setSelectedStylist}>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estilista" />
                    </SelectTrigger>
                    <SelectContent>
                        {stylists.map((stylist) => (
                            <SelectItem key={stylist.id} value={stylist.id.toString()}>
                                {stylist.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {currentStylist && (
                    <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                        Esta cita ya tiene asignado a <span className="font-medium">{currentStylist.name}</span>.
                        {selectedStylistData && selectedStylistData.id !== currentStylist.id
                            ? ` Si confirmas, se cambiará por ${selectedStylistData.name}.`
                            : " Puedes mantenerlo o seleccionar otro empleado."}
                    </div>
                )}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button variant="default" onClick={() => handleConfirm()} disabled={!selectedStylist}>
                        {currentStylist && selectedStylistData && selectedStylistData.id !== currentStylist.id
                            ? "Cambiar estilista"
                            : "Confirmar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
