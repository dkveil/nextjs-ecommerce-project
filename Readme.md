
# NextJS Ecommerce Project

Projekt sklepu internetowego oparty na NextJS z TypeScriptem i bazie danych MongoDB. Strona posiada prostą autoryzację użytkownika OAuth, ContextAPI (przechowujące między innymi język i motyw strony, czy dane użytkownika jak token dostępu), walidację formularzy opartych na Formik i Yup.



## Technologie

- Nextjs
- Typescript
- MongoDB/Mongoose
- Context API
- Rest API
- Styled components
- Formik
- Yup
- Bcrypt
- JSONWebToken
- OAuth
- Js-Cookies
- Eslint
## Przykładowe konta do wglądu aplikacji
Konto użytkownika:  
E-mail: 123@gmail.com  
Hasło: 123456

Konto administratora umożliwiające zarządzanie produktami:  
E-mail: admin@root.com  
Hasło: admin!
## Pełny opis projektu

Projekt aplikacji zaczął się od konfiguracji Styled components dla środowiska NextJS, ze względu na jego specyficzną implementację. Zazwyczaj w aplikacjach Reactowych wystarczyło zainstalować paczkę, tutaj trzeba było skonfigurować plik _document.tsx, który ingeruje w renderowanie struktury. Wybór Styled components wynika przede wszystkim z tego, że wielokroć używałem tej biblioteki i najlepiej mi się stylizuje responsywne aplikacje z tą biblioteką. W pliku _document.tsx również znajdują się divy o id "modal-root", "notify", "popup", które zostały utworzone w celach użycia funkcji createPortal z biblioteki ReactDOM. Wraz ze Styled Components użyto również GlobalStyles, w którym zaimplementowano reset Meyera, oraz ThemeProvider, który posłużył za przetrzymywanie zmiennych, jak i dla danego motywu, tak i stylów całej aplikacji. Do aplikacji wgrano również customowy font, który został zaimplementowany w GlobalStyles oraz _document.tsx. W ramach eksperymentu ograniczyłem komponenty Styled Components głównie do kontenerów i wrapperów, tak by móc korzystać z ThemeProvidera, a dla zagnieżdżonych elementów zazwyczaj stosowałem klasy. Jeśli chodzi o konfigurację został użyty również Eslint, dla którego przypisano customowe zasady formatowania kodu w pliku .eslintrc.

Całą aplikację (w pliku _app.tsx) oplata GlobalContext, a następnie MainLayout, który odpowiada za trzymanie struktury aplikacji. Znajdują się tam komponenty takie jak Header, Footer, Modal trzymający formularz logowania, koszyk, panel wyszukiwania produktów, czy komponent trzymający notyfikację strony, oraz ich walidacje.

GlobalContext trzyma dane o motywie i języku strony, treści notyfikacji, danych użytkownika niezbędnych do funkcjonowania (takich jak token uwierzytelniania, tablice id produktów znajdujących się na liście życzeń użytkownika, dane pozwalające uzupełniać automatycznie np. formularz zamówienia), zawartość koszyka produktów, stan globalnego ładowania aplikacji oraz niezbędne funkcje do zarządzania tymi danymi tak, aby były dostępne z każdego miejsca aplikacji. Stan globalnego ładowania aplikacji został stworzony, aby w przypadku niektórych łączeń z serwerem użytkownik nie podejmował się kolejnych akcji. O niektórych akcjach oraz ich statusie informują notyfikacje zawarte w komponencie Notify. W przypadku motywu i języka strony oraz koszyka produktów został zastosowany localStorage, aby za każdym razem przy wejściu na witrynę zaczytywać preferencje użytkownika. Teksty odpowiadające językom znajdują się w folderach większości komponentów w pliku texts.ts.

Główna struktura aplikacji trzyma Header oraz Footer, tak aby na każdej podstronie pojawiały się te komponenty. Header i zawarta w nim nawigacja jest w pełni responsywna i dostosowana do urządzeń mobilnych oraz desktopowych. Posiada przyciski pozwalające na zmiane języka na stronie oraz jej motywu, otwarcie panelu wyszukiwania produktów, otwarcie formularza logowania (lub przejście do strony konta użytkownika w przypadku zalogowania), otwarcie koszyka, przejście do strony listy życzeń (tylko w wypadku bycia zalogowanym) nawigacje pozwalającą na przemieszczanie między podstronami produktów a stroną główną.

Aplikacja NextJS jest połączona z bazą MongoDb, a dzięki mongoose zostały utworzone schematy danych kolekcji. W przypadku braku kolekcji w bazie danych automatycznie zostaną utworzone, dzięki czemu można podłączyć ją pod każdą, nowo utworzoną bazę danych MongoDb.

Pierwsze łączenie z bazą danych następuje na stronie głównej, gdzie zostaje zaczytana ilość produktów, które zostały dodane w skali tygodnia i 5 najnowszych oraz najbardziej sprzedawanych produktów. Każda karta produktu prowadzi do podstrony produkty, gdzie w bazie szukany jest produkt, a w przypadku braku wyniku strona zwraca error404. W przypadku podstron z produktami, poza listą produktów odpowiadającej danej kategorii, pojawia się również opcja filtrowania ich za pomocą Router Query. Z poziomu podstrony z produktami jest możliwość dodawania produktów do listy życzeń, do której ma dostęp tylko zalogowany. Podczas dodawania i usuwania elementów z listy życzeń następuje łączenie do bazy danych oraz umieszczenie najnowszego stanu listy życzeń po stronie klienta i bazy danych. Lista życzeń przechowuje id produktu i datę dodania.

Autoryzacja użytkownika polega na utworzeniu dwóch tokenów uwierzytelniania za pomocą biblioteki JSONWebToken, które przechwoują id logującego, sekretny klucz (przechowywany w .env.local) oraz termin ważności. AccessToken pozwala na sprawdzenie uprawnień użytkownika, a RefreshToken przechowywany w cookies w przypadku ponownej sesji pozwala na automatyczne zalogowanie się i dostarczenie danych do globalnego stanu aplikacji. Po upływie 7 dni RefreshToken traci ważność co skutkuje, że przy kolejnej wizycie będzie wymagane ponowne zalogowanie się. Logowanie odbywa się w komponencie Login za pomocą prostego formularza stworzonego dzięki Formik oraz walidacji Yup. Podczas rejestracji z poziomu serwera jest również sprawdzane, czy użytkownik o podanym e-mailu już istnieje.

Koszyk produktów za każdym wejściem na stronę wczytuje dane z localStorage. Przy każdej zmianie elementów (również przy pierwszym wczytaniu) oraz próby złożenia zamówienia produkty zostają sprawdzane pod kątem dostępności w bazie danych. Jeśli któryś z produktów nie jest dostępny użytkownik zostaje poinformowany o zmianie danych koszyka. W przypadku gdy koszyk posiada przynajmniej jeden element użytkownik ma możliwość złożyć zamówienie dzięki formularzowi zamówienia stworzonego za pomocą Formik oraz walidacji Yup (budowa znajduje się w komponencie CheckoutForm). Podczas jego wypełniania jest również możliwość zastosowania kuponu, który może mieć datę ważności oraz limit użyć. Przykładowe kupony, które znajdują się w bazie danych to: "Coupon15", "Coupon20", "Coupon25", a możliwość ich zarządzania zostanie dodana w przyszłości. Gdy użytkownik jest zalogowany podczas tworzenia zamówienia ma możliwość wglądu do jego szczegółów z poziomu strony użytkownika, a po jego dokonaniu zostaje zaktulizowana ilość magazynowa produktu oraz limit użyć kuponu (jeśli został zastosowany). Ze względu na to, by umożliwić łatwiejszy wgląd na tworzenie się zamówień, postanowiłem zrezygnować z bramki płatności Stripe.

Panel wyszukiwania produktów w przypadku dekstopów po wprowadzeniu frazy automatycznie wysunie panel z wynikami. Korzystając z urządzeń mobilnych najpierw należy zatwierdzić szukanie.

W momencie, gdy jesteśmy zalogowani przycisk listy życzeń oraz moje konto powodują przeniesienie na stronę użytkownika. Z tego miejsca mamy dostęp do listy złożonych zamówień, listy życzeń, zmiany danych konta oraz trybu administratora, jeśli konto posiada takie uprawnienia. W zależnie od tego, którą opcję wybierzemy, zostają wczytane odpowiednie dane przypisane do konta. W zamówieniach możemy przejść do podstrony zawierającej szczegóły wybranego, do której ma dostęp tylko powiązany użytkownik lub administrator. Pełne dane produktów z listy życzeń zostają pobrane dopiero w momencie jej przeglądania ze względu na to, że w globalnym stanie są przechowywane tylko ich id oraz data dodania. Jeśli konto nie posiada uprawnień administratorskich, ma również możliwość zmiany danych takich jak e-mail, hasło, imię, nazwisko, numer telefonu, które potem mogą ułatwić składanie zamówień.

Konto administratora posiada możliwość zarządzania produktami, gdzie, aby dodać lub edytować produkt, dane formularza należy podać w języku polskim oraz angielskim. W przypadku dodawania nowych zdjęć zostają one wgrane na hosting Cloudinary, stare pozostają w tej samej strukturze (link url), a galeria zachowuje kolejność ich dodawania.
Podczas tworzenia nowego produktu, po wypełnieniu formularza jest możliwość wysłania danych do serwera gdzie sprawdzane jest czy produkt o wybranej kategorii oraz nazwie produktu już istnieje (w tym wypadku angielskiej odmianie tytułu, ze względu na tworzenie slugu na jego podstawie) i w wyniku pozytywnego rezultatu w bazie danych zostaje utworzony nowy produkt. Cały formularz (jak i poprzedni dotyczący zmiany danych użytkownika) został utworzony za pomocą Formik oraz walidacji Yup.

W dalszym ciągu w aplikacji zostanie umieszczone zarządzanie zamówieniami, kategoriami, kuponami oraz użytkownikami dla administratora i tak zwany infinityScroll dla listy produktów mający na celu automatyczne wczytywanie się dodatkowych produktów z bazy danych po scrollowaniu.