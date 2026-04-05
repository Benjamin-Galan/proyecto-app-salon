import { Appointment } from "@/types"

import { Card, CardContent } from "@/components/ui/card"

import OptionsMenu from "./OptionsMenu"
import QrCodeSection from "./CardDetails/QrCodeSection"
import SecondaryInfo from "./CardDetails/SecondaryInfo"
import PrimaryInfo from "./CardDetails/PrimaryInfo"
import { Calendar, Coins, User } from "lucide-react"
import { formatDateTime } from "@/utils/formatDateTime"

interface Props {
    appointment: Appointment[]
    type?: "Pendiente" | "Confirmada"
    goToDetails: (id: number, role: string) => void
    onDeleteAppointment: (appointment: Appointment) => void
}

export default function AppointmentCard({ appointment, type, goToDetails, onDeleteAppointment }: Props) {
    const filteredAppointments = appointment.filter((appointment) => appointment.status === type)
    const confirmedAppointments = filteredAppointments.filter((appointment) => appointment.status === "Confirmada")
    const pendingAppointments = filteredAppointments.filter((appointment) => appointment.status === "Pendiente")

    const confirmedAppointment = () => {
        return (
            <div className="flex flex-col gap-4">
                {confirmedAppointments?.map((appointment) => {
                    return (
                        <Card
                            key={appointment.id}
                            className="overflow-hidden border-border dark:border-muted transition-all duration-200 hover:shadow-md hover:border-primary/30 dark:hover:border-primary/40 group bg-card"
                        >
                            <CardContent>
                                <div className="flex items-start">
                                    <QrCodeSection appointment={appointment} />

                                    <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                                        <div className="flex justify-between items-start">
                                            <PrimaryInfo appointment={appointment} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between pt-3 border-t border-border dark:border-muted/50 gap-y-2">
                                    <SecondaryInfo appointment={appointment} />

                                    <div className="flex flex-col items-end gap-2">
                                        <OptionsMenu
                                            appointment={appointment}
                                            appointmentId={appointment.id}
                                            goToDetails={goToDetails}
                                            onDeleteAppointment={onDeleteAppointment}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        )
    }

    const getPendingAppointments = () => {
        return (
            <div className="flex flex-col gap-4">
                {pendingAppointments?.map((appointment) => {
                    return (
                        <Card
                            key={appointment.id}
                            className="overflow-hidden border-border dark:border-muted transition-all duration-200 hover:shadow-md hover:border-primary/30 dark:hover:border-primary/40 group bg-card"
                        >
                            <CardContent>
                                <div className="flex items-center justify-between gap-2">
                                    <div>
                                        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground px-2 py-1 rounded-md">
                                            <Coins className="w-3 h-3 text-primary" />
                                            <span className="font-semibold">Total: {appointment.total}</span>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground px-2 py-1 rounded-md">
                                            <Calendar className="w-3 h-3 text-primary" />
                                            <span className="font-semibold">{formatDateTime(appointment.date)} - {appointment.status}</span>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground px-2 py-1 rounded-md">
                                            <User className="w-3 h-3 text-primary" />
                                            <span className="font-semibold">Estilista: {appointment.employee?.name}</span>
                                        </div>
                                    </div>

                                    <OptionsMenu
                                        appointment={appointment}
                                        appointmentId={appointment.id}
                                        goToDetails={goToDetails}
                                        onDeleteAppointment={onDeleteAppointment}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )
                })

                }
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {confirmedAppointment()}
            {getPendingAppointments()}
        </div>
    )
}