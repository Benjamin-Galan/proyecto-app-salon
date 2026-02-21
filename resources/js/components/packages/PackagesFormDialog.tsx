import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Package, Service } from "@/types"
import { PackagesForm } from "./PackagesForm"
import { useState } from "react"

interface PackagesFormDialogProps {
    open: boolean
    onClose: () => void
    services?: Service[]
    package?: Package | null
    openSelectService: boolean
    onOpenSelectService: () => void
    onCloseSelectService: () => void
    onSuccessCreate: () => void
    // onSuccessUpdate: () => void
}

export const PackagesFormDialog = ({
    open,
    onClose,
    services,
    package: currentPackage,
    openSelectService,
    onOpenSelectService,
    onCloseSelectService,
    onSuccessCreate,
}: PackagesFormDialogProps) => {

    const [hasSelectedServices, setHasSelectedServices] = useState(false)

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className={`
          max-h-[90vh] overflow-y-auto
          transition-all duration-300
          ${hasSelectedServices ? "md:max-w-4xl" : "md:max-w-xl"}
        `}>
                <DialogHeader>
                    <DialogTitle>{currentPackage ? "Editar paquete" : "Nuevo paquete"}</DialogTitle>
                </DialogHeader>

                <PackagesForm
                    package={currentPackage}
                    services={services}
                    openSelectService={openSelectService}
                    onOpenSelectService={onOpenSelectService}
                    onCloseSelectService={onCloseSelectService}
                    onServicesCountChange={(count) => setHasSelectedServices(count > 0)}
                    onClose={onClose}
                    onSuccessCreate={onSuccessCreate}
                />
            </DialogContent>
        </Dialog>
    )
}