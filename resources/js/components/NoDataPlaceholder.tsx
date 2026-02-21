import { Package } from "lucide-react"

interface NoDataPlaceholderProps {
  type: string
}

export function NoDataPlaceholder({ type }: NoDataPlaceholderProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
        <Package className="w-8 h-8 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">No hay {type} registrados</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Comienza creando tu primer servicio para mostrar aquí.</p>
    </div>
  )
}