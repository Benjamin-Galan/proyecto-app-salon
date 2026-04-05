"use client"

import { router } from "@inertiajs/react"
import { useState, useEffect } from "react"

export default function Header() {
  const navLinks = [
    { name: "Inicio", path: "#inicio" },
    { name: "Servicios", path: "#servicios" },
    { name: "Paquetes", path: "#paquetes" },
    { name: "Nosotros", path: "#nosotros" },
    { name: "Ubicacion", path: "#ubicacion" },
    { name: "Contacto", path: "#contacto" },
  ]

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavigate = () => {
    router.visit("login")
  }

  return (
    <div className={`header_container ${scrolled ? "scrolled" : ""} hidden lg:flex`}>
      <div className="header_logo">
        <img src="/logo.png" alt="Logo de la empresa" />
        <a href="/" className="header_text">
          Uñas&Mechas
        </a>
      </div>

      <nav className="header_nav">
        {navLinks.map((link, index) => (
          <a key={index} href={link.path} className="header_links">
            {link.name}
          </a>
        ))}
      </nav>

      <button className="header_button" onClick={handleNavigate}>
        Iniciar Sesión
      </button>
    </div>
  )
}
