import { Check } from "lucide-react"
import type { Package } from "@/types"
import { gotoRegister } from "@/utils/goToRegister"

interface PackageListProps {
  packages: Package[]
}

export default function Packages({ packages }: PackageListProps) {
  const { handleNavigate } = gotoRegister()

  return (
    <section className="py-[4.5rem] bg-gradient-to-b from-beauty-light to-beauty-soft/20">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Título y Descripción */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#3f3f46]">Paquetes Especiales</h2>
          <p className="text-lg text-[#52525b] max-w-xl">
            Combina nuestros servicios y ahorra con estos paquetes diseñados para ti.
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pack) => (
            <div
              key={pack.id}
              className="flex flex-col justify-between bg-white border border-gray-200 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="p-6 relative">
                <h3 className="text-xl font-bold text-gray-800 pr-20">{pack.name}</h3>
                <p className="text-gray-600 mt-2">{pack.description}</p>
              </div>

              <div className="p-6 grow">
                <div className="mb-6">
                  <div className="text-2xl font-bold text-beauty-deep">
                    C$ {pack.total}
                    <span className="text-xs text-gray-500 font-normal"> / sesión</span>
                  </div>
                </div>

                {/* Lista de servicios con checkmarks */}
                <ul className="mb-6 list-none p-0 flex flex-col gap-2">
                  {pack.services.map((service, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-beauty-medium shrink-0" />
                      <span className="text-gray-700 text-sm">{service.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6">
                <button
                  className="w-full py-3 rounded-md border-none font-semibold transition-colors duration-300 cursor-pointer bg-beauty-deep text-white hover:bg-beauty-dark"
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
