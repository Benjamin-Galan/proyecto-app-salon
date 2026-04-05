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
import { Package } from "@/types"

interface DeleteDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: (pack: Package) => void
    pack: Package
}

export default function DeleteDialog({ open, onOpenChange, onConfirm, pack }: DeleteDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Eliminar paquete</DialogTitle>
                    <DialogDescription>
                        {`¿Eliminar el paquete ${pack?.name}?`}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose>Cancelar</DialogClose>
                    <DialogClose asChild>
                        <Button onClick={() => onConfirm(pack)} variant="destructive">Eliminar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}