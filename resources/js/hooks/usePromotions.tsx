import { useState } from "react"
import { Package } from "@/types"
import { toast } from "sonner"
import { router } from "@inertiajs/react"
import { route } from "ziggy-js"
import { PromotionType } from "@/types"

export const usePromotions = () => {
    const [toggleOptionsDialog, setToggleOptionsDialog] = useState(false);
    const [selectedOption, setSelectedOption] = useState<PromotionType | null>(null)

    //Abrir el dialogo para seleccionar una opcion
    const openSelectOptionDialog = () => {
        setSelectedOption(null)
        setToggleOptionsDialog(true)
    }

    //Cerrar el dialogo para seleccionar una opcion
    const closeSelectOptionDialog = () => {
        setSelectedOption(null)
        setToggleOptionsDialog(false)
    }

    return {
        toggleOptionsDialog,
        setToggleOptionsDialog,
        selectedOption,
        setSelectedOption,

        openSelectOptionDialog,
        closeSelectOptionDialog
    }
}