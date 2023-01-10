import langOptions from '../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        search: 'Search',
        youarelookingfor: 'You are looking for...'
    },
    [langOptions.POLISH]: {
        search: 'Szukaj',
        youarelookingfor: 'Czego szukasz...'
    }
}