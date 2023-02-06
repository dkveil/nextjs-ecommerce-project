import langOptions from '../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        productsheader: 'Products list',
        addproduct: 'Add product',
        createproduct: 'Create new product',
        inpolish: 'In Polish',
        inenglish: 'In English',
        inpln: 'In PLN currency',
        ineur: 'In EUR currency',
        tshirts: 'T-shirt',
        hoodies: 'Hoodie',
        shoes: 'Shoes',
        title: 'Name of product',
        category: 'Category of product',
        price: 'Price of product',
        predesc: 'Introductory product description',
        desc: 'Full product description',
        addsize: 'Dodaj rozmiar produktu',
        sizename: 'Name of size',
        sizeInStock: 'Quantity in stock',
        invalidsizename: 'Invalid size name',
        invalidsizeinstock: 'Invalid number',
        sold: 'Number of pieces sold',
        nofiles: 'No files uploaded',
        uploadfiles: 'Upload files',
        files: 'files',
        images: 'Images of product',
        politlerequired: 'Product name in Polish is required field',
        engtitlerequired: 'English product name is required field',
        categoryrequired: 'Product category selection is required field',
        plnrequired: 'The product price in PLN is required',
        eurrequired: 'The product price in EUR is required',
        polpredescrequired: 'An initial product description in Polish is required',
        engpredescrequired: 'An initial product description in English is required',
        poldescrequired: 'A full product description in Polish is required',
        engdescrequired: 'A full product description in English is required',
        sizerequired: 'You must enter at least one size for the product',
        soldrequired: 'You need to complete the product sales number',
        invalidformat: 'Invalid format',
        imagesrequired: 'You must upload at least one product photo',
        fileerror: 'Your file is in the wrong format or weighs too much',
        fileserror: 'One or more of your files are of the wrong format or are too heavy and could not be uploaded',
        fileuploadsuccess: 'Files successfully uploaded',
        sizes: 'Sizes of product',
        sizeremoved: 'Sizes inconsistent with the selected category have been removed',
        unknowerror: 'Something went wrong...',
        nopermissions: 'Brak uprawnień do tej akcji',
        addproductsuccess: 'Product added successfully',
        productalreadyexists: 'Product with this name and category already exists'
    },
    [langOptions.POLISH]: {
        productsheader: 'Lista produktów',
        addproduct: 'Dodaj produkt',
        createproduct: 'Dodaj nowy produkt',
        inpolish: 'W języku Polskim',
        inenglish: 'W języku Angielskim',
        inpln: 'W walucie PLN',
        ineur: 'W walucie EUR',
        tshirts: 'Koszulka',
        hoodies: 'Bluza',
        shoes: 'Buty',
        title: 'Nazwa produktu',
        category: 'Kategoria produktu',
        price: 'Cena produktu',
        predesc: 'Wstępny opis produktu',
        desc: 'Pełny opis produktu',
        sizese: 'Rozmiary',
        addsize: 'Dodaj rozmiar produktu',
        sizename: 'Nazwa rozmiaru',
        sizeInStock: 'Ilość na magazynie',
        invalidsizename: 'Nieprawidłowa nazwa rozmiaru',
        invalidsizeinstock: 'Nieprawidłowa liczba',
        sold: 'Ilość sprzedanych sztuk',
        nofiles: 'Nie wgrano plików',
        uploadfiles: 'Wgraj pliki',
        files: 'plików',
        images: 'Zdjęcia produktu',
        politlerequired: 'Nazwa produktu w języku polskim jest wymagana',
        engtitlerequired: 'Nazwa produktu w języku angielskim jest wymagana',
        categoryrequired: 'Wybór kategorii produktu jest wymagany',
        plnrequired: 'Cena produktu w walucie PLN jest wymagana',
        eurrequired: 'Cena produktu w walucie EUR jest wymagana',
        polpredescrequired: 'Wstępny opis produktu w języku polskim jest wymagany',
        engpredescrequired: 'Wstępny opis produktu w języku angielskim jest wymagany',
        poldescrequired: 'Pełny opis produktu w języku polskim jest wymagany',
        engdescrequired: 'Pełny opis produktu w języku angielskim jest wymagany',
        sizerequired: 'Musisz wprowadzić chociaż jeden rozmiar dla produktu',
        soldrequired: 'Musisz uzupełnić liczbę sprzedaży produktu',
        invalidformat: 'Nieprawidłowy format',
        imagesrequired: 'Musisz wgrać przynajmniej jedno zdjęcie produktu',
        fileerror: 'Twój plik ma nieprawidłowy format lub waży zbyt dużo',
        fileserror: 'Jeden lub więcej z Twoich plików ma nieprawidłowy format lub waży zbyt dużo',
        fileuploadsuccess: 'Udało się wgrać pliki',
        sizes: 'Rozmiary produktu',
        sizeremoved: 'Usunięto rozmiary niezgodne z wybraną kategorią',
        unknowerror: 'Coś poszło nie tak...',
        nopermissions: 'Brak uprawnień do tej akcji',
        addproductsuccess: 'Dodawanie produktu zakończone sukcesem',
        productalreadyexists: 'Produkt o takiej nazwie i kategorii już istnieje'
    }
}