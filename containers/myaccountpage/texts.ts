import langOptions from '../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        header: 'My account',
        orders: 'Orders',
        accdetails: 'Account details',
        wishlist: 'Wishlist',
        logout: 'Log out'
    },
    [langOptions.POLISH]: {
        header: 'Moje konto',
        orders: 'Moje zamówienia',
        accdetails: 'Szczegóły konta',
        wishlist: 'Lista życzeń',
        logout: 'Wyloguj'
    }
}