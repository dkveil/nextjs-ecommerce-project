import langOptions from '../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        carttitle: 'Cart',
        checkout: 'Check out',
        subtotal: 'Sub total',
        cartempty: 'Your cart is empty',
        unknowerror: 'Something went wrong...',
        currency: 'EUR',
        cartupdated: 'Your cart has been updated. Probably one of your products are no longer available.',

    },
    [langOptions.POLISH]: {
        carttitle: 'Koszyk',
        checkout: 'Zapłać',
        subtotal: 'Suma do zapłaty',
        cartempty: 'Koszyk jest pusty',
        unknowerror: 'Coś poszło nie tak...',
        currency: 'PLN',
        cartupdated: 'Twój koszyk został zaktulizowany. Prawdopodobnie jeden z Twoich produktów nie jest już dostępny.',

    }
}