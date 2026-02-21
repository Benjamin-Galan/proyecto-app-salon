import { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { Service } from "@/types";
import { route } from 'ziggy-js'

export const useServices = () => {
    const [toggleServiceDialog, setToggleServiceDialog] = useState(false);
    const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
    const [serviceToDisable, setServiceToDisable] = useState<Service | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [toggleSelectServiceDialog, setToggleSelectServiceDialog] = useState(false);

    const closeServicesDialog = () => {
        setServiceToEdit(null);
        setToggleServiceDialog(false);
    };

    const openEditService = (service: Service) => {
        setServiceToEdit(service);
        setToggleServiceDialog(true);
    }

    const openCreateService = () => {
        setServiceToEdit(null);
        setToggleServiceDialog(true);
    }

    const confirmDisableService = (service: Service) => {
        setServiceToDisable(service);
        setDeleteDialogOpen(true);
    }

    const successServiceCreate = () => {
        toast.success("Servicio creado");
        setToggleServiceDialog(false);
    };

    const successServiceUpdate = () => {
        toast.success("Servicio actualizado");
        setToggleServiceDialog(false);
        setServiceToEdit(null);
    };

    const openSelectService = () => {
        setToggleSelectServiceDialog(true);
    }

    const closeSelectService = () => {
        setToggleSelectServiceDialog(false);
    }

    const disableService = () => {
        if (!serviceToDisable) {
            toast.error("No se ha seleccionado ningún servicio.");
            return;
        }

        router.put(
            route("admin.services.disable", serviceToDisable.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`${serviceToDisable.name} fue desactivado.`);
                    setDeleteDialogOpen(false);
                    setServiceToDisable(null);
                },
                onError: () => {
                    toast.error(`${serviceToDisable.name} no se pudo desactivar.`);
                }
            }
        );
    };


    return {
        toggleServiceDialog,
        closeServicesDialog,
        serviceToEdit,
        setServiceToEdit,
        openEditService,
        openCreateService,
        disableService,
        serviceToDisable,
        setServiceToDisable,
        deleteDialogOpen,
        setDeleteDialogOpen,
        confirmDisableService,
        successServiceCreate,
        successServiceUpdate,

        toggleSelectServiceDialog,
        closeSelectService,
        openSelectService,
    }
}