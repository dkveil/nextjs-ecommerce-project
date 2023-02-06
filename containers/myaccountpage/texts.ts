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
        logout: 'Log out',
        unknowerror: 'Something went wrong... ',
        youhavenoitemsinwishlist: 'You have no products in wishlist',
        youhavenoorders: 'You have no orders yet',
        ordernumber: 'Order number',
        orderdate: 'Date of order',
        totalprice: 'Total price',
        delivered: 'Delivered?',
        yes: "Yes",
        no: 'No',
        details: 'Details',
        adminmode: 'Admin mode',
        usermode: 'User mode',
        products: 'Products'
    },
    [langOptions.POLISH]: {
        header: 'Moje konto',
        orders: 'Moje zamówienia',
        accdetails: 'Szczegóły konta',
        wishlist: 'Lista życzeń',
        logout: 'Wyloguj',
        unknowerror: 'Coś poszło nie tak... ',
        youhavenoitemsinwishlist: 'Nie masz żadnych produktów w liście życzeń',
        youhavenoorders: 'Nie złożyłeś jeszcze żadnego zamówienia',
        ordernumber: 'Numer zamówienia',
        orderdate: 'Data zamówienia',
        totalprice: 'Total price',
        delivered: 'Dostarczono?',
        yes: "Tak",
        no: 'Nie',
        details: 'Szczegóły',
        adminmode: 'Tryb Administratora',
        usermode: 'Tryb Użytkownika',
        products: 'Produkty'
    }
}