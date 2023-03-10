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
        size: 'Size',
        quantity: 'Quantity',
        edit: 'Edit product',
        delete: 'Delete product',
    },
    [langOptions.POLISH]: {
        currency: 'PLN',
        shoes: 'Buty',
        tshirts: 'Koszulka',
        hoodies: 'Bluza',
        size: 'Rozmiar',
        quantity: 'Ilość',
        edit: 'Edytuj produkt',
        delete: 'Usuń produkt',
    }
}