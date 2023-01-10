import langOptions from '../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        welcomelogin: 'Welcome',
        welcomeregister: 'Create an account',
        loginusingmail: 'Login using your email',
        registerusingmail: 'Create an account using your email',
        loginbutton: 'Login',
        registerbutton: 'Register',
        noacc: "Don't have an account?",
        noaccbutton: 'Create one',
        emailplaceholder: 'Email address',
        passwordplaceholder: 'Password',
        confirmpasswordplaceholder: 'Confirm password',
        requiredfield: 'Field is required',
        invalidemail: 'Invalid email format',
        min6passwordcharacters: 'Password must be at least 6 characters long',
        matchpassword: "Passwords don't match"
    },
    [langOptions.POLISH]: {
        welcomelogin: 'Witaj',
        welcomeregister: 'Utwórz konto',
        loginusingmail: 'Zaloguj się za pomocą Twojego emaila',
        registerusingmail: 'Zarejestruj się za pomocą Twojego emaila',
        loginbutton: 'Zaloguj',
        registerbutton: 'Zarejestruj',
        noacc: 'Nie masz jeszcze konta?',
        noaccbutton: 'Zarejestruj się',
        emailplaceholder: 'Adres email',
        passwordplaceholder: 'Hasło',
        confirmpasswordplaceholder: 'Potwierdź hasło',
        requiredfield: 'Pole jest wymagane',
        invalidemail: 'Niepoprawny format emaila',
        min6passwordcharacters: 'Hasło musi mieć minimum 6 znaków',
        matchpassword: 'Hasła nie pasują do siebie'
    }
}