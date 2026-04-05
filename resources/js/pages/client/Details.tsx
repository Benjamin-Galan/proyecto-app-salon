import AppLayout from "@/layouts/app-layout"
import { Appointment, BreadcrumbItem } from "@/types"
import { Head, usePage } from "@inertiajs/react"
import { useState } from "react"
import AppointmentCard from "@/components/clients/appointments/AppointmentCard"
import DetailsIncludeHeader from "@/components/clients/appointments/DetailsIncludeHeader"
import DetailsIncludeList from "@/components/appointments/DetailsIncludeList"
import DetailsIncludeFooter from "@/components/clients/appointments/DetailsIncludeFooter"
import DetailsSummary from "@/components/clients/appointments/DetailsSummary"


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Details() {
    const { appointment = null } = usePage().props as {
        appointment?: Appointment
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: "Mis citas",
            href: "/client/appointments",
        },
        {
            title: "Detalles de la cita",
            href: `/client/appointments/${appointment?.id}/details`,
        }
    ];

    console.log(appointment, 'appointment');

    if (!appointment) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Detalles de la cita" />

                <div className="min-h-screen bg-background">
                    <div className="container mx-auto max-w-md px-4 py-6 h-full">
                        <p>No se encontró la cita</p>
                    </div>
                </div>
            </AppLayout>
        )
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detalles de la cita" />

            <div className="min-h-screen bg-background">
                <div className="container mx-auto max-w-md px-4 py-6 h-full">
                    <DetailsIncludeHeader appointment={appointment} />

                    <div className="mt-6">
                        <DetailsIncludeList appointment={appointment} />
                    </div>

                    <div className="mt-6">
                        <DetailsSummary appointment={appointment} />
                    </div>

                    <div className="mt-6">
                        <DetailsIncludeFooter appointment={appointment} />
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}