import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Promotion, PromotionType, Service } from "@/types";
import PromotionsMainForm from "./PromotionsMainForm";

interface PromotionDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    selectedOption: PromotionType | null
    services: Service[];
    promotion?: Promotion | null
    openSelectService: boolean
    onOpenSelectService: () => void
    onCloseSelectService: () => void
}

export default function PromotionDialog({
    open,
    onOpenChange,
    selectedOption,
    services,
    promotion,
    openSelectService,
    onOpenSelectService,
    onCloseSelectService
}: PromotionDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="
            max-h-[90vh] overflow-y-auto
            transition-all duration-300 md:max-w-6xl">
                <DialogHeader>
                    <DialogTitle>{selectedOption?.name === "Individual" ? "Crear promoción individual" : "Crear promoción general"}</DialogTitle>
                </DialogHeader>

                <PromotionsMainForm
                    services={services}
                    promotion={promotion}
                    onOpenSelectService={onOpenSelectService}
                    selectedOption={selectedOption}
                    openSelectService={openSelectService}
                    onCloseSelectService={onCloseSelectService}
                />
            </DialogContent>
        </Dialog>
    )
}