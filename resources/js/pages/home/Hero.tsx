import { Link } from "@inertiajs/react"
import Header from "./Header"
import { MobileMenu } from "./MobileMenu"
import { useMediaQuery } from "@/hooks/use-media-query"
import { gotoRegister } from "@/utils/goToRegister"
import { ArrowRight, Calendar } from "lucide-react"

export default function Hero() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const { handleNavigate } = gotoRegister()

  return (
    <section className="relative flex items-end justify-center p-4 bg-gradient-to-b from-purple-600/80 to-purple-600/40 min-h-[100dvh] overflow-hidden lg:justify-between lg:p-16">
      {/* Renderizado condicional basado en el tamaño de pantalla */}
      {isDesktop ? <Header /> : <MobileMenu />}

      {/* Contenido */}
      <div className="z-10 flex flex-col items-center text-center px-4 lg:max-w-[700px] lg:p-12">
        {/**Texto dorado */}
        <p
          className="text-beauty-soft/80 text-sm font-semibold uppercase tracking-[0.25em] opacity-0"
          style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards' }}
        >
          Salón de belleza · Managua
        </p>

        {/* Título principal */}
        <h1
          className="text-[4.5rem] lg:text-[7.5rem] my-10 font-bold leading-[1.05] text-white opacity-0"
          style={{
            fontFamily: "var(--font-script, 'Dancing Script', cursive)",
            textShadow: '0 4px 24px rgba(0,0,0,0.2)',
            animation: 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards'
          }}
        >
          Uñas &amp;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-beauty-soft to-pink-300 bg-[length:200%] animate-[gradientMove_3s_linear_infinite]">
            Mechas
          </span>
        </h1>

        {/* Botones */}
        <div
          className="flex flex-col sm:flex-row gap-3 opacity-0"
          style={{ animation: 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards' }}
        >
          <button
            onClick={handleNavigate}
            className="inline-flex items-center justify-center gap-2 bg-white text-[#2d1254] font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-beauty-soft hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.2)] text-[1rem]"
          >
            <Calendar className="w-4 h-4" />
            Agendar cita
          </button>

          <Link
            href="#servicios"
            className="inline-flex items-center justify-center gap-2 border border-white/30 text-white bg-white/10 backdrop-blur-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5 text-[1rem] no-underline"
          >
            Ver servicios
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="hero__background">
        <img
          src="/girl2.png"
          alt="Modelo mostrando peinado y maquillaje en Uñas & Mechas"
          className="hero__background__img"
        />
      </div>
    </section>
  )
}
