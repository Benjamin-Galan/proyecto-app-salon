import { Card, CardContent } from "@/components/ui/card"
import OptionsMenu from "../appointments/OptionsMenu"
import { formatDateTime } from "@/utils/formatDateTime"

import { Appointment } from "@/types"
import { Calendar, Coins, User } from "lucide-react"

interface Props {
    appointments: Appointment[]
    goToDetails: (id: number, role: string) => void
    onDeleteAppointment: (appointment: Appointment) => void
}

const HistoryList = ({ appointments, goToDetails, onDeleteAppointment }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            {appointments?.map((appointment) => {
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

export default HistoryList
