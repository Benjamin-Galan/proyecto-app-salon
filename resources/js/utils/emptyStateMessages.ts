export const emptyStateMessages = {
    servicios: {
        title: "No hay servicios registrados",
        description: "Comienza agregando tu primer servicio para que tus clientes puedan conocer lo que ofreces.",
        actionLabel: "Crear servicio",
    },
    paquetes: {
        title: "No hay paquetes registrados",
        description: "Crea tu primer paquete combinando servicios para ofrecer opciones más atractivas a tus clientes.",
        actionLabel: "Crear paquete",
    },
    promos: {
        title: "No hay promociones activas",
        description: "Crea promociones especiales para atraer nuevos clientes y aumentar tus ventas.",
        actionLabel: "Crear promoción",
    },
} as const

export type EmptyStateType = keyof typeof emptyStateMessages

export function getEmptyStateMessage(type: EmptyStateType) {
    return emptyStateMessages[type]
}
