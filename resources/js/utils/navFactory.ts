import { LayoutGrid, NotebookPen, Scissors, Percent, Gift, Users, BellRing, ClipboardMinus } from "lucide-react";
import type { NavItem } from "@/types";

export function getMainNavItemsByRole(role: 'admin' | 'cliente'): NavItem[] {
    const admin: NavItem[] = [
        { title: "Dashboard", href: "/admin/dashboard", icon: LayoutGrid },
        { title: "Citas", href: "/admin/appointments", icon: NotebookPen },
        { title: "Servicios", href: "/admin/services", icon: Scissors },
        { title: "Promociones", href: "/admin/promotions", icon: Percent },
        { title: "Paquetes", href: "/admin/packages", icon: Gift },
        { title: "Personal", href: "/admin/staff", icon: Users },
        { title: "Notificaciones", href: "/admin/notifications", icon: BellRing },
        { title: "Reportes", href: "/admin/reports", icon: ClipboardMinus },
    ]

    const client: NavItem[] = [
        { title: "Dashboard", href: "/client/dashboard", icon: LayoutGrid },
        { title: "Agendamiento", href: "/client/services", icon: NotebookPen },
        { title: "Mis citas", href: "/client/appointments", icon: Percent },
        { title: "Notificaciones", href: "/client/notifications", icon: Gift },
    ];

    return role === "admin" ? admin : client;
}
