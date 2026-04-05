import AppLayout from "@/layouts/app-layout"
import { Appointment, BreadcrumbItem, SharedData, PaginatedAppointment } from "@/types"
import { Head, usePage } from "@inertiajs/react"
import { useAppointments } from "@/hooks/useAppointments"
import { useMemo, useState } from "react"
import { useAlerts } from "@/hooks/useAlerts"

import HistoryList from "@/components/clients/history/HistoryList"
import HistoryFilters from "@/components/clients/history/HistoryFilters"
import Pagination from "@/components/Pagination"

import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Historial de citas",
        href: "/history",
    },
];

function normalizeDate(date: string) {
    return date.includes("T") ? date.split("T")[0] : date
}


export default function History() {
    const [status, setStatus] = useState("all")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [toggleFilters, setToggleFilters] = useState(false)


    const { appointments } = usePage().props as unknown as {
        appointments: PaginatedAppointment
    }

    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;
    const role = user?.role;

    const getRole = () => {
        if (role === 'cliente') {
            return 'client'
        }

        return role
    }

    console.log(appointments, 'appointments from history')


    const { goToDetails, deleteAppointment } = useAppointments();
    const { errorAlert, successAlert } = useAlerts();

    const handleDeleteAppointment = (appointment: Appointment) => {
        try {
            deleteAppointment(appointment, getRole(), {
                onSuccess: (flash) => {
                    if (flash?.success) {
                        successAlert(flash.success)
                    }

                    if (flash?.error) {
                        errorAlert(flash.error)
                    }
                }
            })
        } catch (error: any) {
            errorAlert(error.message)
        }
    }

    const closeFiltersBar = () => {
        setToggleFilters(false)
    }

    const historyFilteredAppointments = useMemo(() => {
        return appointments.data.filter((appointment) => {
            const appointmentDate = normalizeDate(appointment.date)

            const matchesStatus = status === "all" || appointment.status === status
            const matchesStartDate = startDate === "" || appointmentDate >= startDate
            const matchesEndDate = endDate === "" || appointmentDate <= endDate

            return matchesStatus && matchesStartDate && matchesEndDate
        })
    }, [appointments, status, startDate, endDate])

    const statusOptions = useMemo(() => {
        return Array.from(new Set(appointments.data.map((appointment) => appointment.status)))
    }, [appointments])

    const clearFilters = () => {
        setStatus("all")
        setStartDate("")
        setEndDate("")
    }

    const hasActiveFilters = status !== "all" || startDate !== "" || endDate !== ""

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Historial de citas" />

            <div className="min-h-screen bg-background">
                <div className="container mx-auto max-w-md px-4 py-6 flex flex-col gap-4">
                    <Button
                        onClick={() => setToggleFilters(true)}
                        className="w-1/3"
                    >
                        <SlidersHorizontal />
                        Filtros
                    </Button>

                    <HistoryList
                        appointments={historyFilteredAppointments}
                        goToDetails={goToDetails}
                        onDeleteAppointment={handleDeleteAppointment}
                    />

                    {appointments.data.length > 0 && (
                        <Pagination
                            links={appointments.links}
                            from={appointments.from}
                            to={appointments.to}
                            total={appointments.total}
                        />
                    )}
                </div>
            </div>

            <HistoryFilters
                status={status}
                startDate={startDate}
                endDate={endDate}
                setStatus={setStatus}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                statusOptions={statusOptions}
                clearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
                open={toggleFilters}
                onClose={closeFiltersBar}
            />
        </AppLayout>
    )
}
