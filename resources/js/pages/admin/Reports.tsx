import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { AdminReportsStats, BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
    BarChart3,
    Download,
    FileSpreadsheet,
    FileText,
    Filter,
    Trophy,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import * as XLSX from 'xlsx';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reportes',
        href: '/admin/reports',
    },
];

const statusColors: Record<string, string> = {
    Pendiente: '#f59e0b',
    Confirmada: '#0ea5e9',
    Completada: '#10b981',
    Cancelada: '#ef4444',
};

type ReportsPageProps = {
    reports: AdminReportsStats;
};

export default function Reports() {
    const { reports } = usePage<ReportsPageProps>().props;
    const [startDate, setStartDate] = useState(reports.filters.startDate);
    const [endDate, setEndDate] = useState(reports.filters.endDate);
    const [isExportingPdf, setIsExportingPdf] = useState(false);

    useEffect(() => {
        setStartDate(reports.filters.startDate);
        setEndDate(reports.filters.endDate);
    }, [reports.filters.endDate, reports.filters.startDate]);

    const handleApplyFilters = () => {
        router.get(
            route('admin.reports.index'),
            {
                start_date: startDate,
                end_date: endDate,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const handleExportExcel = () => {
        const workbook = XLSX.utils.book_new();

        const overviewRows = [
            ['Metrica', 'Valor'],
            ['Citas en rango', reports.overview.totalAppointments],
            ['Citas activas', reports.overview.activeAppointments],
            ['Citas completadas', reports.overview.completedAppointments],
            ['Clientes unicos', reports.overview.uniqueClients],
            ['Ingresos', reports.overview.totalRevenue],
            ['Ticket promedio', reports.overview.averageTicket],
            ['Tasa de finalizacion', reports.overview.completionRate],
        ];

        XLSX.utils.book_append_sheet(
            workbook,
            XLSX.utils.aoa_to_sheet(overviewRows),
            'Resumen',
        );
        XLSX.utils.book_append_sheet(
            workbook,
            XLSX.utils.json_to_sheet(reports.dailySeries),
            'Serie diaria',
        );
        XLSX.utils.book_append_sheet(
            workbook,
            XLSX.utils.json_to_sheet(reports.appointmentTypeBreakdown),
            'Tipos',
        );
        XLSX.utils.book_append_sheet(
            workbook,
            XLSX.utils.json_to_sheet(reports.topItems),
            'Top items',
        );
        XLSX.utils.book_append_sheet(
            workbook,
            XLSX.utils.json_to_sheet(reports.topClients),
            'Top clientes',
        );
        XLSX.utils.book_append_sheet(
            workbook,
            XLSX.utils.json_to_sheet(reports.appointments),
            'Citas',
        );

        XLSX.writeFile(
            workbook,
            `reportes-${reports.filters.startDate}-a-${reports.filters.endDate}.xlsx`,
        );
    };

    const handleExportPdf = async () => {
        setIsExportingPdf(true);

        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const generatedAt = format(new Date(), 'd MMM yyyy HH:mm', {
                locale: es,
            });

            pdf.setFontSize(18);
            pdf.text('Reporte del salon', 14, 18);

            pdf.setFontSize(11);
            pdf.setTextColor(90, 90, 90);
            pdf.text(
                `Rango: ${formatDate(reports.filters.startDate)} al ${formatDate(reports.filters.endDate)}`,
                14,
                26,
            );
            pdf.text(`Generado: ${generatedAt}`, 14, 32);

            autoTable(pdf, {
                startY: 38,
                head: [['Resumen', 'Valor']],
                body: [
                    [
                        'Citas en rango',
                        String(reports.overview.totalAppointments),
                    ],
                    [
                        'Citas activas',
                        String(reports.overview.activeAppointments),
                    ],
                    [
                        'Citas completadas',
                        String(reports.overview.completedAppointments),
                    ],
                    ['Clientes unicos', String(reports.overview.uniqueClients)],
                    ['Ingresos', formatCurrency(reports.overview.totalRevenue)],
                    [
                        'Ticket promedio',
                        formatCurrency(reports.overview.averageTicket),
                    ],
                    [
                        'Tasa de finalizacion',
                        `${reports.overview.completionRate}%`,
                    ],
                ],
                theme: 'grid',
                headStyles: { fillColor: [14, 165, 233] },
                styles: { fontSize: 10, cellPadding: 2.5 },
            });

            autoTable(pdf, {
                startY: (pdf as jsPDF & { lastAutoTable?: { finalY?: number } })
                    .lastAutoTable?.finalY
                    ? ((pdf as jsPDF & { lastAutoTable?: { finalY?: number } })
                          .lastAutoTable?.finalY ?? 38) + 8
                    : 38,
                head: [['Tipo', 'Cantidad', 'Ingresos']],
                body: reports.appointmentTypeBreakdown.map((item) => [
                    item.label,
                    String(item.count),
                    formatCurrency(item.revenue),
                ]),
                theme: 'striped',
                headStyles: { fillColor: [245, 158, 11] },
                styles: { fontSize: 10, cellPadding: 2.5 },
            });

            autoTable(pdf, {
                startY: (pdf as jsPDF & { lastAutoTable?: { finalY?: number } })
                    .lastAutoTable?.finalY
                    ? ((pdf as jsPDF & { lastAutoTable?: { finalY?: number } })
                          .lastAutoTable?.finalY ?? 38) + 8
                    : 38,
                head: [['Cliente', 'Citas', 'Total gastado', 'Ultima cita']],
                body: reports.topClients.map((client) => [
                    client.name,
                    String(client.appointments),
                    formatCurrency(client.totalSpent),
                    client.lastAppointmentDate
                        ? formatDate(client.lastAppointmentDate)
                        : '-',
                ]),
                theme: 'striped',
                headStyles: { fillColor: [16, 185, 129] },
                styles: { fontSize: 10, cellPadding: 2.5 },
            });

            autoTable(pdf, {
                startY: (pdf as jsPDF & { lastAutoTable?: { finalY?: number } })
                    .lastAutoTable?.finalY
                    ? ((pdf as jsPDF & { lastAutoTable?: { finalY?: number } })
                          .lastAutoTable?.finalY ?? 38) + 8
                    : 38,
                head: [['Cliente', 'Fecha', 'Especialista', 'Estado', 'Total']],
                body: reports.appointments.map((appointment) => [
                    appointment.user?.name ?? 'Cliente',
                    `${formatDate(appointment.date)} ${appointment.time.slice(0, 5)}`,
                    appointment.employee?.name ?? '-',
                    appointment.status,
                    formatCurrency(appointment.total),
                ]),
                theme: 'striped',
                headStyles: { fillColor: [99, 102, 241] },
                styles: { fontSize: 9, cellPadding: 2.5 },
                margin: { bottom: 16 },
                didDrawPage: () => {
                    pdf.setFontSize(9);
                    pdf.setTextColor(120, 120, 120);
                    pdf.text(
                        `Pagina ${pdf.getNumberOfPages()}`,
                        pageWidth - 28,
                        pdf.internal.pageSize.getHeight() - 8,
                    );
                },
            });

            pdf.save(
                `reportes-${reports.filters.startDate}-a-${reports.filters.endDate}.pdf`,
            );
        } finally {
            setIsExportingPdf(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reportes" />

            <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:p-8">
                <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Reportes del salon
                        </h1>
                        <p className="text-muted-foreground">
                            Analiza citas, clientes e ingresos dentro del rango
                            seleccionado.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" onClick={handleExportExcel}>
                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                            Exportar Excel
                        </Button>
                        <Button
                            onClick={handleExportPdf}
                            disabled={isExportingPdf}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            {isExportingPdf
                                ? 'Generando PDF...'
                                : 'Exportar PDF'}
                        </Button>
                    </div>
                </header>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filtros de fechas
                        </CardTitle>
                        <CardDescription>
                            Puedes consultar cualquier rango y exportar el
                            resultado tal como se muestra.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 md:flex-row md:items-end">
                        <div className="grid gap-2">
                            <Label htmlFor="start-date">Fecha inicial</Label>
                            <Input
                                id="start-date"
                                type="date"
                                value={startDate}
                                onChange={(event) =>
                                    setStartDate(event.target.value)
                                }
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="end-date">Fecha final</Label>
                            <Input
                                id="end-date"
                                type="date"
                                value={endDate}
                                onChange={(event) =>
                                    setEndDate(event.target.value)
                                }
                            />
                        </div>

                        <Button onClick={handleApplyFilters}>
                            <Download className="mr-2 h-4 w-4" />
                            Aplicar rango
                        </Button>

                        <p className="text-sm text-muted-foreground">
                            Ventana actual: {reports.filters.days} dias
                        </p>
                    </CardContent>
                </Card>

                <div className="space-y-6 rounded-2xl bg-background">
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                        <ReportStatCard
                            title="Citas en rango"
                            value={String(reports.overview.totalAppointments)}
                            description="Todas las citas dentro del rango."
                        />
                        <ReportStatCard
                            title="Completadas"
                            value={String(
                                reports.overview.completedAppointments,
                            )}
                            description="Citas cerradas con exito."
                        />
                        <ReportStatCard
                            title="Clientes unicos"
                            value={String(reports.overview.uniqueClients)}
                            description="Clientes con citas no canceladas."
                        />
                        <ReportStatCard
                            title="Ingresos"
                            value={formatCurrency(
                                reports.overview.totalRevenue,
                            )}
                            description="Solo citas completadas."
                        />
                        <ReportStatCard
                            title="Ticket promedio"
                            value={formatCurrency(
                                reports.overview.averageTicket,
                            )}
                            description={`Finalizacion ${reports.overview.completionRate}%`}
                        />
                    </div>

                    <div className="grid gap-6 xl:grid-cols-3">
                        <Card className="xl:col-span-2">
                            <CardHeader>
                                <CardTitle>Ingresos y citas por dia</CardTitle>
                                <CardDescription>
                                    Evolucion diaria del rango seleccionado.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[320px]">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <LineChart data={reports.dailySeries}>
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                                opacity={0.15}
                                            />
                                            <XAxis
                                                dataKey="label"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={10}
                                            />
                                            <YAxis
                                                yAxisId="left"
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) =>
                                                    formatCompactCurrency(
                                                        Number(value),
                                                    )
                                                }
                                                width={70}
                                            />
                                            <YAxis
                                                yAxisId="right"
                                                orientation="right"
                                                tickLine={false}
                                                axisLine={false}
                                                allowDecimals={false}
                                            />
                                            <Tooltip
                                                formatter={(value, name) => {
                                                    if (name === 'revenue') {
                                                        return [
                                                            formatCurrency(
                                                                Number(value),
                                                            ),
                                                            'Ingresos',
                                                        ];
                                                    }

                                                    return [
                                                        String(value),
                                                        'Citas activas',
                                                    ];
                                                }}
                                                labelFormatter={(
                                                    _,
                                                    payload,
                                                ) => {
                                                    const point =
                                                        payload?.[0]?.payload;

                                                    return point?.date
                                                        ? formatDate(point.date)
                                                        : '';
                                                }}
                                            />
                                            <Legend />
                                            <Bar
                                                yAxisId="right"
                                                dataKey="appointments"
                                                name="Citas activas"
                                                fill="#94a3b8"
                                                radius={[6, 6, 0, 0]}
                                            />
                                            <Line
                                                yAxisId="left"
                                                type="monotone"
                                                dataKey="revenue"
                                                name="Ingresos"
                                                stroke="#0ea5e9"
                                                strokeWidth={3}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Estado de citas</CardTitle>
                                <CardDescription>
                                    Distribucion dentro del rango actual.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[320px]">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <PieChart>
                                            <Pie
                                                data={reports.statusBreakdown}
                                                dataKey="count"
                                                nameKey="status"
                                                innerRadius={65}
                                                outerRadius={100}
                                                paddingAngle={3}
                                            >
                                                {reports.statusBreakdown.map(
                                                    (item) => (
                                                        <Cell
                                                            key={item.status}
                                                            fill={
                                                                statusColors[
                                                                    item.status
                                                                ] ?? '#64748b'
                                                            }
                                                        />
                                                    ),
                                                )}
                                            </Pie>
                                            <Tooltip
                                                formatter={(value) => [
                                                    String(value),
                                                    'Citas',
                                                ]}
                                            />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    Citas por tipo
                                </CardTitle>
                                <CardDescription>
                                    No se incluyen citas canceladas.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart
                                            data={
                                                reports.appointmentTypeBreakdown
                                            }
                                        >
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                                opacity={0.15}
                                            />
                                            <XAxis
                                                dataKey="label"
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                tickLine={false}
                                                axisLine={false}
                                                allowDecimals={false}
                                            />
                                            <Tooltip
                                                formatter={(value, name) => {
                                                    if (name === 'revenue') {
                                                        return [
                                                            formatCurrency(
                                                                Number(value),
                                                            ),
                                                            'Ingresos',
                                                        ];
                                                    }

                                                    return [
                                                        String(value),
                                                        'Cantidad',
                                                    ];
                                                }}
                                            />
                                            <Legend />
                                            <Bar
                                                dataKey="count"
                                                name="Cantidad"
                                                fill="#f59e0b"
                                                radius={[6, 6, 0, 0]}
                                            />
                                            <Bar
                                                dataKey="revenue"
                                                name="Ingresos"
                                                fill="#10b981"
                                                radius={[6, 6, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Trophy className="h-5 w-5" />
                                    Top clientes frecuentes
                                </CardTitle>
                                <CardDescription>
                                    Clientes con mas citas completadas dentro
                                    del rango.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead>Citas</TableHead>
                                            <TableHead>Total gastado</TableHead>
                                            <TableHead>Ultima cita</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {reports.topClients.length > 0 ? (
                                            reports.topClients.map((client) => (
                                                <TableRow
                                                    key={`${client.id ?? client.name}`}
                                                >
                                                    <TableCell className="font-medium">
                                                        {client.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {client.appointments}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formatCurrency(
                                                            client.totalSpent,
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {client.lastAppointmentDate
                                                            ? formatDate(
                                                                  client.lastAppointmentDate,
                                                              )
                                                            : '-'}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={4}
                                                    className="py-8 text-center text-muted-foreground"
                                                >
                                                    No hay clientes frecuentes
                                                    en este rango.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Items mas solicitados</CardTitle>
                                <CardDescription>
                                    Servicios, promociones o paquetes con mayor
                                    demanda.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nombre</TableHead>
                                            <TableHead>Tipo</TableHead>
                                            <TableHead>Cantidad</TableHead>
                                            <TableHead>
                                                Ingreso estimado
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {reports.topItems.length > 0 ? (
                                            reports.topItems.map((item) => (
                                                <TableRow
                                                    key={`${item.type}-${item.name}`}
                                                >
                                                    <TableCell className="font-medium">
                                                        {item.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.typeLabel}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.count}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formatCurrency(
                                                            item.revenue,
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={4}
                                                    className="py-8 text-center text-muted-foreground"
                                                >
                                                    No hay items registrados
                                                    para este rango.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Ultimas citas del rango
                                </CardTitle>
                                <CardDescription>
                                    Ultimos movimientos para seguimiento rapido.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Especialista</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {reports.appointments.length > 0 ? (
                                            reports.appointments.map(
                                                (appointment) => (
                                                    <TableRow
                                                        key={appointment.id}
                                                    >
                                                        <TableCell className="font-medium">
                                                            {appointment.user
                                                                ?.name ??
                                                                'Cliente'}
                                                        </TableCell>
                                                        <TableCell>
                                                            {formatDate(
                                                                appointment.date,
                                                            )}{' '}
                                                            {appointment.time.slice(
                                                                0,
                                                                5,
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {appointment
                                                                .employee
                                                                ?.name ?? '-'}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant={getStatusVariant(
                                                                    appointment.status,
                                                                )}
                                                            >
                                                                {
                                                                    appointment.status
                                                                }
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            {formatCurrency(
                                                                appointment.total,
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ),
                                            )
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={5}
                                                    className="py-8 text-center text-muted-foreground"
                                                >
                                                    No hay citas para este
                                                    rango.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function ReportStatCard({
    title,
    value,
    description,
}: {
    title: string;
    value: string;
    description: string;
}) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-semibold tracking-tight">
                    {value}
                </div>
            </CardContent>
        </Card>
    );
}

function formatCurrency(amount: number) {
    return new Intl.NumberFormat('es-NI', {
        style: 'currency',
        currency: 'NIO',
    })
        .format(amount)
        .replace('NIO', 'C$');
}

function formatCompactCurrency(amount: number) {
    return new Intl.NumberFormat('es-NI', {
        style: 'currency',
        currency: 'NIO',
        notation: 'compact',
        maximumFractionDigits: 1,
    })
        .format(amount)
        .replace('NIO', 'C$');
}

function formatDate(date: string) {
    const parsed = new Date(date.includes('T') ? date : `${date}T00:00:00`);

    if (Number.isNaN(parsed.getTime())) {
        return date;
    }

    return format(parsed, 'd MMM yyyy', { locale: es });
}

function getStatusVariant(
    status: string,
): 'default' | 'outline' | 'secondary' | 'destructive' {
    switch (status) {
        case 'Confirmada':
            return 'default';
        case 'Completada':
            return 'secondary';
        case 'Cancelada':
            return 'destructive';
        default:
            return 'outline';
    }
}
