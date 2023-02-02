import langOptions from '../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        currency: 'EUR',
        shoes: 'Shoes',
        tshirts: 'T-shirt',
        hoodies: 'Hoodie',
        price: 'Price',
        dateadded: 'Date added to wishlist',
        remove: 'Remove',
        productpage: 'Product page'
    },
    [langOptions.POLISH]: {
        currency: 'PLN',
        shoes: 'Buty',
        tshirts: 'Koszulka',
        hoodies: 'Bluza',
        price: 'Cena',
        dateadded: 'Data dodania do listy życzeń',
        remove: 'Usuń',
        productpage: 'Strona produktu'
    }
}