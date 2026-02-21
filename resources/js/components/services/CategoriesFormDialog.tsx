"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Category } from "@/types"
import { CategoryForm } from "./CategoriesForm"
// import { CategoryForm } from "./CategoriesForm"

interface Props {
  open: boolean
  onClose: () => void
  category: Category | null
}

export default function CategoriesFormDialog({ open, onClose, category = null }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{category ? "Editar categoría" : "Nueva Categoría"}</DialogTitle>
        </DialogHeader>

        <CategoryForm category={category} onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}
