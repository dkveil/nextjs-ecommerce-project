export interface IProduct {
    _id: String,
    title: {
        'ENG': String
        'PL': String,
    },
    price: {
        'ENG': Number,
        'PL': Number
    },
    predescription: {
        'ENG': String,
        'PL': String,
    },
    description: {
        'ENG': String,
        'PL': String,
    },
    categoryid: 'tshirt' | 'hoodie' | 'shoes',
    images: String[],
    options: {
        title: String,
        inStock: String
    },
    sold: Number,
    createdAt: String,
    updatedAt: String
}