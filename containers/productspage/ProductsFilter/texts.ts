import langOptions from '../../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        clearfilters: 'Clear filters',
        setfilters: 'See products',
        filters: 'Filters',
        sortby: 'Sort by',
        newest: 'Newest',
        popular: 'Popular',
        atoz: 'A to Z',
        ztoa: 'Z to A',
        pricehightolow: 'Price high to low',
        pricelowtohigh: 'Price low to high',
        size: 'Size',
        price: 'Price range',
        all: 'All',
        more: 'More',
        from: 'From',
        to: 'To',
        currency: 'EUR',
        clear: 'Clear',
        minpricetohigh: 'The minimum price cannot be higher than the maximum',
        maxpricetolow: 'The maximum price cannot be lower than the minimum'
    },
    [langOptions.POLISH]: {
        clearfilters: 'Wyczyść filtry',
        setfilters: 'Zobacz produkty',
        filters: 'Filtry',
        sortby: 'Sortuj według',
        newest: 'Najnowsze',
        popular: 'Popularne',
        atoz: 'A do Z',
        ztoa: 'Z do A',
        pricehightolow: 'Cena malejąco',
        pricelowtohigh: 'Cena rosnąco',
        size: 'Rozmiary',
        price: 'Przedział cenowy',
        all: 'Wszystkie',
        more: 'Inne filtry',
        from: 'Od',
        to: 'Do',
        currency: 'PLN',
        clear: 'Wyczyść',
        minpricetohigh: 'Minimalna cena nie może być większa od maksymalnej',
        maxpricetolow: 'Maksymalna cena nie może być mniejsza od minimalnej'
    }
}