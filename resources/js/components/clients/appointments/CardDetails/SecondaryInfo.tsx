import { Appointment } from "@/types"
import { formatDate, formatTime } from "@/utils/formatDateTime"
import { Calendar, Clock, Timer } from "lucide-react"

interface SecondaryInfoProps {
    appointment: Appointment
}

const SecondaryInfo = ({ appointment }: SecondaryInfoProps) => {
    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-muted/30 px-2 py-1 rounded-md">
                <Calendar className="w-3 h-3 text-primary" />
                <span className="font-semibold">{formatDate(appointment.date)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-muted/30 px-2 py-1 rounded-md">
                <Clock className="w-3 h-3 text-primary" />
                <span className="font-semibold">{formatTime(appointment.time)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-muted/30 px-2 py-1 rounded-md">
                <Timer className="w-3 h-3 text-primary" />
                <span className="font-semibold">1 1/2 HR</span>
            </div>
        </div>
    )
}

export default SecondaryInfo