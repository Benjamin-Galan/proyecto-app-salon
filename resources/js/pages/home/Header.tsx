"use client"

import { router } from "@inertiajs/react"
import { useState, useEffect } from "react"

export default function Header() {
  const navLinks = [
    { name: "Inicio", path: "#inicio" },
    { name: "Servicios", path: "#servicios" },
    { name: "Promociones", path: "#promociones" },
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
    <div className={`fixed top-0 left-0 w-full z-20 justify-between items-center px-8 py-4 font-medium transition-all duration-300 hidden lg:flex ${scrolled ? "backdrop-blur-md bg-white/60 shadow-sm text-[#141414]" : "bg-transparent text-white"}`}>
      <div className="flex items-center gap-2 text-[18px]">
        <img src="/logo.png" alt="Logo de la empresa" className="w-8 h-8" />
        <a href="/" className="block">
          Uñas&Mechas
        </a>
      </div>

      <nav className="flex justify-between gap-6"
        onMouseEnter={() => setScrolled(true)}
        onMouseLeave={() => setScrolled(false)}
      >
        {navLinks.map((link, index) => (
          <a key={index} href={link.path} className="text-shadow-lg">
            {link.name}
          </a>
        ))}
      </nav>

      <button className="border border-current rounded-lg px-4 py-1.5 transition-colors duration-300 hover:bg-[#fff8dc]/40 hover:cursor-pointer" onClick={handleNavigate}>
        Iniciar Sesión
      </button>
    </div>
  )
}
