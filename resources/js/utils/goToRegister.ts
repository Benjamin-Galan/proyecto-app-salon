import { router } from "@inertiajs/react"

export function gotoRegister() {
    const handleNavigate = () => {
        router.visit("register")
    }

    return {
        handleNavigate
    }
}