import langOptions from '../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        pleaselogin: 'Please login again',
        userdoesntexists: "User doesn't exists",
        logout: 'You have been logged out'
    },
    [langOptions.POLISH]: {
        pleaselogin: 'Zaloguj się ponownie',
        userdoesntexists: 'Użytkownik nie istnieje',
        logout: 'Zostałeś wylogowany'
    }
}