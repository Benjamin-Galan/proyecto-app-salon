"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"

type WhatsAppChatProps = {
    phoneNumber: string
    position?: "bottom-right" | "bottom-left"
}

export default function WhatsAppChat({
    phoneNumber,
    position = "bottom-right",
}: WhatsAppChatProps) {
    const [isVisible, setIsVisible] = useState(false)

    // Mostrar el botón de chat después de 2 segundos
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    const handleWhatsAppRedirect = () => {
        // Formatear el número de teléfono (eliminar espacios, guiones, etc.)
        const formattedNumber = phoneNumber.replace(/\D/g, "")

        // Crear la URL de WhatsApp con el mensaje predefinido
        const whatsappUrl = `https://wa.me/${formattedNumber}?text=Hola,%20me%20gustaría%20obtener%20información%20sobre%20sus%20servicios.`

        // Abrir WhatsApp en una nueva pestaña
        window.open(whatsappUrl, "_blank")
    }

    const positionClasses = {
        "bottom-right": "right-4 sm:right-8",
        "bottom-left": "left-4 sm:left-8",
    }

    return (
        <div
            className={`fixed ${positionClasses[position]} bottom-4 sm:bottom-8 z-40 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
        >
            <button
                onClick={handleWhatsAppRedirect}
                className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="Contactar por WhatsApp"
            >
                <div className="relative">
                    <MessageCircle className="h-7 w-7" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                </div>
            </button>
        </div>
    )
}
