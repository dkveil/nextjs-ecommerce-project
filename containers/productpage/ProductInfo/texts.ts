import langOptions from '../../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        instock: 'In stock',
        outofstock: 'Out of stock',
        addtocart: 'Add to cart',
        addtowishlist: 'Add to wish list',
        removefromwishlist: 'Remove from wishlist',
        currency: 'EUR',
        shoes: 'Shoes',
        tshirts: 'T-shirt',
        hoodies: 'Hoodie',
        mustbelogged: 'You must be logged first!',
        addedtocart: 'Your product has been added to cart!',
        size: 'Size',
        choosesizefirst: 'Select product option before adding this product to your cart.',
        choosesize: 'Choose an size',
        desc: 'Description',
        unknowerror: 'Something went wrong...'
    },
    [langOptions.POLISH]: {
        instock: 'Dostępne',
        outofstock: 'Wyprzedane',
        addtocart: 'Dodaj do koszyka',
        addtowishlist: 'Dodaj to listy życzeń',
        removefromwishlist: 'Usuń z list życzeń',
        currency: 'PLN',
        shoes: 'Buty',
        tshirts: 'Koszulka',
        hoodies: 'Bluza',
        mustbelogged: 'Musisz się najpierw zalogować!',
        addedtocart: 'Produkt został dodany do koszyka!',
        size: 'Rozmiar',
        choosesizefirst: 'Wybierz rozmiar przed dodaniem produktu do koszyka.',
        choosesize: 'Wybierz rozmiar',
        desc: 'Szcegóły produktu',
        unknowerror: 'Coś poszło nie tak...'
    }
}