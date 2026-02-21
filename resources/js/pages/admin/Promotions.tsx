import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import HeaderContent from "@/components/HeaderContent";
import ProductsLayout from "@/layouts/admin/ProductsLayout";
import EmptyState from "@/components/EmptyState";
import { BreadcrumbItem } from "@/types";
import { Gift, Plus } from "lucide-react";
import { usePromotions } from "@/hooks/usePromotions";
import { PromotionTypeDialog } from "@/components/promotions/PromotionTypeDialog";
import type { PromotionType } from "@/types";

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
    } = usePromotions()

    const { promotionTypes = [] } = usePage().props as {
        promotionTypes?: PromotionType[]
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
                    Hola
                </div>
            </ProductsLayout>

            <PromotionTypeDialog
                open={toggleOptionsDialog}
                onOpenChange={closeSelectOptionDialog}
                promotionTypes={promotionTypes}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
        </AppLayout>
    );
}