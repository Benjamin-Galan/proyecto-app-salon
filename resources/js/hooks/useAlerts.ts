import Swal from "sweetalert2"

export const useAlerts = () => {
    const successAlert = (message: string) => {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: message,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3b82f6',
        })
    }

    const errorAlert = (message: string) => {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: message,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3b82f6',
        })
    }

    const warningAlert = (message: string) => {
        Swal.fire({
            icon: 'warning',
            title: '¡Advertencia!',
            text: message,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3b82f6',
        })
    }

    const infoAlert = (message: string) => {
        Swal.fire({
            icon: 'info',
            title: '¡Información!',
            text: message,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3b82f6',
        })
    }

    return {
        successAlert,
        errorAlert,
        warningAlert,
        infoAlert
    }
}