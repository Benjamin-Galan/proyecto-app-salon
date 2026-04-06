import { AppNotification, Flash, PaginatedNotification } from "@/types"
import { router, usePage } from "@inertiajs/react"
import { route } from "ziggy-js"

type NotificationScope = "client" | "admin"

export const useNotifications = (scope: NotificationScope = "client") => {
    const { notifications } = usePage<{ notifications: PaginatedNotification }>().props

    const routeBase = `${scope}.notifications`

    const deleteNotification = (id: string, options?: {
        onSuccess?: (flash?: Flash) => void
        onError?: (flash?: Flash) => void
    }) => {
        router.delete(route(`${routeBase}.delete`, id), {
            onSuccess: (page) => {
                const flash = (page.props as { flash?: Flash }).flash
                options?.onSuccess?.(flash)
            },
            onError: (page) => {
                const flash = (page.props as { flash?: Flash }).flash
                options?.onError?.(flash)
            }
        })
    }

    const markAsRead = (id: string, options?: {
        onSuccess?: (flash?: Flash) => void
        onError?: (flash?: Flash) => void
    }) => {
        router.put(route(`${routeBase}.read`, id), {}, {
            onSuccess: (page) => {
                const flash = (page.props as { flash?: Flash }).flash
                options?.onSuccess?.(flash)
            },
            onError: (page) => {
                const flash = (page.props as { flash?: Flash }).flash
                options?.onError?.(flash)
            }
        })
    }

    const markAllAsRead = (options?: {
        onSuccess?: (flash?: Flash) => void
        onError?: (flash?: Flash) => void
    }) => {
        router.put(route(`${routeBase}.readAll`), {}, {
            onSuccess: (page) => {
                const flash = (page.props as { flash?: Flash }).flash
                options?.onSuccess?.(flash)
            },
            onError: (page) => {
                const flash = (page.props as { flash?: Flash }).flash
                options?.onError?.(flash)
            }
        })
    }

    return {
        notifications,
        markAsRead,
        deleteNotification,
        markAllAsRead
    }
}
