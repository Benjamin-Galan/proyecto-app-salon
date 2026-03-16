import { useState } from "react"
import { ClientScreen } from "@/types";

export const useScreenChange = () => {
    const [scheduleCurrentScreen, setScheduleCurrentScreen] = useState<ClientScreen>("products");
    const [appointmentCurrentScreen, setAppointmentCurrentScreen] = useState<ClientScreen>("list");

    const handleScheduleScreenChange = (screen: ClientScreen) => {
        setScheduleCurrentScreen(screen);
    };

    const handleAppointmentScreenChange = (screen: ClientScreen) => {
        setAppointmentCurrentScreen(screen);
    };

    return {
        scheduleCurrentScreen,
        appointmentCurrentScreen,
        handleScheduleScreenChange,
        handleAppointmentScreenChange,
    };
}