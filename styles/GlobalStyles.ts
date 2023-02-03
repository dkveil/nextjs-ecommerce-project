import { createGlobalStyle } from "styled-components";
import { variablesTheme } from "./theme";
import { media } from "./theme";

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'proxima';
        src: url('/fonts/ProximaNovaThin.woff2');
        font-weight:  ${variablesTheme.font.weight.thin};
        font-style: normal;
    }
    @font-face {
        font-family: 'proxima';
        src: url('/fonts/ProximaNovaRegular.woff2');
        font-weight: ${variablesTheme.font.weight.normal};
        font-style: normal;
    }
    @font-face {
        font-family: 'proxima';
        src: url('/fonts/ProximaNovaBold.woff2');
        font-weight: ${variablesTheme.font.weight.bold};
        font-style: normal;
    }

    *, *::before, *::after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
    }
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        font-family: 'proxima';
    }
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    .container {
        width: 100%;
        padding: 0 15px;
        margin: 0 auto;
        height: inherit;

        @media (min-width: ${media.desktop}px){
            padding: 0 4.444444%;
        }

        @media (min-width: ${media.large}px){
            max-width: 1312px;
        }
    }
`

export default GlobalStyles;