import { Appointment, AppointmentRequestPayload } from "@/types"
import { useState } from "react"
import { router } from "@inertiajs/react"
import { route } from "ziggy-js";

type AppointmentFlash = {
    success?: string
    error?: string
    warning?: string
}

export const useAppointments = () => {
    const [toggleDetailsDialog, setToggleDetailsDialog] = useState(false)
    const [toggleEditDialog, setToggleEditDialog] = useState(false)
    const [toggleConfirmDialog, setToggleConfirmDialog] = useState(false)
    const [toggleCancelDialog, setToggleCancelDialog] = useState(false)
    const [toggleCompleteDialog, setToggleCompleteDialog] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    const [appointment, setAppointment] = useState<Appointment>({} as Appointment)

    const closeDetailsDialog = () => setToggleDetailsDialog(false)
    const openDetailsDialog = () => setToggleDetailsDialog(true)

    const closeEditDialog = () => setToggleEditDialog(false)
    const openEditDialog = () => setToggleEditDialog(true)

    const closeCancelDialog = () => setToggleCancelDialog(false)
    const closeConfirmDialog = () => setToggleConfirmDialog(false)
    const closeCompleteDialog = () => setToggleCompleteDialog(false)

    const goToDetails = (id: number, role: string = 'admin') => {
        if (role === 'admin') {
            router.get(route('admin.appointments.show', id))
        } else {
            router.get(route('client.appointments.details', id))
        }
    }

    const openConfirmDialog = (appointment: Appointment) => {
        if (!appointment) {
            throw new Error('No se ha seleccionado ninguna cita')
        }

        if (appointment.status === 'confirmed') {
            throw new Error('La cita ya esta confirmada')
        }

        setAppointment(appointment)
        setToggleConfirmDialog(true)
    }


    const openCancelDialog = (appointment: Appointment) => {
        if (!appointment) {
            throw new Error('No se ha seleccionado ninguna cita')
        }

        if (appointment.status === 'cancelled') {
            throw new Error('La cita ya esta cancelada')
        }

        setAppointment(appointment)
        setToggleCancelDialog(true)
    }

    const openCompleteDialog = (appointment: Appointment) => {
        if (!appointment) {
            throw new Error('No se ha seleccionado ninguna cita')
        }

        if (appointment.status === 'completed') {
            throw new Error('La cita ya esta completada')
        }

        setAppointment(appointment)
        setToggleCompleteDialog(true)
    }

    const confirmAppointment = (
        appointment: Appointment,
        options?: {
            onSuccess?: (flash?: AppointmentFlash) => void
        }
    ) => {
        router.put(route('admin.appointments.confirm', appointment.id), {}, {
            onSuccess: (page) => {
                closeConfirmDialog()

                const flash = (page.props as { flash?: AppointmentFlash }).flash
                options?.onSuccess?.(flash)
            }
        })
    }

    const completeAppointment = (
        appointment: Appointment,
        options?: {
            onSuccess?: (flash?: AppointmentFlash) => void
        }
    ) => {
        router.put(route('admin.appointments.complete', appointment.id), {}, {
            onSuccess: (page) => {
                closeConfirmDialog()

                const flash = (page.props as { flash?: AppointmentFlash }).flash
                options?.onSuccess?.(flash)
            }
        })
    }

    const cancelAppointment = (
        appointment: Appointment,
        options?: {
            onSuccess?: (flash?: AppointmentFlash) => void
        }
    ) => {
        router.put(route('admin.appointments.cancel', appointment.id), {}, {
            onSuccess: (page) => {
                closeCancelDialog()

                const flash = (page.props as { flash?: AppointmentFlash }).flash
                options?.onSuccess?.(flash)
            }
        })
    }

    const deleteAppointment = (
        appointment: Appointment,
        role: string,
        options?: {
            onSuccess?: (flash?: AppointmentFlash) => void
        }
    ) => {
        router.delete(route(`${role}.appointments.destroy`, appointment.id), {
            onSuccess: (page) => {
                closeCancelDialog()

                const flash = (page.props as { flash?: AppointmentFlash }).flash
                options?.onSuccess?.(flash)
            }
        })
    }

    const createAppointment = (
        payload: AppointmentRequestPayload,
        clearDraft?: () => void,
        options?: {
            onSuccess?: (flash?: AppointmentFlash) => void
        }
    ) => {
        setIsProcessing(true)

        router.post(route('client.scheduling.store'), payload, {
            onSuccess: (page) => {
                if (clearDraft) {
                    clearDraft()
                }

                const flash = (page.props as { flash?: AppointmentFlash }).flash
                options?.onSuccess?.(flash)
            },
            onFinish: () => {
                setIsProcessing(false)
            }
        })
    }

    return {
        toggleDetailsDialog,
        setToggleDetailsDialog,
        closeDetailsDialog,
        openDetailsDialog,

        toggleEditDialog,
        setToggleEditDialog,
        closeEditDialog,
        openEditDialog,

        toggleConfirmDialog,
        setToggleConfirmDialog,
        closeConfirmDialog,
        openConfirmDialog,

        toggleCancelDialog,
        setToggleCancelDialog,
        closeCancelDialog,
        openCancelDialog,

        toggleCompleteDialog,
        setToggleCompleteDialog,
        closeCompleteDialog,
        openCompleteDialog,

        goToDetails,
        confirmAppointment,
        cancelAppointment,
        completeAppointment,
        deleteAppointment,
        createAppointment,

        appointment,
        isProcessing
    }
}
