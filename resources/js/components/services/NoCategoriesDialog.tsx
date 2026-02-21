// components/services/NoCategoriesDialog.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface Props {
    open: boolean
    onClose: () => void
    onCreateCategory: () => void
}

export default function NoCategoriesDialog({
    open,
    onClose,
    onCreateCategory,
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md text-center">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-center gap-2">
                        <AlertTriangle className="text-yellow-500" />
                        No hay categorías
                    </DialogTitle>
                </DialogHeader>

                <p className="text-sm text-muted-foreground mt-2">
                    Para poder crear servicios primero debes crear al menos una categoría.
                </p>

                <div className="flex justify-center gap-3 mt-6">
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={onCreateCategory}>
                        Crear categoría
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
