import langOptions from '../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        shippingdetails: 'Shipping details',
        createorder: 'Create order',
        name: 'Name',
        lastName: 'Last name',
        phone: 'Phone number',
        street: 'Street address',
        city: 'City',
        postcode: 'Postcode / ZIP',
        currency: 'EUR',
        cartupdated: 'Your cart has been updated. Probably one of your products are no longer available.',
        unknowerror: 'Something went wrong...',
        namerequired: 'Name is required',
        lastNamerequired: 'Last name is required',
        emailrequired: 'Email is required',
        phonerequired: 'Phone number is required',
        streetrequired: 'Street address is required',
        cityrequired: 'City is required',
        postcoderequired: 'Postcode / ZIP is required',
        invalidformat: 'Invalid format',
        successuser: 'Order has been placed! You can check the status of your order on your profile.',
        successguest: 'Order has been placed!',
    },
    [langOptions.POLISH]: {
        shippingdetails: 'Szczegóły zamówienia',
        createorder: 'Utwórz zamówienie',
        name: 'Imię',
        lastName: 'Nazwisko',
        phone: 'Nr telefonu',
        street: 'Ulica i numer',
        city: 'Miasto',
        postcode: 'Kod pocztowy',
        currency: 'PLN',
        cartupdated: 'Twój koszyk został zaktulizowany. Prawdopodobnie jeden z Twoich produktów nie jest już dostępny.',
        unknowerror: 'Coś poszło nie tak...',
        namerequired: 'Imię jest wymagane',
        lastNamerequired: 'Nazwysko jest wymagane',
        emailrequired: 'Email jest wymagany',
        phonerequired: 'Nr telefonu jest wymagany',
        streetrequired: 'Ulica i numer są wymagane',
        cityrequired: 'Miasto jest wymagane',
        postcoderequired: 'Kod pocztowy jest wymagany',
        invalidformat: 'Nieprawidłowy format',
        successuser: 'Zamówienie zostało złożone! Status zamówienia możesz sprawdzić na swoim profilu.',
        successguest: 'Zamówienie zostało złożone!',
    }
}