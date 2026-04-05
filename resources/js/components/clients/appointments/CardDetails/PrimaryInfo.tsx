import { Appointment } from "@/types"
import { CreditCard, User } from "lucide-react"

interface PrimaryInfoProps {
    appointment: Appointment
}

const PrimaryInfo = ({ appointment }: PrimaryInfoProps) => {
    return (
        <div className='flex flex-col gap-2 w-full'>
            <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                    <User className="w-4 h-4" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="text-[11px] tracking-wider text-muted-foreground font-bold">Te atiende:</p>
                    </div>
                    <p className="text-[12px] font-semibold">{appointment.employee?.name || "Sin asignar"}</p>
                </div>
            </div>

            <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                    <CreditCard className="w-4 h-4" />
                </div>
                <div>
                    <p className="text-[11px] tracking-wider text-muted-foreground font-bold">Total del Servicio</p>
                    <p className="text-[12px] font-black text-foreground">C$ {appointment.total}</p>
                </div>
            </div>
        </div>
    )
}

export default PrimaryInfo