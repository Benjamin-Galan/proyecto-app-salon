import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldTitle
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";

import type { PromotionType } from "@/types";

interface PromotionTypeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    promotionTypes: PromotionType[]
    selectedOption: PromotionType | null
    setSelectedOption: (selectedOption: PromotionType | null) => void
    onSave: () => void
}

const PromotionTypeDialog = ({
    open,
    onOpenChange,
    promotionTypes,
    selectedOption,
    setSelectedOption,
    onSave
}: PromotionTypeDialogProps) => {
    const handleSave = () => {
        onSave()
    }

    const handleCheckedChange = (checked: string | boolean, promotionType: PromotionType) => {
        if (checked === true) {
            setSelectedOption(promotionType)
        } else {
            setSelectedOption(null)
        }
    }

    console.log(selectedOption, "Opcion seleccionada")

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Seleccionar tipo de promoción</DialogTitle>
                </DialogHeader>

                <FieldGroup>
                    {promotionTypes.map((promotionType) => (
                        <Field key={promotionType.id} orientation="horizontal">
                            <Checkbox
                                id={promotionType.name}
                                name={promotionType.name}
                                onCheckedChange={(checked) => handleCheckedChange(checked, promotionType)}
                                checked={selectedOption?.id === promotionType.id}
                                className="hover:cursor-pointer"
                            />
                            <FieldContent>
                                <FieldLabel htmlFor={promotionType.name} className="hover:cursor-pointer">{promotionType.name}</FieldLabel>
                                <FieldDescription>{promotionType.description}</FieldDescription>
                            </FieldContent>
                        </Field>
                    ))}
                </FieldGroup>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>

                    <Button onClick={handleSave}>Aceptar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default PromotionTypeDialog