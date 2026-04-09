import { usePage } from "@inertiajs/react";
import { toast } from "sonner";
import { useEcho } from "@laravel/echo-react";
import type { SharedData } from "@/types";

type NotificationPayload = {
    title?: string;
    message?: string;
    type?: string;
};

export default function RealtimeNotifications() {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;
    const userId = user?.id;

    console.log('user id', userId)

    useEcho(
        userId ? `App.Models.User.${userId}` : "",
        ".Illuminate\\Notifications\\Events\\BroadcastNotificationCreated",
        (notification: NotificationPayload) => {
            console.log("Notificacion recibida en tiempo real", notification);

            switch (notification.type) {
                case "App\\Notifications\\AppointmentCreatedNotification":
                    toast.success(notification.title ?? "Nueva cita", {
                        description:
                            notification.message ?? "Se registro una nueva cita.",
                        action: {
                            label: "Ver",
                            onClick: () => console.log(notification),
                        }
                    });
                    break;

                case "App\\Notifications\\AppointmentConfirmedNotification":
                    toast.success(notification.title ?? "Cita confirmada", {
                        description:
                            notification.message ?? "Tu cita fue confirmada.",
                        action: {
                            label: "Ver",
                            onClick: () => console.log(notification),
                        }
                    });
                    break;

                case "App\\Notifications\\AppointmentCompletedNotification":
                    toast.success(notification.title ?? "Cita completada", {
                        description:
                            notification.message ?? "Tu cita ha finalizado.",
                        action: {
                            label: "Ver",
                            onClick: () => console.log(notification),
                        }
                    });
                    break;

                case "App\\Notifications\\AdminHasDeletedAppointment":
                case "App\\Notifications\\ClientDeletedAppointment":
                    toast.info(notification.title ?? "Cita cancelada", {
                        description:
                            notification.message ?? "Una cita ha sido cancelada.",
                        action: {
                            label: "Ver",
                            onClick: () => console.log(notification),
                        }
                    });
                    break;

                default:
                    console.log('cae en default')
                    toast.success(notification.title ?? "Nueva notificacion", {
                        description:
                            notification.message ?? "Tienes una nueva actualizacion.",
                    });
            }
        },
        [userId],
    );

    return null;
}
