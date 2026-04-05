import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { gotoRegister } from "@/utils/goToRegister"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const { handleNavigate } = gotoRegister()

  return (
    <footer className="p-4 bg-gradient-to-b from-beauty-light to-white">
      <div className="container mx-auto py-16">
        {/* Sección principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Columna 1: Logo e información */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="" className="w-8" />
              <span className="text-xl font-bold text-zinc-700">Uñas&Mechas</span>
            </div>

            <p className="text-gray-600 text-sm">
              Tu destino para descubrir y realzar tu belleza natural con servicios profesionales.
            </p>

            <div className="flex gap-4">
              <Button
                size="icon"
                variant="outline"
                className="w-8 h-8 rounded-full text-pink-800 hover:bg-beauty-medium hover:text-white border-0"
                asChild
              >
                <a href="#" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="w-8 h-8 rounded-full text-purple-800 hover:bg-beauty-deep hover:text-white border-0"
                asChild
              >
                <a href="#" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="w-8 h-8 rounded-full text-teal-800 hover:bg-beauty-muted hover:text-white border-0"
                asChild
              >
                <a href="#" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-base font-medium mb-4 text-gray-800">Enlaces rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-beauty-medium transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="text-gray-600 hover:text-beauty-medium transition-colors text-sm">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#paquetes" className="text-gray-600 hover:text-beauty-medium transition-colors text-sm">
                  Paquetes
                </Link>
              </li>
              <li>
                <Link href="#promociones" className="text-gray-600 hover:text-beauty-medium transition-colors text-sm">
                  Promociones
                </Link>
              </li>
              <li>
                <Link href="#nosotros" className="text-gray-600 hover:text-beauty-medium transition-colors text-sm">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-gray-600 hover:text-beauty-medium transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Servicios */}
          <div>
            <h3 className="text-base font-medium mb-4 text-gray-800">Servicios</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-beauty-medium transition-colors text-sm">
                  Cortes de cabello
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-beauty-medium transition-colors text-sm">
                  Coloración
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-beauty-medium transition-colors text-sm">
                  Tratamientos capilares
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-beauty-medium transition-colors text-sm">
                  Manicure y pedicure
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-beauty-medium transition-colors text-sm">
                  Maquillaje
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-beauty-medium transition-colors text-sm">
                  Tratamientos faciales
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Horario y botón */}
          <div>
            <h3 className="text-base font-medium mb-4 text-gray-800">Horario</h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-gray-600">Lunes - Viernes</span>
                <span className="text-gray-800">8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-600">Sábado</span>
                <span className="text-gray-800">8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-600">Domingo</span>
                <span className="text-gray-800">08:00 AM - 12:00 am</span>
              </li>
            </ul>
            <div className="mt-6">
              <Button asChild className="w-full bg-beauty-deep hover:bg-beauty-dark text-white rounded-full">
                <button onClick={handleNavigate}>Agenda tu cita</button>
              </Button>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© {currentYear} Uñas&Mechas. Todos los derechos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-beauty-medium text-xs">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-500 hover:text-beauty-medium text-xs">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
