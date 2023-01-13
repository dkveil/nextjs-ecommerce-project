export interface IProduct {
    _id: string,
    title: {
        'ENG': string
        'PL': string,
    },
    price: {
        'ENG': number,
        'PL': number
    },
    predescription: {
        'ENG': string,
        'PL': string,
    },
    description: {
        'ENG': string,
        'PL': string,
    },
    categoryid: 'tshirt' | 'hoodie' | 'shoes',
    images: string[],
    options: {
        title: string,
        inStock: number
    }[],
    sold: number,
    createdAt: string,
    updatedAt: string
}