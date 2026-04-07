import { Head, usePage } from "@inertiajs/react";
import { ListCheck } from "lucide-react";

import { useAlerts } from "@/hooks/useAlerts";
import { useAppointments } from "@/hooks/useAppointments";
import { appointmentsTableColums } from "@/components/appointments/AppointmentsTableColums";

import AppointmentsTable from "@/components/appointments/AppointmentsTable";
import ConfirmDialog from "@/components/appointments/ConfirmDialog";
import DeleteDialog from "@/components/appointments/DeleteDialog";
import CompleteDialog from "@/components/appointments/CompleteDialog";
import HeaderContent from "@/components/HeaderContent";
import AssignStylistDialog from "@/components/appointments/AssingStylistDialog";

import ProductsLayout from "@/layouts/admin/ProductsLayout";
import AppLayout from "@/layouts/app-layout";

import { Appointment, BreadcrumbItem, Employee } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Citas",
        href: "/admin/appointments",
    },
];

export default function Appointments() {
    const { appointments = [], employees = [] } = usePage().props as {
        appointments?: Appointment[]
        employees?: Employee[]
    }

    const { errorAlert, successAlert, warningAlert } = useAlerts()

    const {
        toggleConfirmDialog,
        openConfirmDialog,
        closeConfirmDialog,
        toggleCancelDialog,
        openCancelDialog,
        closeCancelDialog,
        toggleCompleteDialog,
        openCompleteDialog,
        closeCompleteDialog,
        toggleAssignStylistDialog,
        openAssignStylistDialog,
        closeAssignStylistDialog,
        assignStylist,
        confirmAppointment,
        completeAppointment,
        deleteAppointment,
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

    const handleComplete = (appointment: Appointment) => {
        try {
            completeAppointment(appointment, {
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

    const handleDelete = (appointment: Appointment) => {
        try {
            deleteAppointment(appointment, 'admin', {
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

    const handleOpenCompleteDialog = (appointment: Appointment) => {
        try {
            if (appointment) {
                openCompleteDialog(appointment)
            }
        } catch (error: any) {
            warningAlert(error.message)
        }
    }

    const handleOpenAssignStylistDialog = (appointment: Appointment) => {
        try {
            if (appointment) {
                openAssignStylistDialog(appointment)
            }
        } catch (error: any) {
            warningAlert(error.message)
        }
    }

    const handleAssignStylist = (appointment: Appointment, stylist: Employee) => {
        try {
            assignStylist(appointment, stylist, {
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

    const columns = appointmentsTableColums({
        onView: goToDetails,
        onConfirm: handleOpenConfirmDialog,
        onCancel: handleOpenDeleteDialog,
        onComplete: handleOpenCompleteDialog,
        onAssignStylist: handleOpenAssignStylistDialog
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
                onConfirm={handleDelete}
                appointment={appointment}
            />

            <CompleteDialog
                open={toggleCompleteDialog}
                onOpenChange={closeCompleteDialog}
                onComplete={handleComplete}
                appointment={appointment}
            />

            <AssignStylistDialog
                open={toggleAssignStylistDialog}
                onOpenChange={closeAssignStylistDialog}
                onConfirm={handleAssignStylist}
                appointment={appointment}
                stylists={employees}
            />
        </AppLayout>
    )
}
