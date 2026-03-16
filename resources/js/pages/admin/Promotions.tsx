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
import type { Promotion, PromotionType, Service } from "@/types";
import { useServices } from "@/hooks/useServices";

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
        openSelectOptionDialog,
        closeSelectOptionDialog,
        selectedOption,
        setSelectedOption,

        togglePromotionDialog,
        openPromotionDialog,
        closePromotionDialog
    } = usePromotions()

    const { openSelectService, closeSelectService, toggleSelectServiceDialog } = useServices()

    const { promotionTypes = [], services = [], allPromotions = [] } = usePage().props as {
        promotionTypes?: PromotionType[]
        services?: Service[]
        allPromotions?: Promotion[]
    }

    console.log(services, "LLEGAN LOS SERVICIOS????")
    console.log(allPromotions, "LLEGAN TODAS LAS PROMOOS????")

    const handleSaveOption = () => {
        closeSelectOptionDialog()
        openPromotionDialog()
    }

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
                    />
                }
            >
                <div>
                    Aqui irian los filtros
                </div>

                {/* Aquí iría la lista de promociones */}
                {!allPromotions || allPromotions.length === 0 ? (
                    <EmptyState type="promos" onCreate={openSelectOptionDialog} />
                ) : (
                    <PromotionsList 
                        promotions={allPromotions}
                        // onEdit={}
                        // onDelete={}
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
                // promotion={promotion}
                openSelectService={toggleSelectServiceDialog}
                onOpenSelectService={openSelectService}
                onCloseSelectService={closeSelectService}
            />
        </AppLayout>
    );
}