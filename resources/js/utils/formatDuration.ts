export const formatDuration = (minutes: number) => {
    if (!minutes) return "N/A"
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hrs === 0) return `${mins} min`
    if (mins === 0) return `${hrs} hr`
    return `${hrs} hr ${mins} min`
}

export function formatDurationTwo(minutes: number) {
    if (typeof minutes !== "number" || minutes <= 0) return "";

    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hrs === 0) return `${mins} minutos`;

    if (mins === 0) {
        return `${hrs} hora${hrs > 1 ? "s" : ""}`;
    }

    if (mins === 30) {
        return `${hrs} hora${hrs > 1 ? "s" : ""} y media`;
    }

    // Solo aplica para 15 y 45 (casos cortos)
    if (mins === 15) {
        return `${hrs} hora${hrs > 1 ? "s" : ""} y 15 minutos`;
    }

    if (mins === 45) {
        return `${hrs} hora${hrs > 1 ? "s" : ""} y 45 minutos`;
    }

    return `${hrs}h ${mins}m`; // fallback
}