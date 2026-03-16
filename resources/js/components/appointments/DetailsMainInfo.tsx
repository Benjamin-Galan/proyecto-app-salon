import { Appointment } from "@/types";
import { Clock, Coins, UserCheck, UserIcon } from "lucide-react";

interface Props {
    appointment: Appointment;
}

export default function DetailsMainInfo({ appointment }: Props) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:grid-cols-5 xl:gap-5">
            {/* Cliente */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg p-3 md:p-4 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-sm">
                <div className="flex items-center gap-1.5 mb-1.5">
                    <UserIcon width={16} height={16} className="text-slate-500 dark:text-slate-400" />
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wide">
                        Cliente
                    </p>
                </div>
                <p className="font-semibold text-sm text-slate-900 dark:text-slate-50 break-words">
                    {appointment?.user.name}
                </p>
            </div>

            {/* Hora */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg p-3 md:p-4 border border-blue-200 dark:border-blue-800 transition-all hover:shadow-sm">
                <div className="flex items-center gap-1.5 mb-1.5">
                    <Clock width={16} height={16} className="text-blue-600 dark:text-blue-400" />
                    <p className="text-xs text-blue-700 dark:text-blue-400 font-medium uppercase tracking-wide">
                        Hora
                    </p>
                </div>
                <p className="font-semibold text-sm text-blue-900 dark:text-blue-50">
                    {appointment?.time}
                </p>
            </div>

            {/* Estilista asignado */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg p-3 md:p-4 border border-purple-200 dark:border-purple-800 transition-all hover:shadow-sm">
                <div className="flex items-center gap-1.5 mb-1.5">
                    <UserCheck width={16} height={16} className="text-purple-600 dark:text-purple-400" />
                    <p className="text-xs text-purple-700 dark:text-purple-400 font-medium uppercase tracking-wide">
                        Estilista
                    </p>
                </div>
                <p className="font-semibold text-sm text-purple-900 dark:text-purple-50 break-words">
                    {appointment?.employee?.name || "No asignado"}
                </p>
            </div>

            {/* Precio total */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 rounded-lg p-3 md:p-4 border border-emerald-200 dark:border-emerald-800 transition-all hover:shadow-sm">
                <div className="flex items-center gap-1.5 mb-1.5">
                    <Coins width={16} height={16} className="text-emerald-600 dark:text-emerald-400" />
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium uppercase tracking-wide">
                        Total
                    </p>
                </div>
                <p className="font-bold text-sm text-emerald-700 dark:text-emerald-400">
                    C$ {appointment?.total}
                </p>
            </div>

            {/*Estado */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg p-3 md:p-4 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-sm">
                <div className="flex items-center gap-1.5 mb-1.5">
                    <UserIcon width={16} height={16} className="text-slate-500 dark:text-slate-400" />
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wide">
                        Estado
                    </p>
                </div>
                <p className="font-semibold text-sm text-slate-900 dark:text-slate-50 break-words">
                    {appointment?.status.toUpperCase().slice(0, 1)}
                    {appointment?.status.toUpperCase().slice(1).toLowerCase()}
                </p>
            </div>
        </div>
    );
}
