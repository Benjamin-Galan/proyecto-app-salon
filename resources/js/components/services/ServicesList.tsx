import type { PaginatedService, Service } from "@/types"
import { NoDataPlaceholder } from "../NoDataPlaceholder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import ServiceOptions from "./ServicesOptions"
import { Badge } from "@/components/ui/badge"
import Pagination from "@/components/Pagination"

interface ServicesProps {
  services?: PaginatedService[]
  onEdit?: (service: Service) => void
  onDelete?: (service: Service) => void
}

export default function ServicesList({ services, onEdit, onDelete }: ServicesProps) {
  if (!services) {
    return <NoDataPlaceholder type="servicios" />
  }

  return (
    <div>
      <div className="grid lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {services?.data?.map((service) => (
          <Card
            key={service.id}
            className="group px-1 pt-1 pb-2transition-all duration-300 shadow-sm shadow-pink-100 hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 overflow-hidden"
          >
            {/* Imagen del servicio */}
            <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-100">
              <img
                src={service.image ? `/storage/services/${service.image}` : "/placeholder.svg?height=200&width=400"}
                alt={service.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <CardHeader className="m-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-md font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                    {service.name}
                  </CardTitle>
                </div>
                <ServiceOptions onEdit={onEdit!} onDelete={onDelete!} service={service} />
              </div>
            </CardHeader>

            <CardContent className="space-y-2">
              {/* Descripción */}
              {service.description && (
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )}

              {/* Precio y descuento */}
              <div className="flex justify-between gap-3 flex-col lg:flex-row">
                <div className="flex items-center gap-3">
                  {service.discount > 0 ? (
                    <>
                      <span className="text-gray-400 line-through">
                        {service.price} C$
                      </span>
                      <span className="font-bold text-green-600 dark:text-green-400">
                        {service.total_price} C$
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {service.price} C$
                    </span>
                  )}
                </div>

                {/* Duración */}
                <Badge className="rounded-full" variant="secondary">
                  {service.duration} minutos
                </Badge>
              </div>
            </CardContent>
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
    </div>
  )
}
