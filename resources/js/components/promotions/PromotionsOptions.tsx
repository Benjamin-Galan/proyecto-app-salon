import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Eye, MoreVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Promotion } from "@/types";

interface Props {
    promotion: Promotion;
    onEdit: (promotion: Promotion) => void;
    onDelete: (promotion: Promotion) => void;
    onView: (promotion: Promotion) => void;
}

export default function PromotionsOptions({ promotion, onEdit, onDelete, onView }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 border border-transparent dark:border-slate-700 shadow-[0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-none transition-colors">
                    <MoreVertical className="w-4 h-4" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(promotion)}>
                    <Eye className="w-4 h-4 mr-2" />
                    Mas detalles
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onEdit(promotion)}>
                    <Pencil className="w-4 h-4 mr-2" />
                    Editar
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onDelete(promotion)}>
                    <Trash className="w-4 h-4 mr-2" />
                    Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}