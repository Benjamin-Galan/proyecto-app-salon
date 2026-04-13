"use client"

import { Building2, Contact, Gift, HandHelping, HomeIcon as House, MapPinHouse, Menu, X, User } from "lucide-react"
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
    { icon: User, name: "Iniciar Sesión", path: "/login" },
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="lg:hidden">
      <button
        onClick={toggleMenu}
        className={`fixed top-4 right-4 z-50 p-2 rounded-full bg-beauty-deep text-white shadow-md flex items-center justify-center border-none cursor-pointer ${isOpen ? "hidden" : ""}`}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 pointer-events-none ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"}`}
        onClick={toggleMenu}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 no-underline">
              <img src="/logo.png" alt="Logo de la empresa" className="w-8" />
              <span className="text-lg text-zinc-800 font-bold">Uñas&Mechas</span>
            </a>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 flex items-center justify-center border-none bg-transparent cursor-pointer"
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="flex flex-col">
              {navLinks.map((link, index) => {
                const Icon = link.icon

                return (
                  <a
                    key={index}
                    href={link.path}
                    className="flex items-center gap-4 px-8 py-4 text-zinc-700 font-medium no-underline hover:bg-beauty-light/50 hover:text-beauty-deep transition-colors"
                    onClick={toggleMenu}
                  >
                    <Icon size={22} className="text-beauty-deep min-w-[22px]" />
                    <span className="text-[15px]">{link.name}</span>
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
