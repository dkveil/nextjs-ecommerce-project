import styled, { css } from "styled-components";

export default styled.button<{activeTheme: 'light theme' | 'dark theme'}>`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    border-radius: 50px;
    z-index: 0;
    cursor: pointer;
    width: fit-content;


    ${({theme}) => css`
        border: 1px solid ${theme.color.text.primary};
        background: linear-gradient(145deg, ${theme.color.body.primary}, ${theme.color.body.secondary});
    `}

    svg.active{
        fill: ${({theme}) => theme.color.body.primary};
    }

    span{
        position: absolute;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        top: -1px;
        left: -3px;
        transform: ${({activeTheme}) => activeTheme === 'light theme' ? 'translateX(0)' : 'translateX(calc(100% - 7px))'};
        transition: transform .2s, background-color .2s;
        z-index: 0;
        background-color: ${({theme}) => theme.color.text.primary};
    }

    .sun, .moon {
        font-size: 30px;
        width: 100%;
        height: 80%;
        z-index: 1;
        transition: fill .2s;
    }

    .sun {
        fill: ${({theme, activeTheme}) => activeTheme === 'light theme' ? theme.color.body.primary : theme.color.text.primary};
    }

    .moon {
        fill: ${({theme, activeTheme}) => activeTheme === 'light theme' ? theme.color.body.text : theme.color.body.primary};
    }
`