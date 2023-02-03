import langOptions from '../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        header: "Order",
        detailsheader: 'Details of the order',
        unknowerror: 'Something went wrong... ',
        firstName: 'First name',
        lastName: 'Last name',
        phone: 'Phone number',
        street: 'Street address',
        city: 'City',
        postcode: 'Postcode / ZIP',
        totalprice: 'Total price',
        delivered: 'Dellivered?',
        yes: 'Yes',
        no: 'No',
        orderedheader: 'Ordered products'
    },
    [langOptions.POLISH]: {
        header: 'Zamówienie',
        detailsheader: 'Szczegóły zamówienia',
        unknowerror: 'Coś poszło nie tak... ',
        firstName: 'Imię',
        lastName: 'Nazwisko',
        phone: 'Nr telefonu',
        street: 'Ulica i numer',
        city: 'Miasto',
        postcode: 'Kod pocztowy',
        totalprice: 'Cena zamówienia',
        delivered: 'Dostarczono?',
        yes: 'Tak',
        no: 'Nie',
        orderedheader: 'Zamówione produkty'
    }
}