import type { Appointment, Employee } from "@/types";

const SLOT_INTERVAL_MINUTES = 15;
const DEFAULT_OPEN_MINUTES = 9 * 60;
const DEFAULT_CLOSE_MINUTES = 20 * 60;
const SUNDAY_OPEN_MINUTES = 10 * 60;
const SUNDAY_CLOSE_MINUTES = 18 * 60;

export function normalizeDateString(date: string) {
    return date.includes("T") ? date.split("T")[0] : date;
}

export function timeToMinutes(time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    return (hours * 60) + minutes;
}

export function minutesToTime(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function getScheduleBounds(date: string) {
    const localDate = new Date(`${date}T12:00:00`);
    const isSunday = localDate.getDay() === 0;

    return isSunday
        ? { openMinutes: SUNDAY_OPEN_MINUTES, closeMinutes: SUNDAY_CLOSE_MINUTES }
        : { openMinutes: DEFAULT_OPEN_MINUTES, closeMinutes: DEFAULT_CLOSE_MINUTES };
}

export function appointmentsOverlap(
    firstStartMinutes: number,
    firstDurationMinutes: number,
    secondStartMinutes: number,
    secondDurationMinutes: number,
) {
    const firstEndMinutes = firstStartMinutes + firstDurationMinutes;
    const secondEndMinutes = secondStartMinutes + secondDurationMinutes;

    return firstStartMinutes < secondEndMinutes && secondStartMinutes < firstEndMinutes;
}

export function getEnabledEmployeesCount(employees: Employee[]) {
    return employees.filter((employee) => employee.available !== false).length;
}

export function isTimeSlotAvailable({
    appointments,
    date,
    time,
    durationMinutes,
    employeesCount,
}: {
    appointments: Appointment[];
    date: string;
    time: string;
    durationMinutes: number;
    employeesCount: number;
}) {
    if (employeesCount <= 0 || durationMinutes <= 0) {
        return false;
    }

    const selectedDate = normalizeDateString(date);
    const selectedStartMinutes = timeToMinutes(time);

    let overlappingAppointments = 0;

    for (const appointment of appointments) {
        if (normalizeDateString(String(appointment.date)) !== selectedDate) {
            continue;
        }

        const appointmentStartMinutes = timeToMinutes(appointment.time);

        if (
            appointmentsOverlap(
                selectedStartMinutes,
                durationMinutes,
                appointmentStartMinutes,
                appointment.duration,
            )
        ) {
            overlappingAppointments += 1;
        }

        if (overlappingAppointments >= employeesCount) {
            return false;
        }
    }

    return true;
}

export function buildAvailableTimeSlots({
    appointments,
    employees,
    date,
    durationMinutes,
}: {
    appointments: Appointment[];
    employees: Employee[];
    date: string | null;
    durationMinutes: number;
}) {
    if (!date || durationMinutes <= 0) {
        return [];
    }

    const employeesCount = getEnabledEmployeesCount(employees);

    if (employeesCount <= 0) {
        return [];
    }

    const { openMinutes, closeMinutes } = getScheduleBounds(date);
    const lastStartMinutes = closeMinutes - durationMinutes;
    const slots: string[] = [];

    for (
        let currentMinutes = openMinutes;
        currentMinutes <= lastStartMinutes;
        currentMinutes += SLOT_INTERVAL_MINUTES
    ) {
        const time = minutesToTime(currentMinutes);

        if (
            isTimeSlotAvailable({
                appointments,
                date,
                time,
                durationMinutes,
                employeesCount,
            })
        ) {
            slots.push(time);
        }
    }

    return slots;
}

export function buildTimeSlotsWithAvailability({
    appointments,
    employees,
    date,
    durationMinutes,
}: {
    appointments: Appointment[];
    employees: Employee[];
    date: string | null;
    durationMinutes: number;
}) {
    if (!date || durationMinutes <= 0) {
        return [];
    }

    const employeesCount = getEnabledEmployeesCount(employees);

    if (employeesCount <= 0) {
        return [];
    }

    const { openMinutes, closeMinutes } = getScheduleBounds(date);
    const lastStartMinutes = closeMinutes - durationMinutes;
    const slots: { time: string; available: boolean }[] = [];

    for (
        let currentMinutes = openMinutes;
        currentMinutes <= lastStartMinutes;
        currentMinutes += SLOT_INTERVAL_MINUTES
    ) {
        const time = minutesToTime(currentMinutes);

        slots.push({
            time,
            available: isTimeSlotAvailable({
                appointments,
                date,
                time,
                durationMinutes,
                employeesCount,
            }),
        });
    }

    return slots;
}
