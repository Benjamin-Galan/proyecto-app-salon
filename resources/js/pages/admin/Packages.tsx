import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem, Service, Package } from "@/types"
import HeaderContent from "@/components/HeaderContent"
import ProductsLayout from "@/layouts/admin/ProductsLayout"
import { Gift, Plus } from "lucide-react";
import { usePackages } from "@/hooks/usePackages";
import { PackagesFormDialog } from "@/components/packages/PackagesFormDialog";
import { useServices } from "@/hooks/useServices";
import PackagesList from "@/components/packages/PackagesList";
import { useState, useMemo } from "react";
import PackagesFilters from "@/components/packages/PackagesFilters";
import EmptyState from "@/components/EmptyState";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Servicios",
        href: "/services",
    },
]

export default function PackagesPage() {
    const { services = [], allPackages = [] } = usePage().props as { services?: Service[], allPackages?: Package[] }
    const { openSelectService, closeSelectService, toggleSelectServiceDialog } = useServices()
    const {
        togglePackagesDialog,
        toggleDisableDialog,
        packageToUpdate,
        packageToDisable,
        openCreatePackageDialog,
        closeCreatePackageDialog,
        openUpdatePackageDialog,
        closeUpdatePackageDialog,
        openDisablePackageDialog,
        closeDisablePackageDialog,
        successPackageCreate,
        successPackageUpdate,
        disablePackage
    } = usePackages()

    const [search, setSearch] = useState('')

    const packagesList = useMemo(() => {
        if (!search) return allPackages || []

        return allPackages.filter((pack) =>
            pack.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [search, allPackages])

    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Paquetes" />

            <ProductsLayout
                header={
                    <HeaderContent
                        titleIcon={<Gift className="w-6 h-6 text-purple-600" />}
                        buttonIcon={<Plus className="w-4 h-4" />}
                        sectionTitle="Paquetes"
                        onOpenModal={openCreatePackageDialog}
                    />
                }
            >
                <PackagesFilters search={search} setSearch={setSearch} />

                {!packagesList || packagesList.length === 0 ? (
                    <EmptyState type="paquetes" onCreate={openCreatePackageDialog} />
                ) : (
                    <PackagesList packages={packagesList} onEdit={openUpdatePackageDialog} onDelete={openDisablePackageDialog} />
                )}
            </ProductsLayout>

            <PackagesFormDialog
                open={togglePackagesDialog}
                onClose={closeCreatePackageDialog}
                package={packageToUpdate}
                openSelectService={toggleSelectServiceDialog}
                onOpenSelectService={openSelectService}
                onCloseSelectService={closeSelectService}
                services={services}
                onSuccessCreate={successPackageCreate}
            // onSuccessUpdate={successPackageUpdate}
            // onOpenDisableDialog={openDisablePackageDialog}
            // onCloseDisableDialog={closeDisablePackageDialog}
            // packageToDisable={packageToDisable}
            // disablePackage={disablePackage}
            />
        </AppLayout>
    )
}