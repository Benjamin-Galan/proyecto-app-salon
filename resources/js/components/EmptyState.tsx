// components/EmptyState.tsx
import { Button } from "@/components/ui/button"
import { Plus, Package, Gift, HandHelping } from "lucide-react"

type EmptyType = "servicios" | "paquetes" | "promos"

interface Props {
    type: EmptyType
    onCreate?: () => void
}

const config = {
    servicios: {
        title: "No hay servicios",
        description: "Aún no has creado ningún servicio. Empieza agregando el primero.",
        icon: HandHelping,
        buttonText: "Crear servicio",
    },
    paquetes: {
        title: "No hay paquetes",
        description: "Todavía no existen paquetes. Crea uno para agrupar servicios.",
        icon: Package,
        buttonText: "Crear paquete",
    },
    promos: {
        title: "No hay promociones",
        description: "No tienes promociones activas en este momento.",
        icon: Gift,
        buttonText: "Crear promoción",
    },
}

export default function EmptyState({ type, onCreate }: Props) {
    const { title, description, icon: Icon, buttonText } = config[type]

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed rounded-2xl">
            <Icon className="w-12 h-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
                {description}
            </p>

            {onCreate && (
                <Button className="mt-6" onClick={onCreate}>
                    <Plus className="w-4 h-4 mr-2" />
                    {buttonText}
                </Button>
            )}
        </div>
    )
}
