"use client"

import { Building2, Contact, Gift, HandHelping, HomeIcon as House, MapPinHouse, Menu, X,  } from "lucide-react"
import { useState } from "react"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { icon: House, name: "Inicio", path: "#inicio" },
    { icon: HandHelping, name: "Servicios", path: "#servicios" },
    { icon: Gift, name: "Paquetes", path: "#paquetes" },
    { icon: Building2, name: "Nosotros", path: "#nosotros" },
    { icon: MapPinHouse, name: "Ubicación", path: "#ubicacion" },
    { icon: Contact, name: "Contacto", path: "#contacto" },
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="lg:hidden">
      <button
        onClick={toggleMenu}
        className={`${isOpen ? "hidden" : "fixed"} top-4 right-4 z-50 p-2 rounded-full bg-yellow-800 text-white shadow-md`}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleMenu}
      />

      <div
        className={`fixed bottom-0 left-0 h-1/2 w-full bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out rounded-t-2xl ${isOpen ? "translate-y-30" : "translate-y-full"}`}
      >
        <div className="flex flex-col h-full">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>

          <div className="px-6 py-8 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo de la empresa" className="w-10" />
              <a href="/" className="text-zinc-800 text-xl">
                Uñas&Mechas
              </a>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav className="px-4 space-y-1 flex justify-between">
              {navLinks.map((link, index) => {
                const Icon = link.icon

                return (
                  <a
                    key={index}
                    href={link.path}
                    className="text-xs text-zinc-900 flex flex-col items-center gap-3 py-2 hover:cursor-pointer"
                    onClick={toggleMenu}
                  >
                    <Icon size={24} className="text-yellow-700" />
                    {link.name}
                  </a>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
