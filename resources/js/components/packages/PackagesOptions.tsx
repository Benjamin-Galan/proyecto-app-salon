import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Package } from "@/types";

interface Props {
    pack: Package;
    onEdit: (pack: Package) => void;
    onDelete: (pack: Package) => void;
}

export default function PackagesOptions({ pack, onEdit, onDelete }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 border border-transparent dark:border-slate-700 shadow-[0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-none transition-colors">
                    <MoreVertical className="w-4 h-4" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent >
                <DropdownMenuItem asChild className="w-full">
                    <button
                        onClick={() => {
                            setOpen(false); // ⬅️ Cierra el dropdown
                            setTimeout(() => onEdit(pack), 100); // ⬅️ Abre el modal después
                        }}
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                    </button>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="w-full">
                    <button
                        onClick={() => {
                            setOpen(false); // ⬅️ Cierra el dropdown
                            onDelete(pack)
                        }}
                    >
                        <Trash className="mr-2 h-4 w-4 text-red-500" />
                        Eliminar
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}