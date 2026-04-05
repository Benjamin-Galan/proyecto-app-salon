import { Appointment } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { formatDateLong, formatTime } from "@/utils/formatDateTime";
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";

interface Props {
    appointment: Appointment | null;
}

export default function DetailsIncludeHeader({ appointment }: Props) {
    const status = appointment?.status ?? "Pendiente";

    return (
        <Card className="rounded-2xl shadow-sm border">
            <CardContent className="space-y-5">
                {/* Top badges */}
                <div className="flex items-center justify-between">
                    <Badge
                        variant="secondary"
                        className="rounded-full px-3 py-1 text-xs font-medium"
                    >
                        {status}
                    </Badge>

                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        <ClockIcon className="w-4 h-4" />
                        <span>{appointment?.duration} min</span>
                    </div>
                </div>

                {/* Date */}
                <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                        <CalendarIcon className="w-5 h-5 text-gray-600" />
                    </div>

                    <div>
                        <p className="text-base text-gray-500">
                            Fecha y hora
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {formatDateLong(appointment?.date)} a las{" "}
                            {formatTime(appointment?.time)}
                        </p>
                    </div>
                </div>

                {/* Employee */}
                <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                        <UserIcon className="w-5 h-5 text-gray-600" />
                    </div>

                    <div>
                        <p className="text-base text-gray-500">
                            Estilista
                        </p>
                        <p className="text-md font-semibold text-gray-900">
                            {appointment?.employee?.name}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}