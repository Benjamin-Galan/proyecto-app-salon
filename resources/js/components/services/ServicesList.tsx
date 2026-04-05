import type { PaginatedService, Service } from "@/types"
import { NoDataPlaceholder } from "../NoDataPlaceholder"
import { Card, CardTitle } from "@/components/ui/card"
import ServiceOptions from "./ServicesOptions"
import Pagination from "@/components/Pagination"
import { cardStyle, imageStyle } from "@/utils/servicesCardStyles"

import { useState } from "react"
import ServiceDetailsDialog from "./ServiceDetailsDialog"

interface ServicesProps {
  services?: PaginatedService
  onEdit?: (service: Service) => void
  onDelete?: (service: Service) => void
}

export default function ServicesList({ services, onEdit, onDelete }: ServicesProps) {
  const [openDetails, setOpenDetails] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const handleOpenDetails = (service: Service) => {
    setSelectedService(service)
    setOpenDetails(true)
  }

  const handleCloseDetails = () => {
    setOpenDetails(false)
    setSelectedService(null)
  }

  if (!services) {
    return <NoDataPlaceholder type="servicios" />
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {services?.data?.map((service) => (
          <Card
            key={service.id}
            className={cardStyle}
          >
            {/* Imagen del servicio */}
            <div className={imageStyle}>
              <img
                src={service.image ? `/storage/services/${service.image}` : "/placeholder.svg?height=200&width=400"}
                alt={service.name}
                className="w-full object-cover"
              />
            </div>

            <article className="px-2.5 py-1.5 space-y-1.5">
              <div className="flex items-center justify-between gap-1">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-md font-semibold leading-snug text-gray-900 dark:text-gray-100 line-clamp-2">
                    {service.name}
                  </CardTitle>
                </div>
                <ServiceOptions onEdit={onEdit!} onDelete={onDelete!} onOpenDetails={handleOpenDetails} service={service} />
              </div>

              {/* Descripción */}
              {service.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {service.description}
                </p>
              )}

              {/* Precio y descuento */}
              <div className="pt-1.5 border-t border-gray-100 dark:border-gray-700/50">
                <div className="flex items-center justify-end gap-2">
                  {service.discount > 0 ? (
                    <>
                      <span className="text-xs text-gray-400 line-through">
                        C$ {service.price}
                      </span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">
                        C$ {service.total_price}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">
                      C$ {service.price}
                    </span>
                  )}
                </div>
              </div>
            </article>
          </Card>
        ))}
      </div>

      {services?.data?.length > 0 && (
        <Pagination
          links={services.links}
          from={services.from}
          to={services.to}
          total={services.total}
        />
      )}

      <ServiceDetailsDialog
        open={openDetails}
        onOpenChange={handleCloseDetails}
        service={selectedService}
      />
    </div>
  )
}
