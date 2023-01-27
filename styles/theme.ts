export const lightThemePallete = {
    color: {
        body: {
            primary: 'white',
            secondary: '#f5f5f5',
            accent: '#cacaca'
        },
        text: {
            primary: 'black'
        }
    }
}

export const darkThemePallete = {
    color: {
        body: {
            primary: 'black',
            secondary: '#111111',
            accent: '#4d4d4d'
        },
        text: {
            primary: 'white'
        }
    }
}

export const media = {
    tablet: 768,
    desktop: 992,
    large: 1440
}

export const variablesTheme = {
    font: {
        weight:{
            thin: 200,
            light: 300,
            normal: 400,
            bold: 700,
        }
    },
    mq: {
        tablet: `@media (min-width: ${media.tablet}px)`,
        desktop: `@media (min-width: ${media.desktop}px)`,
        large: `@media (min-width: ${media.large}px)`
    },
    themeTrainsition: 'color .2s, background-color .2s',
    zindex: {
        header: 999,
        overlay: 9999,
        searchresultsdesktop: 99998,
        usercarts: 99999,
        searchresultsmobile: 999999,
        filterscart: 9999999,
        loadingcontainer: 99999999,
        notify: 999999999,
    }
}