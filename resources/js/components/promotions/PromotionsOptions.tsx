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
                <button className="p-2 rounded-full hover:bg-gray-100">
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