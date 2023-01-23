import langOptions from '../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        pleaselogin: 'Please login again',
        userdoesntexists: "User doesn't exists",
        logout: 'You have been logged out',
        product404: 'The product is not available',
        size404: 'The selected size is no longer available. Please refresh the page to update the product information.',
        unknownerror: 'Something went wrong... ',
        qunatityequalinstock: 'Out of stock',
        addtocart: 'Your product has been added to cart!',
        removefromcart: 'Product has been removed from cart!'
    },
    [langOptions.POLISH]: {
        pleaselogin: 'Zaloguj się ponownie',
        userdoesntexists: 'Użytkownik nie istnieje',
        logout: 'Zostałeś wylogowany',
        product404: 'Produkt jest niedostępny',
        size404: 'Wybrany rozmiar jest już niedostępny. Odśwież stronę, aby zaktualizować informacje o produkcie.',
        unknownerror: 'Coś poszło nie tak... ',
        qunatityequalinstock: 'Brak na magazynie',
        addtocart: 'Produkt został dodany do koszyka!',
        removefromcart: 'Produkt został usunięty z koszyka!'
    }
}