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
        desktop: `@media (min-width: ${media.desktop}px)`,
        large: `@media (min-width: ${media.large}px)`
    },
    themeTrainsition: 'color .2s, background-color .2s'
}