import langOptions from '../../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        header: 'Featured products',
        shopnow: 'Shop now'
    },
    [langOptions.POLISH]: {
        header: 'Wyróżnione produkty',
        shopnow: 'Przeglądaj'
    }
}