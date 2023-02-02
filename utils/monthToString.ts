interface IMonths {
    [id: string]: { [id: number]: string }
}

const monthToString = ({currentLanguage, monthNumber}: {currentLanguage: 'ENG' | 'PL', monthNumber: number}) => {

    const months: IMonths = {
        ENG: {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December'
        },
        PL: {
            1: 'Styczeń',
            2: 'Luty',
            3: 'Marzec',
            4: 'Kwiecień',
            5: 'Maj',
            6: 'Czerwiec',
            7: 'Lipiec',
            8: 'Sierpień',
            9: 'Wrzesień',
            10: 'Październik',
            11: 'Listopad',
            12: 'Grudzień'
        },
    }

    return months[currentLanguage][monthNumber];
}

export default monthToString