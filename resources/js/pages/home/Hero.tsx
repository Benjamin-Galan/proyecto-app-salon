import { Link } from "@inertiajs/react"
import Header from "./Header"
import { MobileMenu } from "./MobileMenu"
import { useMediaQuery } from "@/hooks/use-media-query"
import { gotoRegister } from "@/utils/goToRegister"

export default function Hero() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const { handleNavigate } = gotoRegister()

  return (
    <section className="relative flex items-end justify-center p-4 bg-[#f7d4f4] min-h-[100dvh] overflow-hidden lg:justify-between lg:p-16">
      {/* Renderizado condicional basado en el tamaño de pantalla */}
      {isDesktop ? <Header /> : <MobileMenu />}

      {/* Contenido */}
      <div className="z-10 flex flex-col items-center text-center px-4 lg:max-w-[800px] lg:p-12">
        {/**Texto dorado */}
        <p
          className="text-white text-[1.1rem] font-bold uppercase tracking-[0.2em] mb-2 text-shadow-lg opacity-0 lg:text-[1.25rem] lg:mb-4"
          style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards' }}
        >
          Salón de belleza
        </p>

        {/* Título principal */}
        <h1
          className="text-[4.5rem] font-bold leading-[1.1] mb-4 text-white [text-shadow:0_4px_12px_rgba(0,0,0,0.6)] opacity-0 lg:text-[7.5rem] lg:mb-6 lg:[text-shadow:0_6px_16px_rgba(0,0,0,0.6)]"
          style={{ fontFamily: "var(--font-script, 'Dancing Script', cursive)", animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards' }}
        >
          Uñas & Mechas
        </h1>

        {/* Descripción */}
        {/* <p
          className="text-[1.15rem] leading-[1.6] text-white [text-shadow:0_2px_6px_rgba(0,0,0,0.8)] mx-auto mb-10 max-w-[95%] font-normal opacity-0 lg:text-[1.4rem] lg:max-w-[90%] lg:mb-14"
          style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards' }}
        >
          Servicios exclusivos y profesionales diseñados para
          realzar tu belleza natural.
        </p> */}

        {/* Botones */}
        <div
          className="flex flex-col gap-5 w-full max-w-[300px] mx-auto opacity-0 lg:flex-row lg:justify-center lg:max-w-none lg:gap-8"
          style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards' }}
        >
          <button
            className="bg-white text-black font-semibold px-8 py-[0.8rem] rounded-full transition-all duration-300 ease text-[1.1rem] shadow-[0_4px_12px_rgba(255,255,255,0.2)] hover:bg-[#f2f2f2] hover:-translate-y-[2px] hover:shadow-[0_6px_16px_rgba(255,255,255,0.3)]"
            onClick={handleNavigate}
          >
            Agendar cita
          </button>

          <button className="hover:text-slate-600 bg-black/30 text-white border border-white/60 font-semibold px-8 py-[0.8rem] rounded-full transition-all duration-300 ease text-[1.1rem] hover:bg-white/15 hover:border-white hover:-translate-y-[2px]">
            <Link href="#servicios">
              Ver servicios
            </Link>
          </button>
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


// .hero__background img {
//     position: absolute;
//     left: -9;
//     right: 0;
//     top: 0;
//     height: 100%;
//     object-fit: cover;
//     z-index: 0;
//     backdrop-filter: blur(12px);
//     opacity: 1;
//     transition: opacity 0.5s ease-in-out;
// }

// @media (max-width: 1024px) {
//     .hero__background img {
//         opacity: 0.7;
//         transition: opacity 0.5s ease-in-out;
//     }
// }