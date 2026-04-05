import { useState } from "react"
import { Flash, Package, Promotion } from "@/types"
import { toast } from "sonner"
import { router } from "@inertiajs/react"
import { route } from "ziggy-js"
import { PromotionType } from "@/types"

export const usePromotions = () => {
    const [toggleOptionsDialog, setToggleOptionsDialog] = useState(false);
    const [togglePromotionDialog, setTogglePromotionDialog] = useState(false);
    const [toggleDeleteDialog, setToggleDeleteDialog] = useState(false);
    const [selectedOption, setSelectedOption] = useState<PromotionType | null>(null)
    const [selectedPromotion, setSelectedPromotion] = useState<Promotion>({} as Promotion)

    //Abrir el dialogo para seleccionar una opcion
    const openSelectOptionDialog = () => {
        setSelectedOption(null)
        setToggleOptionsDialog(true)
    }

    //Cerrar el dialogo para seleccionar una opcion
    const closeSelectOptionDialog = () => {
        setToggleOptionsDialog(false)
    }

    //Abrir el dialogo para crear una promocion
    const openPromotionDialog = () => {
        setTogglePromotionDialog(true)
    }

    //Cerrar el dialogo para crear una promocion
    const closePromotionDialog = () => {
        setTogglePromotionDialog(false)
        setSelectedPromotion({} as Promotion)
    }

    //Abrir el dialogo para editar una promocion
    const openEditPromotionDialog = (promotion: Promotion) => {
        setSelectedPromotion(promotion)
        setSelectedOption(promotion.promotion_type ?? null)
        setTogglePromotionDialog(true)
    }

    const openDeleteDialog = (promotion: Promotion) => {
        if (!promotion) {
            throw new Error('No se ha seleccionado ninguna promocion')
        }

        setSelectedPromotion(promotion)
        setToggleDeleteDialog(true)
    }

    const closeDeleteDialog = () => {
        setSelectedPromotion({} as Promotion)
        setToggleDeleteDialog(false)
    }

    const deletePromotion = (
        promotion: Promotion,
        options: {
            onSuccess?: (flash?: Flash) => void
        }
    ) => {
        router.put(route('admin.promotions.disable', promotion.id), {}, {
            onSuccess: (page) => {
                closeDeleteDialog()

                const flash = (page.props as { flash?: Flash }).flash
                options?.onSuccess?.(flash)
            }
        })
    }

    return {
        toggleOptionsDialog,
        setToggleOptionsDialog,

        selectedOption,
        setSelectedOption,

        openSelectOptionDialog,
        closeSelectOptionDialog,

        togglePromotionDialog,
        setTogglePromotionDialog,
        openPromotionDialog,
        closePromotionDialog,
        openEditPromotionDialog,

        toggleDeleteDialog,
        setToggleDeleteDialog,
        openDeleteDialog,
        closeDeleteDialog,

        selectedPromotion,
        setSelectedPromotion,

        deletePromotion,
    }
}