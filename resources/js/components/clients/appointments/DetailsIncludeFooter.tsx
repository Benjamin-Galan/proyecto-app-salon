import { Appointment } from "@/types";
import { Button } from "@/components/ui/button";

interface Props {
    appointment: Appointment | null;
}

export default function DetailsIncludeFooter({ appointment }: Props) {
    return (
        <div className="mt-6 space-y-4">
            {/* Notes */}
            <div>
                <p className="mb-2 text-sm font-semibold text-muted-foreground">
                    NOTES
                </p>

                <div className="rounded-md border border-border/70 bg-muted/60 p-4 text-sm italic text-muted-foreground dark:border-border dark:bg-muted/30">
                    {appointment?.notes || "No notes provided"}
                </div>
            </div>
        </div>
    );
}
