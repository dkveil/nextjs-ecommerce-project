import styled, { keyframes, css } from "styled-components"

const showNotify = keyframes`
    from {
        transform: translateX(100%);
    }
    to{
        transform: translateX(0);
    }

`

export const NotifyWrapper = styled.div<{closeAnimation: boolean, websiteTheme: 'light theme' | 'dark theme'}>`
    position: fixed;
    top: 20vh;
    right: 0;
    min-width: 90vw;
    padding: 30px 20px;
    transition: transform .4s;
    animation: .4s ${showNotify};

    ${({theme, websiteTheme, closeAnimation}) => css`
        transform: ${closeAnimation ? 'translateX(100%)' : 'translateX(0)'};
        background-color: ${theme.color.text.primary};
        color: ${theme.color.body.primary};
        box-shadow: 1px 2px 10px ${websiteTheme === 'light theme' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)'};

        ${theme.mq.tablet}{
            min-width: 300px;
        }
    `}

`