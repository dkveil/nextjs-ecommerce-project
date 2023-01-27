import langOptions from '../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        ordersummary: 'Order summary',
        currency: 'EUR',
        detailstitle: 'Order details',
        apply: 'Apply',
        total: 'Total',
        gotacoupon: 'Got a coupon?',
        youneedbelogged: 'You need be logged to create order'
    },
    [langOptions.POLISH]: {
        ordersummary: 'Podsumowanie zamówienia',
        currency: 'PLN',
        detailstitle: 'Szczegóły zamówienia',
        apply: 'Użyj',
        total: 'Razem',
        gotacoupon: 'Kod rabatowy',
        youneedbelogged: 'Musisz być zalogowany, aby złożyć zamówienie'

    }
}