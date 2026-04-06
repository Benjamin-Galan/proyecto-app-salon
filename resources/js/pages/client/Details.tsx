import AppLayout from "@/layouts/app-layout"
import { Appointment, BreadcrumbItem } from "@/types"
import { Head, usePage } from "@inertiajs/react"
import DetailsIncludeHeader from "@/components/clients/appointments/DetailsIncludeHeader"
import DetailsIncludeList from "@/components/appointments/DetailsIncludeList"
import DetailsIncludeFooter from "@/components/clients/appointments/DetailsIncludeFooter"
import DetailsSummary from "@/components/clients/appointments/DetailsSummary"

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

    if (!appointment) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Detalles de la cita" />

                <div className="min-h-screen bg-background">
                    <div className="container mx-auto h-full max-w-md px-4 py-6">
                        <p className="text-foreground/80 dark:text-foreground/70">
                            No se encontro la cita
                        </p>
                    </div>
                </div>
            </AppLayout>
        )
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detalles de la cita" />

            <div className="min-h-screen bg-background">
                <div className="container mx-auto h-full max-w-md px-4 py-6">
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
