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
        currency: 'EUR',
        shoes: 'Shoes',
        tshirts: 'T-shirt',
        hoodies: 'Hoodie',
        mustbelogged: 'You must be logged first!',
        addedtocart: 'Your product has been added to cart!',
        addedtowishlist: 'Your product has been added to wishlist!',
        size: 'Size',
        choosesizefirst: 'Select product option before adding this product to your cart.',
        choosesize: 'Choose an size',
        desc: 'Description',
        youneedbeloggedtoaddwish: 'You need be logged in to add product to wishlist',
        removedfromwishlist: 'Removed product from wislist',
        unknowerror: 'Something went wrong...'
    },
    [langOptions.POLISH]: {
        instock: 'Dostępne',
        outofstock: 'Wyprzedane',
        addtocart: 'Dodaj do koszyka',
        addtowishlist: 'Dodaj to listy życzeń',
        currency: 'PLN',
        shoes: 'Buty',
        tshirts: 'Koszulka',
        hoodies: 'Bluza',
        mustbelogged: 'Musisz się najpierw zalogować!',
        addedtocart: 'Produkt został dodany do koszyka!',
        addedtowishlist: 'Product został dodany do listy życzeń!',
        size: 'Rozmiar',
        choosesizefirst: 'Wybierz rozmiar przed dodaniem produktu do koszyka.',
        choosesize: 'Wybierz rozmiar',
        desc: 'Szcegóły produktu',
        youneedbeloggedtoaddwish: 'Musisz być zalogowany, aby dodać produkt do listy życzeń',
        removedfromwishlist: 'Usunięto produkt z listy życzeń',
        unknowerror: 'Coś poszło nie tak...'
    }
}