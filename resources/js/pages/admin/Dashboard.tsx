import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { AdminDashboardStats, BreadcrumbItem } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
    Activity,
    ArrowRight,
    CalendarCheck2,
    CalendarClock,
    CheckCircle2,
    CircleDollarSign,
    Clock3,
    TrendingUp,
    UserPlus,
    Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { route } from "ziggy-js";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/admin/dashboard",
    },
];

type DashboardPageProps = {
    stats: AdminDashboardStats;
};

type OverviewCard = {
    title: string;
    value: string;
    description: string;
    icon: LucideIcon;
    iconClassName: string;
    cardClassName: string;
};

export default function Dashboard() {
    const { stats } = usePage<DashboardPageProps>().props;
    const overview = stats.overview;

    const revenueScale = Math.max(...stats.monthly.map((point) => point.revenue), 1);
    const monthlyActivityScale = Math.max(
        ...stats.monthly.map((point) =>
            Math.max(point.newClients, point.attendedClients, point.completedAppointments),
        ),
        1,
    );
    const statusScale = Math.max(...stats.statusBreakdown.map((item) => item.count), 1);

    const overviewCards: OverviewCard[] = [
        {
            title: "Ingresos de hoy",
            value: formatCurrency(overview.revenueToday),
            description: "Solo citas completadas del día actual.",
            icon: CircleDollarSign,
            iconClassName: "text-emerald-600",
            cardClassName: "border-emerald-200/70 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/30",
        },
        {
            title: "Ingresos del mes",
            value: formatCurrency(overview.revenueMonth),
            description: "Facturación acumulada del mes actual.",
            icon: TrendingUp,
            iconClassName: "text-sky-600",
            cardClassName: "border-sky-200/70 bg-sky-50/60 dark:border-sky-900 dark:bg-sky-950/30",
        },
        {
            title: "Clientes nuevos",
            value: String(overview.newClientsMonth),
            description: "Registros creados durante este mes.",
            icon: UserPlus,
            iconClassName: "text-violet-600",
            cardClassName: "border-violet-200/70 bg-violet-50/60 dark:border-violet-900 dark:bg-violet-950/30",
        },
        {
            title: "Clientes atendidos",
            value: String(overview.attendedClientsMonth),
            description: "Clientes únicos con citas completadas este mes.",
            icon: Users,
            iconClassName: "text-amber-600",
            cardClassName: "border-amber-200/70 bg-amber-50/60 dark:border-amber-900 dark:bg-amber-950/30",
        },
        {
            title: "Citas completadas",
            value: String(overview.completedAppointmentsMonth),
            description: "Servicios terminados en el mes actual.",
            icon: CheckCircle2,
            iconClassName: "text-rose-600",
            cardClassName: "border-rose-200/70 bg-rose-50/60 dark:border-rose-900 dark:bg-rose-950/30",
        },
        {
            title: "Ticket promedio",
            value: formatCurrency(overview.averageTicketMonth),
            description: "Promedio por cita completada este mes.",
            icon: Activity,
            iconClassName: "text-cyan-600",
            cardClassName: "border-cyan-200/70 bg-cyan-50/60 dark:border-cyan-900 dark:bg-cyan-950/30",
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:p-8">
                <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard del salón</h1>
                        <p className="text-muted-foreground">
                            Seguimiento rápido de ingresos, clientes y operación del mes actual.
                        </p>
                    </div>

                    <Button asChild variant="outline">
                        <Link href={route("admin.appointments.index")}>
                            Ver citas
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </header>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {overviewCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <Card key={card.title} className={card.cardClassName}>
                                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                    <div className="space-y-1">
                                        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                        <CardDescription>{card.description}</CardDescription>
                                    </div>
                                    <Icon className={`h-5 w-5 ${card.iconClassName}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-semibold tracking-tight">{card.value}</div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid gap-6 xl:grid-cols-5">
                    <Card className="xl:col-span-3">
                        <CardHeader>
                            <CardTitle>Ingresos por mes</CardTitle>
                            <CardDescription>
                                Evolución de los ingresos obtenidos por citas completadas en los últimos 6 meses.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {stats.monthly.map((point) => (
                                <div key={point.month} className="space-y-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-medium">{point.labelLong}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {point.completedAppointments} citas completadas
                                            </p>
                                        </div>
                                        <p className="text-sm font-semibold">{formatCurrency(point.revenue)}</p>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className="h-full rounded-full bg-emerald-500"
                                            style={{ width: `${Math.max((point.revenue / revenueScale) * 100, 6)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="xl:col-span-2">
                        <CardHeader>
                            <CardTitle>Clientes y atención</CardTitle>
                            <CardDescription>
                                Cruce mensual entre captación de clientes y atención real en citas completadas.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {stats.monthly.map((point) => (
                                <div key={point.month} className="rounded-xl border p-4">
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        <p className="font-medium">{point.labelLong}</p>
                                        <Badge variant="outline">{point.label}</Badge>
                                    </div>

                                    <div className="space-y-3">
                                        <MetricRow
                                            label="Clientes nuevos"
                                            value={point.newClients}
                                            scale={monthlyActivityScale}
                                            className="bg-violet-500"
                                        />
                                        <MetricRow
                                            label="Clientes atendidos"
                                            value={point.attendedClients}
                                            scale={monthlyActivityScale}
                                            className="bg-amber-500"
                                        />
                                        <MetricRow
                                            label="Citas completadas"
                                            value={point.completedAppointments}
                                            scale={monthlyActivityScale}
                                            className="bg-sky-500"
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 xl:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Estado general</CardTitle>
                            <CardDescription>Distribución actual de citas y salud operativa.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="grid grid-cols-2 gap-3">
                                <SummaryPill label="Citas hoy" value={overview.appointmentsToday} />
                                <SummaryPill label="Próximas citas" value={overview.upcomingAppointments} />
                                <SummaryPill label="Clientes totales" value={overview.totalClients} />
                                <SummaryPill label="Finalización" value={`${overview.completionRate}%`} />
                            </div>

                            <div className="space-y-3">
                                {stats.statusBreakdown.map((item) => (
                                    <div key={item.status} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>{item.status}</span>
                                            <span className="font-medium">{item.count}</span>
                                        </div>
                                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                                            <div
                                                className={`h-full rounded-full ${getStatusColor(item.status)}`}
                                                style={{ width: `${Math.max((item.count / statusScale) * 100, 6)}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Próximas citas</CardTitle>
                                <CardDescription>Agenda inmediata con citas pendientes o confirmadas.</CardDescription>
                            </div>
                            <CalendarClock className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {stats.upcomingAppointments.length > 0 ? (
                                stats.upcomingAppointments.map((appointment) => (
                                    <AppointmentListItem
                                        key={appointment.id}
                                        appointment={appointment}
                                        href={route("admin.appointments.show", appointment.id)}
                                    />
                                ))
                            ) : (
                                <EmptyState
                                    title="No hay próximas citas"
                                    description="Cuando entren nuevas reservas o confirmaciones aparecerán aquí."
                                />
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Últimas completadas</CardTitle>
                                <CardDescription>Resumen reciente de citas finalizadas y cobradas.</CardDescription>
                            </div>
                            <CalendarCheck2 className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {stats.recentCompletedAppointments.length > 0 ? (
                                stats.recentCompletedAppointments.map((appointment) => (
                                    <AppointmentListItem
                                        key={appointment.id}
                                        appointment={appointment}
                                        href={route("admin.appointments.show", appointment.id)}
                                    />
                                ))
                            ) : (
                                <EmptyState
                                    title="Sin citas completadas"
                                    description="Las citas marcadas como completadas se mostrarán en este panel."
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

function MetricRow({
    label,
    value,
    scale,
    className,
}: {
    label: string;
    value: number;
    scale: number;
    className: string;
}) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                    className={`h-full rounded-full ${className}`}
                    style={{ width: `${Math.max((value / scale) * 100, value > 0 ? 8 : 0)}%` }}
                />
            </div>
        </div>
    );
}

function SummaryPill({ label, value }: { label: string; value: number | string }) {
    return (
        <div className="rounded-xl border bg-muted/40 p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
            <p className="mt-1 text-xl font-semibold">{value}</p>
        </div>
    );
}

function AppointmentListItem({
    appointment,
    href,
}: {
    appointment: AdminDashboardStats["upcomingAppointments"][number];
    href: string;
}) {
    return (
        <Link
            href={href}
            className="block rounded-xl border p-3 transition-colors hover:bg-accent/60"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                    <p className="font-medium">{appointment.user?.name ?? "Cliente"}</p>
                    <p className="text-sm text-muted-foreground">
                        {formatAppointmentDate(appointment.date)} · {appointment.time.slice(0, 5)}
                    </p>
                    {appointment.employee?.name ? (
                        <p className="text-xs text-muted-foreground">Especialista: {appointment.employee.name}</p>
                    ) : null}
                </div>

                <div className="text-right">
                    <Badge variant={getStatusVariant(appointment.status)}>{appointment.status}</Badge>
                    <p className="mt-2 text-sm font-semibold">{formatCurrency(appointment.total)}</p>
                </div>
            </div>
        </Link>
    );
}

function EmptyState({ title, description }: { title: string; description: string }) {
    return (
        <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed px-6 py-8 text-center">
            <Clock3 className="mb-3 h-8 w-8 text-muted-foreground" />
            <p className="font-medium">{title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
    );
}

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("es-NI", {
        style: "currency",
        currency: "NIO",
    })
        .format(amount)
        .replace("NIO", "C$");
}

function formatAppointmentDate(date: string) {
    const parsed = new Date(date.includes("T") ? date : `${date}T00:00:00`);

    if (Number.isNaN(parsed.getTime())) {
        return date;
    }

    return format(parsed, "d MMM yyyy", { locale: es });
}

function getStatusVariant(status: string): "default" | "outline" | "secondary" | "destructive" {
    switch (status) {
        case "Confirmada":
            return "default";
        case "Completada":
            return "secondary";
        case "Cancelada":
            return "destructive";
        default:
            return "outline";
    }
}

function getStatusColor(status: string) {
    switch (status) {
        case "Confirmada":
            return "bg-sky-500";
        case "Completada":
            return "bg-emerald-500";
        case "Cancelada":
            return "bg-rose-500";
        default:
            return "bg-amber-500";
    }
}
