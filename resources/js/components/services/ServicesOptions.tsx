import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Service } from "@/types";

interface Props {
    service: Service;
    onEdit: (service: Service) => void;
    onDelete: (service: Service) => void;
}

export default function OptionsMenu({ service, onEdit, onDelete }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent >
                <DropdownMenuItem asChild className="w-full">
                    <button
                        onClick={() => {
                            setOpen(false); // ⬅️ Cierra el dropdown
                            setTimeout(() => onEdit(service), 100); // ⬅️ Abre el modal después
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
                            onDelete(service)
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
