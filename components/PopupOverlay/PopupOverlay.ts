import styled, { keyframes} from "styled-components";

const showPopupOverlay = (websiteTheme: 'dark theme' | 'light theme') => keyframes`
    from {
        background-color: transparent;
    }
    to {
        background-color: ${websiteTheme === 'light theme' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)'};
    }
`



export default styled.div<{websiteTheme: 'dark theme' | 'light theme', closeAnimation: boolean}>`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${({closeAnimation, websiteTheme}) => closeAnimation ? 'transparent' : websiteTheme === 'light theme' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)'};;
    animation: .2s ${({websiteTheme}) => showPopupOverlay(websiteTheme)};
    transition: ${({closeAnimation}) => closeAnimation ? '.2s .2s background-color' : '.2s background-color'};
    z-index: ${({theme}) => theme.zindex.overlay};
`