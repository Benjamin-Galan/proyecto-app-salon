import { Head, usePage } from "@inertiajs/react";
import { ListCheck } from "lucide-react";

import { useAlerts } from "@/hooks/useAlerts";
import { useAppointments } from "@/hooks/useAppointments";
import { appointmentsTableColums } from "@/components/appointments/AppointmentsTableColums";

import AppointmentsTable from "@/components/appointments/AppointmentsTable";
import ConfirmDialog from "@/components/appointments/ConfirmDialog";
import DeleteDialog from "@/components/appointments/DeleteDialog";
import HeaderContent from "@/components/HeaderContent";

import ProductsLayout from "@/layouts/admin/ProductsLayout";
import AppLayout from "@/layouts/app-layout";

import { Appointment, BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Citas",
        href: "/admin/appointments",
    },
];

export default function Appointments() {
    const { appointments = [] } = usePage().props as {
        appointments?: Appointment[]
    }

    const { errorAlert, successAlert, warningAlert } = useAlerts()

    const {
        toggleConfirmDialog,
        openConfirmDialog,
        closeConfirmDialog,
        toggleCancelDialog,
        openCancelDialog,
        closeCancelDialog,
        confirmAppointment,
        cancelAppointment,
        goToDetails,
        appointment
    } = useAppointments()

    const handleConfirm = (appointment: Appointment) => {
        try {
            confirmAppointment(appointment, {
                onSuccess: (flash) => {
                    if (flash?.success) {
                        successAlert(flash.success)
                    }

                    if (flash?.error) {
                        errorAlert(flash.error)
                    }
                }
            })
        } catch (error: any) {
            errorAlert(error.message)
        }
    }

    const handleCancel = (appointment: Appointment) => {
        try {
            cancelAppointment(appointment, {
                onSuccess: (flash) => {
                    if (flash?.success) {
                        successAlert(flash.success)
                    }

                    if (flash?.error) {
                        errorAlert(flash.error)
                    }
                }
            })
        } catch (error: any) {
            errorAlert(error.message)
        }
    }

    const handleOpenConfirmDialog = (appointment: Appointment) => {
        try {
            if (appointment) {
                openConfirmDialog(appointment)
            }
        } catch (error: any) {
            warningAlert(error.message)
        }
    }

    const handleOpenDeleteDialog = (appointment: Appointment) => {
        try {
            if (appointment) {
                openCancelDialog(appointment)
            }
        } catch (error: any) {
            warningAlert(error.message)
        }
    }

    const columns = appointmentsTableColums({
        onView: goToDetails,
        onConfirm: handleOpenConfirmDialog,
        onCancel: handleOpenDeleteDialog
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Citas" />

            <ProductsLayout
                header={
                    <HeaderContent
                        sectionTitle="Citas"
                        onOpenModal={() => { }}
                        titleIcon={<ListCheck className="w-5 h-5" />}
                        buttonIcon=""
                    />
                }
            >
                <AppointmentsTable
                    columns={columns}
                    data={appointments}
                />
            </ProductsLayout>

            <ConfirmDialog
                open={toggleConfirmDialog}
                onOpenChange={closeConfirmDialog}
                onConfirm={handleConfirm}
                appointment={appointment}
            />

            <DeleteDialog
                open={toggleCancelDialog}
                onOpenChange={closeCancelDialog}
                onConfirm={handleCancel}
                appointment={appointment}
            />
        </AppLayout>
    )
}
