import langOptions from '../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        heading: 'Just be yourself',
        paragraph: 'Sports collection',
        button: 'Shop now'
    },
    [langOptions.POLISH]: {
        heading: 'Bądź sobą',
        paragraph: 'Kolekcja sportowa',
        button: 'Przeglądaj'
    }
}