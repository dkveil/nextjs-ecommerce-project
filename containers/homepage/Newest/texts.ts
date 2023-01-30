import langOptions from '../../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        whatsnew: "What's new?",
        shopnow: 'Shop now'
    },
    [langOptions.POLISH]: {
        whatsnew: 'Co nowego',
        shopnow: 'Przeglądaj'
    }
}