type DateTimeFormatOptions = {
    includeDate?: boolean
    includeTime?: boolean
    invalidFallback?: string
}

export function formatDateTime(
    value: string | Date,
    options: DateTimeFormatOptions = {}
) {
    const {
        includeDate = true,
        includeTime = true,
        invalidFallback = "-"
    } = options

    const date = value instanceof Date ? value : new Date(value)

    if (Number.isNaN(date.getTime())) {
        return invalidFallback
    }

    return new Intl.DateTimeFormat("es-NI", {
        ...(includeDate
            ? {
                day: "2-digit" as const,
                month: "2-digit" as const,
                year: "numeric" as const,
            }
            : {}),
        ...(includeTime
            ? {
                hour: "2-digit" as const,
                minute: "2-digit" as const,
            }
            : {}),
    }).format(date)
}

export function formatTime(time: string, invalidFallback = "-") {
    if (!time) {
        return invalidFallback
    }

    const [hours, minutes] = time.split(":")

    if (!hours || !minutes) {
        return invalidFallback
    }

    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`
}

export function formatDate(date: string, invalidFallback = "-") {
    if (!date) {
        return invalidFallback
    }

    const [year, month, day] = date.split("T")[0].split("-")

    if (!year || !month || !day) {
        return invalidFallback
    }

    return `${day}/${month}/${year}`
}
