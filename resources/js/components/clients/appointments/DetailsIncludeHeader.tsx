import { Appointment } from "@/types";
import {
    Card,
    CardContent,
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
        <Card className="rounded-2xl border border-border/70 bg-card shadow-sm dark:border-border dark:bg-card">
            <CardContent className="space-y-5">
                {/* Top badges */}
                <div className="flex items-center justify-between">
                    <Badge
                        variant="secondary"
                        className="rounded-full px-3 py-1 text-xs font-medium"
                    >
                        {status}
                    </Badge>

                    <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground dark:bg-muted/80 dark:text-muted-foreground">
                        <ClockIcon className="w-4 h-4" />
                        <span>{appointment?.duration} min</span>
                    </div>
                </div>

                {/* Date */}
                <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-muted p-2 dark:bg-muted/80">
                        <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                    </div>

                    <div>
                        <p className="text-base text-muted-foreground">
                            Fecha y hora
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                            {formatDateLong(appointment?.date)} a las{" "}
                            {formatTime(appointment?.time)}
                        </p>
                    </div>
                </div>

                {/* Employee */}
                <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-muted p-2 dark:bg-muted/80">
                        <UserIcon className="w-5 h-5 text-muted-foreground" />
                    </div>

                    <div>
                        <p className="text-base text-muted-foreground">
                            Estilista
                        </p>
                        <p className="text-md font-semibold text-foreground">
                            {appointment?.employee?.name}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
