import AppLayout from "@/layouts/app-layout"
import { Appointment, BreadcrumbItem } from "@/types"
import { Head, usePage } from "@inertiajs/react"
import { useState } from "react"
import { useAppointments } from "@/hooks/useAppointments"
import { useAlerts } from "@/hooks/useAlerts"

import AppointmentCard from "@/components/clients/appointments/AppointmentCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Mis citas",
        href: "/appointments",
    },
];

export default function Appointments() {
    const { appointments = [] } = usePage().props as {
        appointments?: Appointment[]
    }

    console.log(appointments, 'appointments');

    const { goToDetails, deleteAppointment } = useAppointments()
    const { successAlert, errorAlert } = useAlerts()

    const handleDeleteAppointment = (appointment: Appointment) => {
        try {
            deleteAppointment(appointment, 'client', {
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
            errorAlert(error)
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mis citas" />

            <div className="min-h-screen bg-background">
                <div className="container mx-auto max-w-md px-4 py-6">
                    <Tabs defaultValue="pendiente" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="pendiente">Pendientes</TabsTrigger>
                            <TabsTrigger value="confirmada">Confirmadas</TabsTrigger>
                        </TabsList>

                        <TabsContent value="pendiente">
                            <AppointmentCard appointment={appointments} type="Pendiente" goToDetails={goToDetails} onDeleteAppointment={handleDeleteAppointment} />
                        </TabsContent>

                        <TabsContent value="confirmada">
                            <AppointmentCard appointment={appointments} type="Confirmada" goToDetails={goToDetails} onDeleteAppointment={handleDeleteAppointment} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    )
}