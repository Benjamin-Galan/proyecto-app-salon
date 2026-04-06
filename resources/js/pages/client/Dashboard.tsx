import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types"
import { Head, usePage, Link, router } from "@inertiajs/react"
import {
    Calendar,
    BadgeCent,
    CheckCircle2,
    Clock,
    ArrowRight,
    Plus,
    History,
    User,
    Scissors,
    Sparkles,
    CalendarCheck
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { route } from "ziggy-js"

interface DashboardProps {
    totalAppointments: number;
    upcomingAppointments: number;
    totalSpent: number;
    nextAppointment: any;
    recentAppointments: any[];
    auth: {
        user: {
            name: string;
        }
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/client/dashboard",
    },
];

export default function Dashboard() {
    const { totalAppointments, upcomingAppointments, totalSpent, nextAppointment, recentAppointments, auth } = usePage<any>().props as DashboardProps;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-NI', {
            style: 'currency',
            currency: 'NIO',
        }).format(amount).replace('NIO', 'C$');
    };

    const parseSafeDate = (dateString: string) => {
        if (!dateString) return new Date();
        if (dateString.includes('T') || dateString.includes(' ')) {
            const d = new Date(dateString);
            return isNaN(d.getTime()) ? new Date() : d;
        }
        const d = new Date(`${dateString}T00:00:00`);
        return isNaN(d.getTime()) ? new Date() : d;
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Confirmada': return 'default';
            case 'Pendiente': return 'outline';
            case 'Completada': return 'secondary';
            case 'Cancelada': return 'destructive';
            default: return 'outline';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6 p-4 md:p-8 max-w-5xl mx-auto">
                {/* Header Section */}
                <header className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">Hola, {auth.user.name.split(' ')[0]}! 👋</h1>
                    <p className="text-muted-foreground">Aquí tienes un resumen de tu actividad en el salón.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="overflow-hidden border-none bg-gradient-to-br from-blue-500/10 to-blue-500/5 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Citas Totales</CardTitle>
                            <Calendar className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalAppointments}</div>
                            <p className="text-xs text-muted-foreground">En todo tu historial</p>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-none bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Próximas Citas</CardTitle>
                            <Clock className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{upcomingAppointments}</div>
                            <p className="text-xs text-muted-foreground">Pendientes o confirmadas</p>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-none bg-gradient-to-br from-amber-500/10 to-amber-500/5 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Invertido</CardTitle>
                            <BadgeCent className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
                            <p className="text-xs text-muted-foreground">Solo citas completadas</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    {/* Next Appointment Card */}
                    <Card className="md:col-span-1 lg:col-span-4 shadow-md border-primary/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                Próxima Visita
                            </CardTitle>
                            <CardDescription>
                                Detalles de tu siguiente cita agendada.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {nextAppointment ? (
                                <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-accent/50 border">
                                        <div className="flex items-center gap-4">
                                            <div className="flex flex-col items-center justify-center h-16 w-16 rounded-lg bg-primary text-primary-foreground shadow-lg">
                                                <span className="text-xs font-semibold uppercase">{format(parseSafeDate(nextAppointment.date), 'MMM', { locale: es })}</span>
                                                <span className="text-2xl font-bold">{format(parseSafeDate(nextAppointment.date), 'dd')}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">{nextAppointment.time.substring(0, 5)}</h3>
                                                <p className="text-sm text-muted-foreground capitalize">
                                                    {format(parseSafeDate(nextAppointment.date), 'EEEE, d MMMM', { locale: es })}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge className="w-fit" variant={getStatusVariant(nextAppointment.status)}>
                                            {nextAppointment.status}
                                        </Badge>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-1">
                                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Servicios</p>
                                            <ul className="text-sm space-y-1">
                                                {nextAppointment.items?.map((item: any) => (
                                                    <li key={item.id} className="flex items-center gap-2">
                                                        <div className="h-1 w-1 rounded-full bg-primary" />
                                                        {item.item?.name || 'Servicio'}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {nextAppointment.employee && (
                                            <div className="space-y-1">
                                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Atendido por</p>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    {nextAppointment.employee.name}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <Button asChild className="w-full sm:w-auto shadow-indigo-200 shadow-md">
                                        <Link href={route('client.appointments.details', nextAppointment.id)}>
                                            Revisar los detalles
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 rounded-xl border border-dashed">
                                    <div className="p-3 rounded-full bg-muted">
                                        <CalendarCheck className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-medium text-muted-foreground">No tienes citas próximas</p>
                                        <p className="text-xs text-muted-foreground max-w-[200px]">¡Anímate a consentirte hoy mismo!</p>
                                    </div>
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={route('client.scheduling.index')}>
                                            Agendar ahora
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="md:col-span-1 lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Acciones Rápidas</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            <Button asChild variant="outline" className="justify-start h-auto py-3 px-4 group">
                                <Link href={route('client.scheduling.index')} className="w-full flex items-center">
                                    <div className="mr-3 p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <Plus className="h-4 w-4" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-semibold text-sm">Nueva Cita</div>
                                        <div className="text-xs text-muted-foreground">Reserva tu espacio</div>
                                    </div>
                                    <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="justify-start h-auto py-3 px-4 group">
                                <Link href={route('client.history.index')} className="w-full flex items-center">
                                    <div className="mr-3 p-2 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                        <History className="h-4 w-4" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-semibold text-sm">Mi Historial</div>
                                        <div className="text-xs text-muted-foreground">Ver citas pasadas</div>
                                    </div>
                                    <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="justify-start h-auto py-3 px-4 group">
                                <Link href={route('profile.edit')} className="w-full flex items-center">
                                    <div className="mr-3 p-2 rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-semibold text-sm">Mi Perfil</div>
                                        <div className="text-xs text-muted-foreground">Ajustes de cuenta</div>
                                    </div>
                                    <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Actividad Reciente</CardTitle>
                            <CardDescription>Tus últimos movimientos en el salón.</CardDescription>
                        </div>
                        <Button asChild variant="ghost" size="sm">
                            <Link href={route('client.history.index')}>Ver todo</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentAppointments.length > 0 ? (
                                recentAppointments.map((appointment) => (
                                    <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors border-transparent border hover:border-accent">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 rounded-full bg-secondary">
                                                <Scissors className="h-4 w-4 text-secondary-foreground" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {appointment.items?.[0]?.item?.name || 'Servicio de salón'}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {format(parseSafeDate(appointment.date), 'd MMM, yyyy', { locale: es })}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge variant={getStatusVariant(appointment.status)}>
                                            {appointment.status}
                                        </Badge>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center py-6 text-sm text-muted-foreground">No hay actividad reciente para mostrar.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}