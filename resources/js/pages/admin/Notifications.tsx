import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Notificaciones",
        href: "/admin/notifications",
    },
];

export default function Notifications() {


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notificaciones" />

            <div>
                <h1 className="text-2xl font-bold mb-4">Notificaciones</h1>
            </div>
        </AppLayout>
    )
}
