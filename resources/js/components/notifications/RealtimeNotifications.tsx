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
    const userRole = user?.role;

    useEcho(
        `App.Models.User.${userId}`,
        ".Illuminate\\Notifications\\Events\\BroadcastNotificationCreated",
        (notification: NotificationPayload) => {
            console.log("Notificación recibida:", notification);

            if (userRole !== "admin") return;

            toast.success(notification.title ?? "Nueva notificacion", {
                description:
                    notification.message ?? "Tienes una nueva actualizacion.",
            });
        },
        [userId, userRole],
    );

    return null;
}


// import { usePage } from "@inertiajs/react";
// import { toast } from "sonner";
// import { useEcho } from "@laravel/echo-react";
// import type { SharedData } from "@/types";
// import { useEffect, useState } from "react";

// type NotificationPayload = {
//     title?: string;
//     message?: string;
//     type?: string;
// };

// export default function RealtimeNotifications() {
//     const { auth } = usePage<SharedData>().props;
//     const user = auth?.user;
//     const userId = user?.id;
//     const userRole = user?.role;

//     const [notifications, setNotifications] = useState<NotificationPayload[]>([]);

//     useEcho(
//         `App.Models.User.${userId}`,
//         ".Illuminate\\Notifications\\Events\\BroadcastNotificationCreated",
//         (notification: NotificationPayload) => {
//             console.log("Notificación recibida:", notification);

//             if (userRole !== "admin") return;

//             setNotifications((prev) => [...prev, notification]);

//             // toast.success(notification.title ?? "Nueva notificacion", {
//             //     description:
//             //         notification.message ?? "Tienes una nueva actualizacion.",
//             // });
//         },
//         [userId, userRole],
//     );

//     useEffect(() => {
//         notifications.forEach((notification) => {
//             toast.success(notification.title ?? "Nueva notificacion", {
//                 description:
//                     notification.message ?? "Tienes una nueva actualizacion.",
//             });
//         });
//     }, [notifications]);

//     return null;
// }
