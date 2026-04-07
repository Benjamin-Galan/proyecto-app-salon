import { Head, router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import type { Appointment, BreadcrumbItem, Employee, Package, PaginatedPackage, PaginatedPromotion, PaginatedService, Promotion, Service } from "@/types";
import { useScreenChange } from "@/hooks/useScreenChange";
import ProductsSelection from "@/components/clients/scheduling/ProductsSelection";
import ShoppingCartScreen from "@/components/clients/scheduling/ShoppingCart";
import { useCart } from "@/hooks/useCart";
import { route } from "ziggy-js";
import { useAppointments } from "@/hooks/useAppointments";
import { useAlerts } from "@/hooks/useAlerts";

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
        setNotes,
        clearItems,
        clearDraft,
        buildAppointmentPayload,
    } = useCart();

    const { services, packages, promotions, uncompleted = [], employees = [] } = usePage().props as unknown as {
        services: PaginatedService;
        promotions: PaginatedPromotion;
        packages: PaginatedPackage;
        uncompleted?: Appointment[];
        employees?: Employee[];
    };

    const { createAppointment, isProcessing } = useAppointments();
    const { successAlert, errorAlert } = useAlerts();

    const handleCreateAppointment = () => {
        const payload = buildAppointmentPayload();

        if (!payload) {
            errorAlert("Por favor selecciona una fecha y hora para tu cita.");
            return;
        }

        try {
            createAppointment(payload, clearDraft, {
                onSuccess: (flash) => {
                    if (flash?.success) {
                        successAlert(flash.success)
                    }
                },
                onError: (flash) => {
                    if (flash?.error) {
                        errorAlert(flash.error)
                    }
                }
            })
        } catch (error: any) {
            errorAlert(error)
        }
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
                        setNotes={setNotes}
                        clearItems={clearItems}
                        submitAppointment={handleCreateAppointment}
                        isProcessing={isProcessing}
                        uncompleted={uncompleted}
                        employees={employees}
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
