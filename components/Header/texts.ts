import langOptions from '../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        search: 'Search',
        wish: 'Wish list',
        login: 'Login',
        myaccount: 'My account',
        cart: 'Cart',
        home: 'Home',
        all: 'All',
        tshirts: 'T-shirts',
        hoodies: 'Hoodies',
        shoes: 'Shoes',
        youmustloginfirst: 'You must log in first'
    },
    [langOptions.POLISH]: {
        search: 'Szukaj',
        wish: 'Lista życzeń',
        login: 'Zaloguj',
        myaccount: 'Moje konto',
        cart: 'Koszyk',
        home: 'Strona główna',
        all: 'Wszystko',
        tshirts: 'Koszulki',
        hoodies: 'Bluzy',
        shoes: 'Buty',
        youmustloginfirst: 'Musisz się najpierw zalogować'
    }
}