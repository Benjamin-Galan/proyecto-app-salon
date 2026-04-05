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
                <p className="text-sm font-semibold text-gray-500 mb-2">
                    NOTES
                </p>

                <div className="bg-gray-100 text-gray-500 text-sm italic rounded-md p-4">
                    {appointment?.notes || "No notes provided"}
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center gap-3">
                <Button
                    className="w-full rounded-full py-6 text-base font-semibold 
                               bg-rose-400 hover:bg-rose-500 text-white shadow-md"
                >
                    Reschedule
                </Button>

                <button
                    className="text-sm text-gray-500 hover:text-red-500 transition"
                >
                    Cancel appointment
                </button>
            </div>
        </div>
    );
}