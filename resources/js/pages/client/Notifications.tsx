import { AppNotification, BreadcrumbItem, PaginatedNotification } from "@/types"
import { Head } from "@inertiajs/react"
import { useNotifications } from "@/hooks/useNotifications";
import { useAlerts } from "@/hooks/useAlerts";

import Pagination from "@/components/Pagination";
import AppLayout from "@/layouts/app-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationList from "@/components/clients/notifications/NotificationList";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Notificaciones",
        href: "/notifications",
    },
];

export default function Notifications() {
    const { notifications,
        markAsRead,
        deleteNotification,
        markAllAsRead
    } = useNotifications()

    const { errorAlert, successAlert, warningAlert } = useAlerts()

    const handleMarkAsRead = (notification: AppNotification) => {
        try {
            markAsRead(notification.id, {
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

    const handleDeleteNotification = (notification: AppNotification) => {
        try {
            deleteNotification(notification.id, {
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notificaciones" />

            <div className="min-h-screen bg-background">
                <div className="container mx-auto max-w-md px-4 py-6">
                    <Tabs defaultValue="unread" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="unread">No leídas</TabsTrigger>
                            <TabsTrigger value="read">Leídas</TabsTrigger>
                        </TabsList>

                        <TabsContent value="unread">
                            <NotificationList
                                notifications={notifications}
                                type="unread"
                                onMarkAsRead={handleMarkAsRead}
                                onDeleteNotification={handleDeleteNotification}
                            />
                        </TabsContent>

                        <TabsContent value="read">
                            <NotificationList
                                notifications={notifications}
                                type="read"
                                onMarkAsRead={handleMarkAsRead}
                                onDeleteNotification={handleDeleteNotification}
                            />
                        </TabsContent>
                    </Tabs>

                    <Pagination
                        links={notifications.links}
                        from={notifications.from}
                        to={notifications.to}
                        total={notifications.total}
                    />
                </div>
            </div>
        </AppLayout>
    )
}

