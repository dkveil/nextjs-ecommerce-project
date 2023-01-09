import langOptions from '../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        search: 'Search',
        wish: 'Wish list',
        login: 'Login',
        cart: 'Cart',
        home: 'Home',
        tshirts: 'T-shirts',
        hoodies: 'Hoodies',
        shoes: 'Shoes'
    },
    [langOptions.POLISH]: {
        search: 'Szukaj',
        wish: 'Lista życzeń',
        login: 'Zaloguj',
        cart: 'Koszyk',
        home: 'Strona główna',
        tshirts: 'Koszulki',
        hoodies: 'Bluzy',
        shoes: 'Buty'
    }
}