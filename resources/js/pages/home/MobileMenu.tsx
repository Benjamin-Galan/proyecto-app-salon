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
    <div className="mobile-menu-container">
      <button
        onClick={toggleMenu}
        className={`menu-trigger ${isOpen ? "hidden" : "fixed"}`}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      <div
        className={`menu-overlay ${isOpen ? "is-open" : ""}`}
        onClick={toggleMenu}
      />

      <div
        className={`menu-panel ${isOpen ? "is-open" : ""}`}
      >
        <div className="flex flex-col h-full">
          <button
            onClick={toggleMenu}
            className="close-btn"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>

          <div className="menu-header">
            <div className="logo-area">
              <a href="/" className="logo-link">
                <img src="/logo.png" alt="Logo de la empresa" className="logo-img" />
                <span className="brand-text">Uñas&Mechas</span>
              </a>
            </div>
          </div>

          <div className="menu-nav-wrapper">
            <nav className="menu-nav">
              {navLinks.map((link, index) => {
                const Icon = link.icon

                return (
                  <a
                    key={index}
                    href={link.path}
                    className="nav-link"
                    onClick={toggleMenu}
                  >
                    <Icon size={24} className="nav-icon" />
                    <span>{link.name}</span>
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
