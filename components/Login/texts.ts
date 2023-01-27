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
        alreadyacc: 'Already have account?',
        noaccbutton: 'Create one',
        alreadyaccbutton: 'Login here',
        emailplaceholder: 'Email address',
        passwordplaceholder: 'Password',
        confirmpasswordplaceholder: 'Confirm password',
        requiredfield: 'Field is required',
        invalidemail: 'Invalid email format',
        min6passwordcharacters: 'Password must be at least 6 characters long',
        matchpassword: "Passwords don't match",
        emailalreadyexists: 'This email already exists',
        registersuccess: 'Register success!',
        loginsuccess: 'Login success!',
        unknowerror: 'Something went wrong...',
        incorectdata: "Incorect email or password"
    },
    [langOptions.POLISH]: {
        welcomelogin: 'Witaj',
        welcomeregister: 'Utwórz konto',
        loginusingmail: 'Zaloguj się za pomocą Twojego emaila',
        registerusingmail: 'Zarejestruj się za pomocą Twojego emaila',
        loginbutton: 'Zaloguj',
        registerbutton: 'Zarejestruj',
        noacc: 'Nie masz jeszcze konta?',
        alreadyacc: 'Masz już u nas konto?',
        noaccbutton: 'Zarejestruj się',
        alreadyaccbutton: 'Zaloguj się',
        emailplaceholder: 'Adres email',
        passwordplaceholder: 'Hasło',
        confirmpasswordplaceholder: 'Potwierdź hasło',
        requiredfield: 'Pole jest wymagane',
        invalidemail: 'Niepoprawny format emaila',
        min6passwordcharacters: 'Hasło musi mieć minimum 6 znaków',
        matchpassword: 'Hasła nie pasują do siebie',
        emailalreadyexists: 'Istnieje już konto z podanym emailem',
        registersuccess: 'Zarejestrowano pomyślnie!',
        loginsuccess: 'Zalogowano pomyślnie!',
        unknowerror: 'Coś poszło nie tak...',
        incorectdata: 'Nieprawidłowy email lub hasło'
    }
}