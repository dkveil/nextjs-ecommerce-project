export interface IShoppingCartItem {
    _id: string;
    size: string;
    name: {
        ENG: string;
        PL: string;
    };
    img: string;
    categoryid: string;
    price: {
        ENG: number;
        PL: number;
    };
    slug: string;
    quantity: number;
    orderItem?: boolean
}
