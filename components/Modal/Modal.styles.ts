import styled, {keyframes} from "styled-components"

const showOverlay = (websiteTheme: 'dark theme' | 'light theme') => keyframes`
    from{
        background-color: transparent;
    }
    to{
        background-color: ${websiteTheme === 'light theme' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)'};
    }
`

const showModal = keyframes`
    from{
        transform: translate(-50%, calc(-50% - 100px));
        opacity: 0;
    }
    to{
        transform: translate(-50%, -50%);
        opacity: 1;
    }

`

export const ModalContainer = styled.div<{closeAnimation: boolean, websiteTheme: 'dark theme' | 'light theme'}>`
    position: fixed;
    min-height: 100%;
    min-width: 100%;
    top: 0;
    left: 0;

    .modal-overlay{
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background-color: ${({closeAnimation, websiteTheme}) => closeAnimation ? 'transparent' : websiteTheme === 'light theme' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)'};
        animation: .2s ${({websiteTheme}) => showOverlay(websiteTheme)};
        transition: .2s background-color;
    }

    .modal-content{
        position: fixed;
        margin: 0 auto;
        top: 50%;
        left: 50%;
        transform: ${({closeAnimation}) => closeAnimation ? 'translate(-50%, calc(-50% - 100px))' : 'translate(-50%, -50%)'};
        transform: translate(-50%, -50%);
        width: calc(100% - 30px);
        max-width: 516px;
        background-color: ${({theme}) => theme.color.body.primary};
        animation: .4s ${showModal};
        transition: .2s transform, .2s opacity;
        opacity: ${({closeAnimation}) => closeAnimation ? 0 : 1};
        z-index: 99;
        max-height: calc(100% - 30px);
        overflow-y: auto;
    }

    .modal-header{
        position: relative;
        height: 55px;

        button{
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            background-color: transparent;
            border: none;
            cursor: pointer;

            svg{
                font-size: 26px;
                fill: ${({theme}) => theme.color.text.primary};
            }
        }
    }

`