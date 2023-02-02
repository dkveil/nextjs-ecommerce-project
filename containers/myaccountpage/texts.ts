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
        orderid: 'Order ID',
        orderdate: 'Date of order',
        totalprice: 'Total price',
        delivered: 'Delivered?',
        yes: "Yes",
        no: 'No',
        details: 'Details'
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
        orderid: 'ID Zamówienia',
        orderdate: 'Data zamówienia',
        totalprice: 'Total price',
        delivered: 'Dostarczono?',
        yes: "Tak",
        no: 'Nie',
        details: 'Szczegóły'
    }
}