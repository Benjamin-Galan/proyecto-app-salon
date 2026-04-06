import { PaginatedNotification } from "@/types"
import OptionsMenu from "./OptionsMenu"
import { AppNotification } from "@/types"
import { useMemo } from "react"
import { cn } from "@/lib/utils"

interface Props {
    notifications: PaginatedNotification
    type: "unread" | "read"
    onMarkAsRead: (notification: AppNotification) => void
    onDeleteNotification: (notification: AppNotification) => void
}

export default function NotificationList({
    notifications,
    type,
    onMarkAsRead,
    onDeleteNotification
}: Props) {
    const filteredNotifications = useMemo(() => {
        if (type === "unread") {
            return notifications.data.filter((notification) => notification.read_at === null)
        }

        return notifications.data.filter((notification) => notification.read_at)
    }, [notifications, type])

    return (
        <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                    <article
                        key={notification.id}
                        className={cn(
                            "rounded-lg border p-4 shadow-sm",
                            notification.read_at ? "bg-card" : "bg-cyan-600/10"
                        )}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                                <div>
                                    <h2 className="text-sm font-semibold text-foreground">
                                        {notification.title}
                                    </h2>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    {notification.message ?? "Sin detalles disponibles."}
                                </p>
                            </div>

                            <OptionsMenu
                                notification={notification}
                                onMarkAsRead={onMarkAsRead}
                                onDeleteNotification={onDeleteNotification}
                            />
                        </div>
                    </article>
                ))
            ) : (
                <div className="rounded-lg border border-dashed bg-card p-6 text-center text-sm text-muted-foreground">
                    No tienes notificaciones guardadas.
                </div>
            )}
        </div>
    )
}
