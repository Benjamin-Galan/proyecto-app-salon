import { Head, router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem, Package, Promotion, Service } from "@/types";
import { useScreenChange } from "@/hooks/useScreenChange";
import ProductsSelection from "@/components/clients/scheduling/ProductsSelection";
import ShoppingCartScreen from "@/components/clients/scheduling/ShoppingCart";
import { useCart } from "@/hooks/useCart";
import {route} from "ziggy-js";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Agendamiento",
        href: "/client/scheduling",
    },
];

export default function SchedulingPage() {
    const { scheduleCurrentScreen, handleScheduleScreenChange } =
        useScreenChange();

    const {
        draft,
        totals,
        canContinueToConfirmation,
        addItem,
        removeItem,
        setQuantity,
        setDate,
        setTime,
        clearItems,
        clearDraft,
        buildAppointmentPayload,
    } = useCart();

    const { services = [], packages = [], promotions = [] } = usePage()
        .props as {
        services?: Service[];
        promotions?: Promotion[];
        packages?: Package[];
    };

    const renderScreen = () => {
        switch (scheduleCurrentScreen) {
            case "products":
                return (
                    <ProductsSelection
                        handleScheduleScreenChange={handleScheduleScreenChange}
                        services={services}
                        packages={packages}
                        promotions={promotions}
                        cartItemsCount={totals.itemsCount}
                        onAddItem={addItem}
                    />
                );
            case "cart":
                return (
                    <ShoppingCartScreen
                        handleScheduleScreenChange={handleScheduleScreenChange}
                        draft={draft}
                        totals={totals}
                        canContinueToConfirmation={canContinueToConfirmation}
                        setQuantity={setQuantity}
                        removeItem={removeItem}
                        setDate={setDate}
                        setTime={setTime}
                        clearItems={clearItems}
                        submitAppointment={() => {
                            const payload = buildAppointmentPayload();

                            if (!payload) {
                                return;
                            }

                            router.post(route("client.scheduling.store"), payload, {
                                preserveScroll: true,
                                onSuccess: () => {
                                    clearDraft();
                                    handleScheduleScreenChange("products");
                                },
                            });
                        }}
                    />
                );
            default:
                return <div>Selecciona una opcion para comenzar el agendamiento.</div>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Agendamiento" />

            <div className="min-h-screen bg-background">
                <div className="container mx-auto max-w-md px-4 py-6">
                    {renderScreen()}
                </div>
            </div>
        </AppLayout>
    );
}
