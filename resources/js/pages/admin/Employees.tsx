import { useMemo } from "react";
import { Plus, Users2Icon } from "lucide-react";

import AppLayout from "@/layouts/app-layout";
import ProductsLayout from "@/layouts/admin/ProductsLayout";
import HeaderContent from "@/components/HeaderContent";
import EmployeesFormDialog from "@/components/employees/EmployeesFormDialog";

import { getEmployeesColumns } from "@/components/employees/ColumnsTable";
import { EmployeesTable } from "@/components/employees/EmployeesTable";
import { Head, usePage } from "@inertiajs/react";
import { useEmployees } from "@/hooks/useEmployees";
import { BreadcrumbItem, Employee } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Personal",
        href: "/staff",
    },
];

export default function Employees() {
    const { openToCreate, openToEdit, employeeToEdit, toggleDialog, closeDialog, isCreating, onSuccess } = useEmployees();

    const { employees = [] } = usePage().props as {
        employees?: Employee[]
    }
    const columns = useMemo(() => getEmployeesColumns({ onEdit: openToEdit }), [openToEdit])

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Personal" />

            <ProductsLayout
                header={
                    <HeaderContent
                        titleIcon={<Users2Icon className="w-6 h-6 text-purple-600" />}
                        buttonIcon={<Plus className="w-4 h-4" />}
                        sectionTitle="Empleados"
                        onOpenModal={openToCreate}
                    />
                }
            >
                <EmployeesTable columns={columns} data={employees} />
            </ProductsLayout>

            <EmployeesFormDialog
                open={toggleDialog}
                onClose={closeDialog}
                isCreating={isCreating}
                employee={employeeToEdit}
                onSuccess={onSuccess}
            />
        </AppLayout>
    )
}
