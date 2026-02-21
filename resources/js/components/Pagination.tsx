import { Button } from "@/components/ui/button"
import { ChevronsLeft, ChevronsRight } from "lucide-react"
import { router } from "@inertiajs/react"

interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

interface PaginationProps {
  links: PaginationLink[]
  from?: number
  to?: number
  total?: number
}

export default function Pagination({ links, from, to, total }: PaginationProps) {
  if (!links || links.length === 0) return null

  console.log(links)

  return (
    <div className="flex items-center justify-between mt-4 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
      {/* Info */}
      {from !== undefined && to !== undefined && total !== undefined && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Mostrando {from} - {to} de {total} resultados
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-2">
        {links.map((link, i) => {
          if (link.label.includes("Anterior")) {
            return (
              <Button
                key={i}
                variant="outline"
                size="sm"
                disabled={!link.url}
                onClick={() =>
                  link.url &&
                  router.visit(link.url, {
                    preserveState: true,
                    preserveScroll: true,
                  })
                }
                className="flex items-center gap-1"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            )
          }

          if (link.label.includes("Siguiente")) {
            return (
              <Button
                key={i}
                variant="outline"
                size="sm"
                disabled={!link.url}
                onClick={() =>
                  link.url &&
                  router.visit(link.url, {
                    preserveState: true,
                    preserveScroll: true,
                  })
                }
                className="flex items-center gap-1"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            )
          }

          return (
            <Button
              key={i}
              variant={link.active ? "default" : "outline"}
              size="sm"
              disabled={!link.url}
              onClick={() =>
                link.url &&
                router.visit(link.url, {
                  preserveState: true,
                  preserveScroll: true,
                })
              }
              className={link.active ? "bg-indigo-600 hover:bg-indigo-700" : ""}
            >
              {link.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
