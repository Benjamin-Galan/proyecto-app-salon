import Pagination from "@/components/Pagination";
import NotificationList from "@/components/clients/notifications/NotificationList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAlerts } from "@/hooks/useAlerts";
import { useNotifications } from "@/hooks/useNotifications";
import AppLayout from "@/layouts/app-layout";
import { AppNotification, BreadcrumbItem, PaginatedNotification } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { BellRing, CheckCheck, Inbox } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Notificaciones",
        href: "/admin/notifications",
    },
];

export default function Notifications() {
    const { notifications, markAsRead, deleteNotification, markAllAsRead } = useNotifications("admin");
    const { errorAlert, successAlert } = useAlerts();
    const { notificationStats } = usePage<{
        notifications: PaginatedNotification;
        notificationStats: {
            total: number;
            unread: number;
            read: number;
        };
    }>().props;

    const handleMarkAsRead = (notification: AppNotification) => {
        try {
            markAsRead(notification.id, {
                onSuccess: (flash) => {
                    if (flash?.success) {
                        successAlert(flash.success);
                    }

                    if (flash?.error) {
                        errorAlert(flash.error);
                    }
                },
                onError: (flash) => {
                    if (flash?.error) {
                        errorAlert(flash.error);
                    }
                },
            });
        } catch (error: any) {
            errorAlert(error.message);
        }
    };

    const handleDeleteNotification = (notification: AppNotification) => {
        try {
            deleteNotification(notification.id, {
                onSuccess: (flash) => {
                    if (flash?.success) {
                        successAlert(flash.success);
                    }

                    if (flash?.error) {
                        errorAlert(flash.error);
                    }
                },
                onError: (flash) => {
                    if (flash?.error) {
                        errorAlert(flash.error);
                    }
                },
            });
        } catch (error: any) {
            errorAlert(error.message);
        }
    };

    const handleMarkAllAsRead = () => {
        try {
            markAllAsRead({
                onSuccess: (flash) => {
                    if (flash?.success) {
                        successAlert(flash.success);
                    }

                    if (flash?.error) {
                        errorAlert(flash.error);
                    }
                },
                onError: (flash) => {
                    if (flash?.error) {
                        errorAlert(flash.error);
                    }
                },
            });
        } catch (error: any) {
            errorAlert(error.message);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notificaciones" />

            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-8">
                <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">Notificaciones del administrador</h1>
                        <p className="text-muted-foreground">
                            Revisa avisos operativos y novedades importantes del salón.
                        </p>
                    </div>

                    <Button onClick={handleMarkAllAsRead} disabled={notificationStats.unread === 0}>
                        <CheckCheck className="mr-2 h-4 w-4" />
                        Marcar todas como leídas
                    </Button>
                </header>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total</CardTitle>
                            <BellRing className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold">{notificationStats.total}</div>
                            <CardDescription>Todas las notificaciones del panel.</CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">No leídas</CardTitle>
                            <Inbox className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold">{notificationStats.unread}</div>
                            <CardDescription>Notificaciones que siguen pendientes.</CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Leídas</CardTitle>
                            <CheckCheck className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold">{notificationStats.read}</div>
                            <CardDescription>Notificaciones ya revisadas.</CardDescription>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Bandeja de notificaciones</CardTitle>
                        <CardDescription>
                            Separa rápidamente las notificaciones pendientes de las ya revisadas.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Tabs defaultValue="unread" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="unread">No leídas</TabsTrigger>
                                <TabsTrigger value="read">Leídas</TabsTrigger>
                            </TabsList>

                            <TabsContent value="unread" className="pt-4">
                                <NotificationList
                                    notifications={notifications}
                                    type="unread"
                                    onMarkAsRead={handleMarkAsRead}
                                    onDeleteNotification={handleDeleteNotification}
                                />
                            </TabsContent>

                            <TabsContent value="read" className="pt-4">
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
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
