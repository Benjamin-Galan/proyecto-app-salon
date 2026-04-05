import { useState } from "react"
import { Package } from "@/types"
import { toast } from "sonner"
import { router } from "@inertiajs/react"
import { route } from "ziggy-js"
import { Flash } from "@/types"

export const usePackages = () => {
    const [togglePackagesDialog, setTogglePackageDialog] = useState(false)
    const [packageToUpdate, setPackageToUpdate] = useState<Package | null>(null)
    const [packageToDisable, setPackageToDisable] = useState<Package>({} as Package)
    const [toggleDisableDialog, setToggleDisableDialog] = useState(false)

    //Dialogo para crear un paquete
    const openCreatePackageDialog = () => {
        setPackageToUpdate(null)
        setTogglePackageDialog(true)
    }

    //Cerrar el dialogo para crear un paquete
    const closeCreatePackageDialog = () => {
        setPackageToUpdate(null)
        setTogglePackageDialog(false)
    }

    //Abrir el dialogo para actualizar un paquete
    const openUpdatePackageDialog = (pack: Package) => {
        setPackageToUpdate(pack)
        setTogglePackageDialog(true)
    }

    //Cerrar el dialogo para actualizar un paquete
    const closeUpdatePackageDialog = () => {
        setPackageToUpdate(null)
        setTogglePackageDialog(false)
    }

    //Abrir el dialogo para deshabilitar un paquete
    const openDisablePackageDialog = (pack: Package) => {
        if (!pack) {
            throw new Error("No se seleccionó ningún paquete.")
        }

        setPackageToDisable(pack)
        setToggleDisableDialog(true)
    }

    //Cerrar el dialogo para deshabilitar un paquete
    const closeDisablePackageDialog = () => {
        setPackageToDisable({} as Package)
        setToggleDisableDialog(false)
    }

    const successPackageCreate = () => {
        toast.success("Paquete creado exitosamente")
        setTogglePackageDialog(false)
    }

    const successPackageUpdate = () => {
        toast.success("Paquete actualizado exitosamente")
        setTogglePackageDialog(false)
        setPackageToUpdate(null)
    }

    const disablePackage = (
        pack: Package,
        options?: {
            onSuccess?: (flash?: Flash) => void
        }
    ) => {
        router.put(route("admin.packages.disable", pack.id), {},
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    setToggleDisableDialog(false)
                    setPackageToDisable({} as Package)

                    const flash = (page.props as { flash?: Flash }).flash
                    options?.onSuccess?.(flash)
                }
            }
        )
    }

    return {
        togglePackagesDialog,
        toggleDisableDialog,
        packageToUpdate,
        packageToDisable,
        openCreatePackageDialog,
        closeCreatePackageDialog,
        openUpdatePackageDialog,
        closeUpdatePackageDialog,
        openDisablePackageDialog,
        closeDisablePackageDialog,
        successPackageCreate,
        successPackageUpdate,
        disablePackage
    }
}