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
import { BellRing, CheckCheck } from "lucide-react";
import HeaderContent from "@/components/HeaderContent";
import ProductsLayout from "@/layouts/admin/ProductsLayout";

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

            <ProductsLayout
                header={
                    <HeaderContent
                        titleIcon={<BellRing className="w-6 h-6 text-purple-600" />}
                        buttonIcon={<CheckCheck className="w-4 h-4" />}
                        sectionTitle="Notificaciones"
                        onOpenModal={handleMarkAllAsRead}
                        showActionButtons={true}
                    />
                }
            >
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
                                <TabsTrigger value="unread" className="flex items-center gap-2">
                                    No leídas
                                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                        {notificationStats.unread}
                                    </span>
                                </TabsTrigger>
                                <TabsTrigger value="read" className="flex items-center gap-2">
                                    Leídas
                                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                        {notificationStats.read}
                                    </span>
                                </TabsTrigger>
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
            </ProductsLayout>
        </AppLayout>
    );
}

