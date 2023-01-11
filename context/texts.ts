import langOptions from '../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        pleaselogin: 'Please login again',
        userdoesntexists: "User doesn't exists"
    },
    [langOptions.POLISH]: {
        pleaselogin: 'Zaloguj się ponownie',
        userdoesntexists: 'Użytkownik nie istnieje'
    }
}