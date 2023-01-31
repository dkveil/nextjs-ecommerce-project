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
        youneedbelogged: 'You need be logged to create order',
        logintoyouraccount: 'Login to your account',
        or: 'or',
        continueasguest: 'Continue as guest',
        coupondoesnotexists: 'The coupon does not exists',
        expiredcoupon: 'Unfortunately, the coupon has expired',
        cuoponsuccess: 'Coupon successfully used',
        unknowerror: 'Something went wrong...',
        applied: 'Applied',
    },
    [langOptions.POLISH]: {
        ordersummary: 'Podsumowanie zamówienia',
        currency: 'PLN',
        detailstitle: 'Szczegóły zamówienia',
        apply: 'Użyj',
        total: 'Razem',
        gotacoupon: 'Kod rabatowy',
        youneedbelogged: 'Musisz być zalogowany, aby złożyć zamówienie',
        logintoyouraccount: 'Zaloguj się do swojego konta',
        or: 'lub',
        continueasguest: 'Kontynuuj jako gość',
        coupondoesnotexists: 'Kupon nie istnieje',
        expiredcoupon: 'Kupon niestety wygasł',
        cuoponsuccess: 'Pomyślnie użyto kupon',
        unknowerror: 'Coś poszło nie tak...',
        applied: 'Zastosowano',

    }
}