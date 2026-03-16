import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Appointment } from "@/types";

interface Props {
    appointment: Appointment;
}

export default function ClientCalendar({ appointment }: Props) {
    return (
        <Card className="border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:sticky lg:top-6">
            <CardHeader>
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-center">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        Fecha programada
                    </p>
                    <p className="text-lg font-bold text-blue-900 dark:text-blue-100 mt-1 capitalize">
                        {new Date(appointment?.date).toLocaleDateString("es-ES", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
            </CardHeader>

            <CardContent>
                <Calendar
                    mode="single"
                    selected={new Date(appointment.date)}
                    disabled={[new Date()]}
                    className="flex w-full justify-center rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                />
            </CardContent>
        </Card>
    )
}
