export const formatCurrency = (number: number) => {
    return new Intl.NumberFormat("es-NI").format(Number(number || 0))
}