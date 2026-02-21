import { useState } from "react"
import { Package } from "@/types"
import { toast } from "sonner"
import { router } from "@inertiajs/react"
import { route } from "ziggy-js"

export const usePackages = () => {
    const [togglePackagesDialog, setTogglePackageDialog] = useState(false)
    const [packageToUpdate, setPackageToUpdate] = useState<Package | null>(null)
    const [packageToDisable, setPackageToDisable] = useState<Package | null>(null)
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
        setPackageToDisable(pack)
        setToggleDisableDialog(true)
    }

    //Cerrar el dialogo para deshabilitar un paquete
    const closeDisablePackageDialog = () => {
        setPackageToDisable(null)
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

    const disablePackage = () => {
        if (!packageToDisable) {
            toast.error("No se ha seleccionado ningún paquete.")
            return
        }

        router.put(
            route("admin.packages.disable", packageToDisable.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`${packageToDisable.name} fue deshabilitado.`)
                    setToggleDisableDialog(false)
                    setPackageToDisable(null)
                },
                onError: () => {
                    toast.error(`${packageToDisable.name} no se pudo deshabilitar.`)
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