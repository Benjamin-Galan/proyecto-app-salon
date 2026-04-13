import { Check, Sparkles } from "lucide-react"
import type { Package } from "@/types"
import { gotoRegister } from "@/utils/goToRegister"

interface PackageListProps {
  packages: Package[]
}

export default function Packages({ packages }: PackageListProps) {
  const { handleNavigate } = gotoRegister()

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-beauty-light to-[#f3f4f5]">
      {/* Orbes decorativos de fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[8%] right-[6%] h-72 w-72 rounded-full bg-beauty-soft/60 blur-[130px]" />
        <div className="absolute bottom-[8%] left-[6%] h-72 w-72 rounded-full bg-beauty-light blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-beauty-medium/10 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Encabezado de sección */}
        <div className="flex flex-col items-center justify-center mb-14 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px w-10 bg-beauty-medium" />
            <Sparkles className="h-4 w-4 text-beauty-medium" />
            <div className="h-px w-10 bg-beauty-medium" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">Paquetes Especiales</h2>
          <p className="mt-3 max-w-xl text-gray-500 mx-auto text-sm leading-relaxed">
            Combina nuestros servicios y ahorra con estos paquetes diseñados para ti.
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pack) => (
            <div
              key={pack.id}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-beauty-soft/60 shadow-sm shadow-beauty-soft/40 hover:shadow-lg hover:shadow-beauty-soft/50 hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Línea decorativa violeta */}
              <div className="h-[3px] w-full bg-gradient-to-r from-beauty-soft via-beauty-medium to-beauty-deep" />

              {/* Contenido superior */}
              <div className="p-5 flex flex-col gap-1">
                <h3 className="text-base font-semibold text-gray-900 leading-snug">{pack.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{pack.description}</p>
              </div>

              {/* Precio */}
              <div className="px-5 pb-2">
                <span className="text-2xl font-bold text-beauty-deep">
                  C$ {pack.total}
                </span>
                <span className="text-xs text-gray-400 font-normal ml-1">/ sesión</span>
              </div>

              {/* Separador */}
              <div className="mx-5 border-t border-beauty-soft/50" />

              {/* Lista de servicios */}
              <div className="p-5 grow">
                <ul className="flex flex-col gap-2.5">
                  {pack.services.map((service, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-beauty-light shrink-0">
                        <Check className="w-2.5 h-2.5 text-beauty-deep" />
                      </span>
                      <span className="text-sm text-gray-700">{service.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botón */}
              <div className="p-5 pt-0">
                <button
                  className="w-full py-2.5 rounded-full border border-beauty-medium text-beauty-deep bg-transparent font-semibold text-sm transition-colors duration-300 hover:bg-beauty-medium hover:text-white cursor-pointer"
                  onClick={handleNavigate}
                >
                  Reservar ahora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
