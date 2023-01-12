import styled, { css } from "styled-components";

export const HeroContainer = styled.div<{showButtons: boolean}>`
    position: relative;
    height: 320px;
    z-index: 0;

    ${({theme}) => theme.mq.desktop}{
        height: 720px;
    }

    ::after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,.3);
        z-index: 0;
    }

    .inner-hero {
        position: absolute;
        z-index: 1;
        padding: 40px;
        text-align: center;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
        text-transform: uppercase;

        ${({theme}) => css`
            color: ${theme.color.body.primary};
            font-weight: ${theme.font.weight.bold};
        `}

        .hero-heading {
            font-size: 48px;
            line-height: 0.8;

            ${({theme}) => theme.mq.desktop}{
                font-size: 64px;
            }
        }

        .hero-paragraph {
            font-size: 14px;
            margin-bottom: 20px;

            ${({theme}) => theme.mq.desktop}{
                font-size: 20px;
            }
        }

        .hero-link-button {
            display: block;
            padding: 8px 16px;
            font-size: 12px;
            width: fit-content;
            margin: 0 auto;
            text-decoration: none;

            ${({theme}) => css`
                color: ${theme.color.body.primary};
                background-color: ${theme.color.text.primary};

                ${theme.mq.desktop}{
                    padding: 10px 20px;
                    font-size: 16px;
                }
            `}
        }
    }

    .hero-button {
        display: grid;
        place-items: center;
        position: absolute;
        top: 50%;
        z-index: 2;
        height: 40px;
        width: 40px;
        transform: translateY(-50%);
        border: none;
        cursor: pointer;

        ${({theme, showButtons}) => css`
            background-color: ${theme.color.text.primary};
            svg{
                fill: ${theme.color.body.primary};
                font-size: 32px;
            }

            ${theme.mq.desktop}{
                display: ${showButtons ? 'grid' : 'none'};
            }
        `}
    }
    .left{
        left: 0;
        svg{
            transform: translateX(-2px);
        }
    }
    .right {
        right: 0;
        svg{
            transform: translateX(2px);
        }
    }

    .hero-videos-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        overflow-X: hidden;
    }
`

export const HeroVideo = styled.video<{position: number}>`
    position: absolute;
    width: 100%;
    object-fit: cover;
    height: 100%;
    top: 0;
    left: 0;
    transform: translateX(${({position}) => `${position * 100}%`});
`