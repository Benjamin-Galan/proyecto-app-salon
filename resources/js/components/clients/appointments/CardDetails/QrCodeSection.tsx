import { Appointment } from "@/types"
import { QRCodeSVG } from "qrcode.react"
import { QrCode } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface QrCodeSectionProps {
    appointment: Appointment
}

const QrCodeSection = ({ appointment }: QrCodeSectionProps) => {
    return (
        <div className="flex flex-col items-center mb-2">
            <div className="relative group/qr bg-white dark:bg-slate-50 p-2 rounded-xl shadow-sm border border-muted/20 transition-all duration-300 hover:shadow-md hover:scale-105">
                <QRCodeSVG
                    value={appointment.code}
                    size={80}
                    level="M"
                    className="rounded-sm"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/qr:opacity-100 transition-opacity bg-white/20 dark:bg-black/20 backdrop-blur-[1px] rounded-xl pointer-events-none">
                    <QrCode className="w-6 h-6 text-primary drop-shadow-sm" />
                </div>
            </div>
            <div className="text-center">
                <Badge
                    variant={appointment.status === "Confirmada" ? "success" : "warning"}
                    className="capitalize font-bold text-[9px] px-2 py-0 h-4"
                >
                    Haz check-in aqui
                </Badge>
            </div>
        </div>
    )
}

export default QrCodeSection