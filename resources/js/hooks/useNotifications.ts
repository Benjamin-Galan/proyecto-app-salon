import { usePage } from "@inertiajs/react"
import { PaginatedNotification, Flash, AppNotification } from "@/types"
import { router } from "@inertiajs/react"
import { route } from "ziggy-js"
import { useState } from "react"

export const useNotifications = () => {
    const { notifications } = usePage<{ notifications: PaginatedNotification }>().props

    const deleteNotification = (id: string, options?: {
        onSuccess?: (flash?: Flash) => void
        onError?: (flash?: Flash) => void
    }) => {
        router.delete(route('client.notifications.delete', id), {
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
        router.put(route('client.notifications.read', id), {}, {
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
        router.put(route('client.notifications.mark-all-as-read'), {}, {
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