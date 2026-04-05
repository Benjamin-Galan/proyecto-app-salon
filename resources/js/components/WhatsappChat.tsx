"use client"

import { useState, useEffect } from "react"
import { X, MessageCircle, Send } from "lucide-react"

type WhatsAppChatProps = {
    phoneNumber: string
    welcomeMessage?: string
    position?: "bottom-right" | "bottom-left"
}

export default function WhatsAppChat({
    phoneNumber,
    welcomeMessage = "Hola, gracias por visitarnos!",
    position = "bottom-right",
}: WhatsAppChatProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    // Mostrar el botón de chat después de 2 segundos
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    const toggleChat = () => {
        setIsOpen(!isOpen)
    }

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
        <>
            {/* Botón flotante de WhatsApp */}
            <div
                className={`fixed ${positionClasses[position]} bottom-4 sm:bottom-8 z-40 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                {!isOpen && (
                    <button
                        onClick={toggleChat}
                        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105"
                        aria-label="Abrir chat de WhatsApp"
                    >
                        <MessageCircle className="h-6 w-6" />
                    </button>
                )}

                {/* Ventana de chat */}
                {isOpen && (
                    <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden w-80 flex flex-col">
                        {/* Cabecera */}
                        <div className="bg-gray-800 px-4 py-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="bg-green-500 p-1 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </div>
                                <span className="text-white font-medium">WhatsApp</span>
                            </div>
                            <button
                                onClick={toggleChat}
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Cerrar chat"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Contenido del chat */}
                        <div className="bg-gray-800 p-4 flex-1">
                            <div className="bg-gray-700 rounded-lg p-4 text-white">
                                <p className="mb-2">
                                    <span className="text-yellow-400">😊</span> {welcomeMessage}
                                </p>
                                <p className="mb-2">
                                    <span className="text-yellow-400">👉</span> Tiene consultas sobre los servicios?
                                </p>
                                <p>Llámenos o simplemente inicie Chat.</p>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="p-4 bg-gray-900 flex flex-col gap-3">
                            <button
                                onClick={handleWhatsAppRedirect}
                                className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 transition-colors"
                            >
                                <span className="text-yellow-400">👍</span> Llamar Cel Tigo
                            </button>

                            <button
                                onClick={handleWhatsAppRedirect}
                                className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg flex items-center justify-between transition-colors"
                            >
                                <span className="font-medium">Chat con Estilista</span>
                                <Send className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
