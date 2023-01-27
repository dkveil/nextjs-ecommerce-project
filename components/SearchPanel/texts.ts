import langOptions from '../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        search: 'Search',
        youarelookingfor: 'You are looking for...',
        result: 'Result',
        results: 'Results'
    },
    [langOptions.POLISH]: {
        search: 'Szukaj',
        youarelookingfor: 'Czego szukasz...',
        result: 'Wynik',
        results24: 'Wyniki',
        results: 'Wyników'
    }
}