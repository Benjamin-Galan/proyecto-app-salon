import { Link } from "@inertiajs/react"
import { gotoRegister } from "@/utils/goToRegister"
import TiktokIcon from "./icons/TiktokIcon"
import InstagramIcon from "./icons/InstagramIcon"
import FacebookIcon from "./icons/FacebookIcon"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { handleNavigate } = gotoRegister()

  return (
    <footer className="p-4 bg-gradient-to-b from-beauty-light to-white">
      <div className="max-w-[1280px] mx-auto py-16">
        {/* Sección principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Columna 1: Logo e información */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="" className="w-8" />
              <span className="text-xl font-bold text-gray-700">Uñas&Mechas</span>
            </div>

            <p className="text-gray-600 text-sm leading-5">
              Tu destino para descubrir y realzar tu belleza natural con servicios profesionales.
            </p>

            <div className="flex gap-4">
              <a href="https://www.facebook.com/umechas/" className="flex items-center justify-center w-9 h-9 p-2 rounded-full transition-all duration-300 no-underline text-pink-800 hover:bg-beauty-medium/40 hover:text-white" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/unasymechas_nic/" className="flex items-center justify-center w-9 h-9 p-2 rounded-full transition-all duration-300 no-underline text-purple-800 hover:bg-beauty-medium/40 hover:text-white" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.tiktok.com/@umechas_salon" className="flex items-center justify-center w-9 h-9 p-2 rounded-full transition-all duration-300 no-underline text-teal-800 hover:bg-beauty-medium/40 hover:text-white" aria-label="Twitter">
                <TiktokIcon />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-base font-medium mb-4 text-gray-800">Enlaces rápidos</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li><Link href="#" className="text-gray-600 no-underline text-sm transition-colors hover:text-beauty-medium">Inicio</Link></li>
              <li><Link href="#servicios" className="text-gray-600 no-underline text-sm transition-colors hover:text-beauty-medium">Servicios</Link></li>
              <li><Link href="#paquetes" className="text-gray-600 no-underline text-sm transition-colors hover:text-beauty-medium">Paquetes</Link></li>
              <li><Link href="#promociones" className="text-gray-600 no-underline text-sm transition-colors hover:text-beauty-medium">Promociones</Link></li>
              <li><Link href="#nosotros" className="text-gray-600 no-underline text-sm transition-colors hover:text-beauty-medium">Nosotros</Link></li>
              <li><Link href="#contacto" className="text-gray-600 no-underline text-sm transition-colors hover:text-beauty-medium">Contacto</Link></li>
            </ul>
          </div>

          {/* Columna 3: Servicios */}
          <div>
            <h3 className="text-base font-medium mb-4 text-gray-800">Servicios</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li><a href="#servicios" className="text-gray-600 no-underline text-sm transition-colors hover:text-beauty-medium">Cortes de cabello</a></li>
              <li><a href="#servicios" className="text-gray-600 no-underline text-sm transition-colors hover:text-beauty-medium">Coloración</a></li>
              <li><a href="#servicios" className="text-gray-600 no-underline text-sm transition-colors hover:text-beauty-medium">Tratamientos capilares</a></li>
              <li><a href="#servicios" className="text-gray-600 no-underline text-sm transition-colors hover:text-beauty-medium">Manicure y pedicure</a></li>
              <li><a href="#servicios" className="text-gray-600 no-underline text-sm transition-colors hover:text-beauty-medium">Maquillaje</a></li>
              <li><a href="#servicios" className="text-gray-600 no-underline text-sm transition-colors hover:text-beauty-medium">Tratamientos faciales y más</a></li>
            </ul>
          </div>

          {/* Columna 4: Horario y botón */}
          <div>
            <h3 className="text-base font-medium mb-4 text-gray-800">Horario</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li className="flex justify-between text-sm">
                <span className="text-gray-600">Lunes - Viernes</span>
                <span className="text-gray-800 font-normal">8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-600">Sábado</span>
                <span className="text-gray-800 font-normal">8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-600">Domingo</span>
                <span className="text-gray-800 font-normal">08:00 AM - 12:00 am</span>
              </li>
            </ul>
            <div className="mt-6">
              <button className="w-full bg-beauty-deep text-white py-3 rounded-full border-none font-semibold cursor-pointer transition-colors duration-300 hover:bg-beauty-dark" onClick={handleNavigate}>
                Agenda tu cita
              </button>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-gray-500 text-sm text-center">© {currentYear} Uñas&Mechas. Todos los derechos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 text-xs no-underline transition-colors hover:text-beauty-medium">Política de Privacidad</a>
              <a href="#" className="text-gray-500 text-xs no-underline transition-colors hover:text-beauty-medium">Términos de Servicio</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

