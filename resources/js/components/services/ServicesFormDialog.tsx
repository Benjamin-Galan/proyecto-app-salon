import React from "react"
import { ServicesForm } from "./ServicesForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Service, Category } from "@/types"

interface ServicesFormDialogProps {
    open: boolean
    onClose: () => void
    service: Service | null
    categories: Category[]
    onCreated?: () => void
    onUpdated?: () => void
}

export const ServicesFormDialog = ({
    open,
    onClose,
    service,
    categories,
    onCreated,
    onUpdated,
    onCategories
}: ServicesFormDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="md:max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{service ? "Editar servicio" : "Nuevo Servicio"}</DialogTitle>
                </DialogHeader>

                <ServicesForm
                    service={service}
                    categories={categories}
                    onCreated={onCreated}
                    onUpdated={onUpdated}
                />
            </DialogContent>
        </Dialog>
    );
};
