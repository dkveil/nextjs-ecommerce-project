
export default function formatCurrency(number: number, currency: string){
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currency
    }).format(number)
}