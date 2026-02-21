import { useState, useCallback } from "react";
import { router } from "@inertiajs/react";
import type { Category } from "@/types";
import { toast } from "sonner";
import { route } from "ziggy-js";


export function useCategories() {
    const [toggleCategoriesSidebar, setToggleCategoriesSidebar] = useState(false);
    const [toggleCategoriesModal, setToggleCategoriesModal] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
    const [categoryToDisable, setCategoryToDisable] = useState<Category | null>(null);
    const [disableDialogOpen, setDisableDialogOpen] = useState(false);

    const closeSidebar = () => {
        setToggleCategoriesSidebar(false)
    }

    const openSidebar = () => {
        setToggleCategoriesSidebar(true)
    }

    const createCategory = () => {
        setCategoryToEdit(null)
        setToggleCategoriesModal(true)
    }

    const editCategory = (category: Category) => {
        setCategoryToEdit(category)
        setToggleCategoriesModal(true)
    }

    const confirmDisable = (category: Category) => {
        setCategoryToDisable(category)
        setDisableDialogOpen(true)
    }

    const closeConfirm = () => {
        setDisableDialogOpen(false)
    }

    const successCategoryCreate = () => {
        toast.success("Categoría creada")
        setToggleCategoriesModal(false)
    }

    const successCategoryUpdate = () => {
        toast.success("Categoría actualizada")
        setToggleCategoriesModal(false)
        setCategoryToEdit(null)
    }

    // Desactivar una categoría
    const disableCategory = () => {
        if (!categoryToDisable) {
            toast.error("Categoría no encontrada")
            return;
        }

        router.put(
            route("admin.categories.disable", categoryToDisable.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`${categoryToDisable.name} fue desactivado.`);
                    setDisableDialogOpen(false);
                    setCategoryToDisable(null);
                },
                onError: () => {
                    toast.error(`${categoryToDisable.name} no se pudo desactivar.`);
                }
            }
        )
    }

    return {
        toggleCategoriesSidebar,
        setToggleCategoriesSidebar,
        toggleCategoriesModal,
        setToggleCategoriesModal,
        categoryToEdit,
        setCategoryToEdit,
        categoryToDisable,
        setCategoryToDisable,
        disableDialogOpen,
        setDisableDialogOpen,
        closeSidebar,
        openSidebar,
        createCategory,
        editCategory,
        confirmDisable,
        closeConfirm,
        successCategoryCreate,
        successCategoryUpdate,
        disableCategory
    };
}
