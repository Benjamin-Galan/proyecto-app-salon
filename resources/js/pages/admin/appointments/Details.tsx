//Inertia
import { Head, usePage } from "@inertiajs/react"
import { Appointment, BreadcrumbItem } from "@/types"

//Components
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { NotebookPen, UserCheck2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import DetailsMainInfo from "@/components/appointments/DetailsMainInfo"
import DetailsDateInfo from "@/components/appointments/DetailsDateInfo"
import DetailsIncludeList from "@/components/appointments/DetailsIncludeList"

//Layouts
import AppLayout from "@/layouts/app-layout"

export default function Details() {
    const { appointment } = usePage().props as {
        appointment?: Appointment
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: "Citas",
            href: "/admin/appointments",
        },
        {
            title: `Detalle de la cita de ${appointment?.user?.name}`,
            href: "",
        },
    ];

    if (!appointment) {
        return <div>No se encontrÃ³ la cita</div>
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detalles de la cita" />

            <Card className="m-2 border-0 shadow-none sm:m-3">
                <CardHeader className="px-3 pb-4 sm:px-6">
                    <DetailsMainInfo appointment={appointment} />
                </CardHeader>

                <CardContent className="grid grid-cols-1 gap-5 px-3 pb-4 sm:px-6 lg:grid-cols-3 lg:gap-6">
                    <div className="space-y-5 lg:col-span-2 lg:space-y-6">
                        <DetailsIncludeList appointment={appointment} />


                        <div className="mt-2 border-t pt-4">
                            <p className="text-sm text-gray-500">Notas</p>
                            <p className="mt-1 break-words font-medium">
                                {appointment?.notes ? appointment?.notes : "Sin observaciones"}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-5 lg:space-y-6">
                        <DetailsDateInfo appointment={appointment} />
                    </div>
                </CardContent>
            </Card>
        </AppLayout>
    )
}
