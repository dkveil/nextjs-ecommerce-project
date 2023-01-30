import langOptions from '../../utils/languageOptions'

interface ILangOptions {
    [id: string]: { [id: string]: string }
}

export default <ILangOptions> {
    [langOptions.ENGLISH]: {
        contact: 'Contact',
        openinghours: 'Opening hours',
        followus: 'Follow us',
        monday: 'Monday 8.00am - 5.00pm',
        tuesday: 'Tuesday 8.00am - 5.00pm',
        wednesday: 'Wednesday 8.00am - 5.00pm',
        thursday: 'Thursday 8.00am - 5.00pm',
        friday: 'Friday 8.00am - 3.00pm',
        saturday: 'Saturday 10.00am - 6.00pm',
        sunday: 'Sunday closed',
    },
    [langOptions.POLISH]: {
        contact: 'Kontakt',
        openinghours: 'Godziny otwarcia',
        followus: 'Obserwuj nas',
        monday: 'Poniedziałek 8:00 - 17:00',
        tuesday: 'Wtorek 8:00 - 17:00',
        wednesday: 'Środa 8:00 - 17:00',
        thursday: 'Czwartek 8:00 - 17:00',
        friday: 'Piątek 8:00 - 17.00',
        saturday: 'Sobota 10:00 - 18:00',
        sunday: 'Niedziela zamknięte',
    }
}