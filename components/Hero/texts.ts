import langOptions from '../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        paragraph: 'Sports collection',
        button: 'Shop now'
    },
    [langOptions.POLISH]: {
        paragraph: 'Kolekcja sportowa',
        button: 'Przeglądaj'
    }
}