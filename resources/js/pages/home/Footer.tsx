import { Link } from "@inertiajs/react"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { gotoRegister } from "@/utils/goToRegister"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { handleNavigate } = gotoRegister()

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Sección principal del footer */}
        <div className="footer-grid">
          {/* Columna 1: Logo e información */}
          <div className="footer-brand">
            <div className="logo-wrapper">
              <img src="/logo.png" alt="" className="logo-img" />
              <span className="brand-name">Uñas&Mechas</span>
            </div>

            <p className="brand-description">
              Tu destino para descubrir y realzar tu belleza natural con servicios profesionales.
            </p>

            <div className="social-links">
              <a href="#" className="social-btn facebook" aria-label="Facebook">
                <Facebook className="icon" />
              </a>
              <a href="#" className="social-btn instagram" aria-label="Instagram">
                <Instagram className="icon" />
              </a>
              <a href="#" className="social-btn twitter" aria-label="Twitter">
                <Twitter className="icon" />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="footer-column">
            <h3 className="column-title">Enlaces rápidos</h3>
            <ul className="links-list">
              <li><Link href="#" className="link-item">Inicio</Link></li>
              <li><Link href="#servicios" className="link-item">Servicios</Link></li>
              <li><Link href="#paquetes" className="link-item">Paquetes</Link></li>
              <li><Link href="#promociones" className="link-item">Promociones</Link></li>
              <li><Link href="#nosotros" className="link-item">Nosotros</Link></li>
              <li><Link href="#contacto" className="link-item">Contacto</Link></li>
            </ul>
          </div>

          {/* Columna 3: Servicios */}
          <div className="footer-column">
            <h3 className="column-title">Servicios</h3>
            <ul className="links-list">
              <li><a href="#" className="link-item">Cortes de cabello</a></li>
              <li><a href="#" className="link-item">Coloración</a></li>
              <li><a href="#" className="link-item">Tratamientos capilares</a></li>
              <li><a href="#" className="link-item">Manicure y pedicure</a></li>
              <li><a href="#" className="link-item">Maquillaje</a></li>
              <li><a href="#" className="link-item">Tratamientos faciales</a></li>
            </ul>
          </div>

          {/* Columna 4: Horario y botón */}
          <div className="footer-column">
            <h3 className="column-title">Horario</h3>
            <ul className="schedule-list">
              <li className="schedule-item">
                <span className="day">Lunes - Viernes</span>
                <span className="hours">8:00 AM - 6:00 PM</span>
              </li>
              <li className="schedule-item">
                <span className="day">Sábado</span>
                <span className="hours">8:00 AM - 6:00 PM</span>
              </li>
              <li className="schedule-item">
                <span className="day">Domingo</span>
                <span className="hours">08:00 AM - 12:00 am</span>
              </li>
            </ul>
            <div className="cta-wrapper">
              <button className="cta-btn" onClick={handleNavigate}>
                Agenda tu cita
              </button>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="footer-bottom">
          <div className="bottom-wrapper">
            <p className="copyright">© {currentYear} Uñas&Mechas. Todos los derechos reservados.</p>
            <div className="legal-links">
              <a href="#" className="legal-link">Política de Privacidad</a>
              <a href="#" className="legal-link">Términos de Servicio</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
