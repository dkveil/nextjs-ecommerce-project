import langOptions from '../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        carttitle: 'Cart',
        checkout: 'Check out',
        subtotal: 'Sub total'
    },
    [langOptions.POLISH]: {
        carttitle: 'Koszyk',
        checkout: 'Zapłać',
        subtotal: 'Suma do zapłaty'
    }
}