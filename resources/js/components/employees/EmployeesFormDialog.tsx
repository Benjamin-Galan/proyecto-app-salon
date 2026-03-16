import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import EmployeesManageForm from "./EmployeesManageForm"
import { Employee } from "@/types"

interface Props {
    open: boolean;
    onClose: () => void;
    isCreating?: boolean;
    employee: Employee | null;
    onSuccess: (isCreating: boolean) => void;
}

export default function EmployeesFormDialog({ open, onClose, isCreating, employee, onSuccess }: Props) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {`${isCreating ? "Crear" : "Editar"} Empleado`}
                    </DialogTitle>

                    <EmployeesManageForm 
                        employee={employee}
                        isCreating={isCreating}
                        onSuccess={onSuccess}
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
