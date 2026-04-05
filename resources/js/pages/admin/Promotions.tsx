import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import HeaderContent from "@/components/HeaderContent";
import ProductsLayout from "@/layouts/admin/ProductsLayout";
import EmptyState from "@/components/EmptyState";
import { BreadcrumbItem } from "@/types";
import { Gift, Plus } from "lucide-react";
import { usePromotions } from "@/hooks/usePromotions";
import PromotionTypeDialog from "@/components/promotions/PromotionTypeDialog";
import PromotionDialog from "@/components/promotions/PromotionDialog";
import PromotionsList from "@/components/promotions/PromotionsList";
import DeletePromotionDialog from "@/components/promotions/DeletePromotionDialog";
import type { Promotion, PromotionType, Service } from "@/types";
import { useServices } from "@/hooks/useServices";
import { useAlerts } from "@/hooks/useAlerts";

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

export default function Promotions() {
    const {
        toggleOptionsDialog,
        selectedOption,
        setSelectedOption,
        openSelectOptionDialog,
        closeSelectOptionDialog,
        togglePromotionDialog,
        openPromotionDialog,
        closePromotionDialog,
        openEditPromotionDialog,
        toggleDeleteDialog,
        openDeleteDialog,
        closeDeleteDialog,
        selectedPromotion,
        deletePromotion,
    } = usePromotions()

    const { openSelectService, closeSelectService, toggleSelectServiceDialog } = useServices()
    const { errorAlert, successAlert } = useAlerts()

    const { promotionTypes = [], services = [], allPromotions = [] } = usePage().props as {
        promotionTypes?: PromotionType[]
        services?: Service[]
        allPromotions?: Promotion[]
    }

    const handleSaveOption = () => {
        closeSelectOptionDialog()
        openPromotionDialog()
    }

    const handleOpenEditDialog = (promotion: Promotion) => {
        try {
            openEditPromotionDialog(promotion)
        } catch (error: any) {
            errorAlert(error.message)
        }
    }

    const handleOpenDeleteDialog = (promotion: Promotion) => {
        try {
            openDeleteDialog(promotion)
        } catch (error: any) {
            errorAlert(error.message)
        }
    }

    const handleDeletePromotion = (promotion: Promotion) => {
        try {
            deletePromotion(promotion, {
                onSuccess: (flash) => {
                    if (flash?.success) {
                        successAlert(flash.success)
                    }
                }
            })
        } catch (error: any) {
            errorAlert(error.message)
        }
    }

    const showButtons = allPromotions && allPromotions.length > 0

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Promociones" />

            <ProductsLayout
                header={
                    <HeaderContent
                        titleIcon={<Gift className="w-6 h-6 text-purple-600" />}
                        buttonIcon={<Plus className="w-4 h-4" />}
                        sectionTitle="Promociones"
                        onOpenModal={openSelectOptionDialog}
                        showActionButtons={showButtons}
                    />
                }
            >
                {/* Aquí iría la lista de promociones */}
                {!allPromotions || allPromotions.length === 0 ? (
                    <EmptyState type="promos" onCreate={openSelectOptionDialog} />
                ) : (
                    <PromotionsList
                        promotions={allPromotions}
                        onEdit={handleOpenEditDialog}
                        onDelete={handleOpenDeleteDialog}
                    />
                )}
            </ProductsLayout>

            <PromotionTypeDialog
                open={toggleOptionsDialog}
                onOpenChange={closeSelectOptionDialog}
                promotionTypes={promotionTypes}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                onSave={handleSaveOption}
            />

            <PromotionDialog
                open={togglePromotionDialog}
                onOpenChange={closePromotionDialog}
                selectedOption={selectedOption}
                services={services}
                promotion={selectedPromotion}
                openSelectService={toggleSelectServiceDialog}
                onOpenSelectService={openSelectService}
                onCloseSelectService={closeSelectService}
            />

            <DeletePromotionDialog
                open={toggleDeleteDialog}
                onOpenChange={closeDeleteDialog}
                onConfirm={handleDeletePromotion}
                promotion={selectedPromotion}
            />
        </AppLayout>
    );
}