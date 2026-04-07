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
import { useAlerts } from "@/hooks/useAlerts";
import DeletePackageDialog from "@/components/packages/DeletePackageDialog"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Paquetes",
        href: "/packages",
    },
]

export default function PackagesPage() {
    const { services = [], allPackages = [] } = usePage().props as { services?: Service[], allPackages?: Package[] }
    const { openSelectService, closeSelectService, toggleSelectServiceDialog } = useServices()
    const { warningAlert, errorAlert, successAlert } = useAlerts()
    const {
        togglePackagesDialog,
        toggleDisableDialog,
        closeDisablePackageDialog,
        packageToDisable,
        packageToUpdate,
        openCreatePackageDialog,
        closeCreatePackageDialog,
        openUpdatePackageDialog,
        openDisablePackageDialog,
        successPackageCreate,
        disablePackage
    } = usePackages()

    const [search, setSearch] = useState('')

    const packagesList = useMemo(() => {
        if (!search) return allPackages || []

        return allPackages.filter((pack) =>
            pack.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [search, allPackages])

    const handleDisablePackage = (pack: Package) => {
        try {
            disablePackage(pack, {
                onSuccess: (flash) => {
                    if (flash?.success) {
                        successAlert(flash.success)
                    }

                    if (flash?.error) {
                        warningAlert(flash.error)
                    }
                }
            })
        } catch (error: any) {
            errorAlert(error.message)
        }
    }

    const handleOpenDisableDialog = (pack: Package) => {
        try {
            openDisablePackageDialog(pack)
        } catch (error: any) {
            warningAlert(error.message)
        }
    }

    const mayShowActionButton = useMemo(() => {
        return packagesList.length > 0
    }, [packagesList])

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
                        showActionButtons={mayShowActionButton}
                    />
                }
            >
                <PackagesFilters search={search} setSearch={setSearch} />

                {!packagesList || packagesList.length === 0 ? (
                    <EmptyState type="paquetes" onCreate={openCreatePackageDialog} />
                ) : (
                    <PackagesList packages={packagesList} onEdit={openUpdatePackageDialog} onDelete={handleOpenDisableDialog} />
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
            />

            <DeletePackageDialog
                open={toggleDisableDialog}
                onOpenChange={closeDisablePackageDialog}
                onConfirm={handleDisablePackage}
                pack={packageToDisable}
            />
        </AppLayout>
    )
}