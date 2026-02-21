import { Head, usePage } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem } from "@/types"
import HeaderContent from "@/components/HeaderContent"
import { HandHelping, Plus } from "lucide-react"
import ProductsLayout from "@/layouts/admin/ProductsLayout"
import { useServices } from "@/hooks/useServices"
import { ServicesFormDialog } from "@/components/services/ServicesFormDialog"
import { useCategories } from "@/hooks/useCategories"
import type { Category, PaginatedService } from "@/types"
import CategoriesFormDialog from "@/components/services/CategoriesFormDialog"
import CategoriesSidebar from "@/components/services/CategoriesSidebar"
import ServicesList from "@/components/services/ServicesList"
import ServicesFilters from "@/components/services/ServicesFilters"
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog"
import EmptyState from "@/components/EmptyState"
import NoCategoriesDialog from "@/components/services/NoCategoriesDialog"
import { useState } from "react"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Servicios",
        href: "/services",
    },
]

export default function ServicesPage() {
    const { categories = [], services = [] } = usePage().props as {
        services?: PaginatedService[]
        categories?: Category[]
    }

    const [showNoCategoriesDialog, setShowNoCategoriesDialog] = useState(false)

    const {
        toggleServiceDialog,
        openCreateService,
        closeServicesDialog,
        serviceToEdit,
        openEditService,
        disableService,
        serviceToDisable,
        deleteDialogOpen,
        setDeleteDialogOpen,
        successServiceCreate,
        successServiceUpdate,
        confirmDisableService
    } = useServices();

    const {
        toggleCategoriesSidebar,
        openSidebar,
        closeSidebar,
        categoryToEdit,
        createCategory,
        editCategory,
        confirmDisable,
        disableCategory,
        closeConfirm,
        toggleCategoriesModal,
        setToggleCategoriesModal,
        disableDialogOpen,
        categoryToDisable
    } = useCategories();

    const handleOpenCreateService = () => {
        if (categories.length === 0) {
            setShowNoCategoriesDialog(true)
            return
        }

        openCreateService()
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Servicios" />

            <ProductsLayout
                header={
                    <HeaderContent
                        titleIcon={<HandHelping className="w-6 h-6 text-purple-600" />}
                        buttonIcon={<Plus className="w-4 h-4" />}
                        sectionTitle="Servicios"
                        onOpenModal={openCreateService}
                        onCategories={openSidebar}
                    />
                }
            >
                <ServicesFilters categories={categories!} />

                {!services?.data || services.data.length === 0 ? (
                    <EmptyState type="servicios" onCreate={handleOpenCreateService} />
                ) : (
                    <ServicesList services={services} onEdit={openEditService} onDelete={confirmDisableService} />
                )}
            </ProductsLayout>

            <CategoriesSidebar
                openSidebar={toggleCategoriesSidebar}
                closeSidebar={closeSidebar}
                categories={categories}
                categoryToDisable={categoryToDisable}
                onCreate={createCategory}
                onEdit={editCategory}
                onDisable={disableCategory}
                onConfirm={confirmDisable}
                closeConfirm={closeConfirm}
                disableDialogOpen={disableDialogOpen}
            />

            <ServicesFormDialog
                open={toggleServiceDialog}
                onClose={closeServicesDialog}
                categories={categories}
                service={serviceToEdit}
                onCreated={successServiceCreate}
                onUpdated={successServiceUpdate}
            />

            <CategoriesFormDialog
                open={toggleCategoriesModal}
                onClose={() => setToggleCategoriesModal(false)}
                category={categoryToEdit}
            />

            <ConfirmDeleteDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={disableService}
                title="¿Eliminar servicio?"
                description={`
                        ¿Estás seguro de que deseas eliminar el servicio ${serviceToDisable?.name}?.
                         Esta acción no se puede deshacer.`}
                confirmText="Sí, eliminar"
            />

            <NoCategoriesDialog
                open={showNoCategoriesDialog}
                onClose={() => setShowNoCategoriesDialog(false)}
                onCreateCategory={() => {
                    setShowNoCategoriesDialog(false)
                    createCategory()
                }}
            />
        </AppLayout>
    );
}