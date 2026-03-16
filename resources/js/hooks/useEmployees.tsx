import { useState } from 'react';
import { Employee } from '@/types';
import { toast } from 'sonner';

export const useEmployees = () => {
    const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
    const [toggleDialog, setToggleDialog] = useState(false);
    const [isCreating, setIsCreating] = useState(true);

    const openToCreate = () => {
        setIsCreating(true);
        setToggleDialog(true);
    };

    const openToEdit = (employee: Employee) => {
        setIsCreating(false);
        setEmployeeToEdit(employee);
        setToggleDialog(true);
    };

    const closeDialog = () => {
        setToggleDialog(false);
        setEmployeeToEdit(null);
    }

    const onSuccess = (isCreating: boolean) => {
        toast.success(isCreating ? "Empleado creado exitosamente" : "Empleado actualizado exitosamente");
        closeDialog();
    }

    return {
        openToCreate,
        openToEdit,
        employeeToEdit,
        toggleDialog,
        closeDialog,
        isCreating,
        
        onSuccess
    }
}
