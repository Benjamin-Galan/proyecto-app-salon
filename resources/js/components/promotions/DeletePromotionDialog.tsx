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
import { Promotion } from "@/types"

interface DeletePromotionDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: (promotion: Promotion) => void
    promotion: Promotion
}

export default function DeletePromotionDialog({ open, onOpenChange, onConfirm, promotion }: DeletePromotionDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Eliminar promocion</DialogTitle>
                    <DialogDescription>
                        {`¿Eliminar la promocion ${promotion?.name}?`}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose>Cancelar</DialogClose>
                    <DialogClose asChild>
                        <Button onClick={() => onConfirm(promotion)} variant="destructive">Eliminar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}