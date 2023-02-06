import langOptions from '../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        save: 'Save changes',
        changepassword: 'Change password',
        firstName: 'First name',
        lastName: 'Last name',
        phone: 'Phone number',
        currentPassword: 'Current password',
        newPassword: 'New password',
        confirmNewPassword: 'Confirm new password',
        invalidFormat: 'Invalid format',
        matchpassword: "Passwords don't match",
        fieldrequired: 'Field is required',
        min6passwordcharacters: 'Password must be at least 6 characters long',
        wrongcurrentpassword: 'The old password is incorrect',
        samenewpassword: 'Old password used',
        unknowerror: 'Something went wrong...',
        success: 'Account updated successfully',
        cantchangedetailsofthisaccount: 'You cannot modify the details for this account',
    },
    [langOptions.POLISH]: {
        save: 'Zapisz zmiany',
        changepassword: 'Zmiana hasła',
        firstName: 'Imię',
        lastName: 'Nazwisko',
        phone: 'Numer telefonu',
        currentPassword: 'Stare hasło',
        newPassword: 'Nowe hasło',
        confirmNewPassword: 'Potwierdź nowe hasło',
        invalidFormat: 'Nieprawidłowy format',
        matchpassword: 'Hasła nie pasują do siebie',
        fieldrequired: 'Pole jest wymagane',
        min6passwordcharacters: 'Hasło musi mieć minimum 6 znaków',
        wrongcurrentpassword: 'Stare hasło jest nieprawidłowe',
        samenewpassword: 'Użyto starego hasła',
        unknowerror: 'Coś poszło nie tak...',
        success: 'Zaktualizowano konto pomyślnie',
        cantchangedetailsofthisaccount: 'Nie możesz modyfikować danych dla tego konta',
    }
}