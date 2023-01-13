import styled, { css } from "styled-components";

export const ProductInfoContainer = styled.section`
    padding: 80px 0;
    background-color: ${({theme}) => theme.color.body.primary};

    ${({theme}) => theme.mq.desktop}{
        .inner-product-info {
            display: flex;
            flex-direction: row-reverse;
            gap: 60px;
        }

        .product-headbodywrapper{
            display: flex;
            flex-direction: column-reverse;
        }

        .product-images {
            width: 58%;
        }

        .product-info {
            width: 42%;
        }
    }

    .image-displayer{
        position: relative;
        width: 100%;
        aspect-ratio: 1/1;
        margin-bottom: 30px;

        ${({theme}) => theme.mq.desktop}{
            aspect-ratio: 16/14;
        }
    }

    .product-info {
        position: relative;
        margin-top: 30px;
        padding: 30px 0;

        ::after{
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100vw;
            height: 1px;
            background-color: ${({theme}) => theme.color.body.accent};

        }
        ${({theme}) => theme.mq.desktop}{
            margin: 0;
            padding: 0;

            ::after{
                display: none;
            }
        }

    }

    .product-body {
        .stock{
            font-size: 16px;
            text-transform: uppercase;
            margin-bottom: 1rem;
            color: ${({theme}) => theme.color.text.primary};
        }
    }

    .product-header{
        padding: 40px 0;

        h1{
            font-size: 48px;
            text-transform: uppercase;
            line-height: .9;

            ${({theme}) => css`
                color: ${theme.color.text.primary};
                font-weight: ${theme.font.weight.bold};
            `}
        }
        h2{
            text-transform: uppercase;
            font-weight: ${({theme}) => theme.font.weight.bold};
            margin-bottom: 20px;

            ${({theme}) => css`
                color: ${theme.color.body.accent};
                font-weight: ${theme.font.weight.bold};
            `}
        }
        p{
            font-size: 14px;
            line-height: 1.5;
            color: ${({theme}) => theme.color.text.primary};
        }
    }

    .product-details {
        details {
            border: 1px solid ${({theme}) => theme.color.body.accent};
            border-left: none;
            border-right: none;

            summary{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 0;
                text-transform: uppercase;
                list-style: none;
                color: ${({theme}) => theme.color.text.primary};
                cursor: pointer;

                ::after{
                    display: none;
                }
                svg{
                    font-size: 24px;
                }
            }
            div{
                font-size: 14px;
                line-height: 1.5;
                color: ${({theme}) => theme.color.text.primary};
                padding-bottom: 16px;
                cursor: pointer;
            }
        }
    }

    .add-to-wishlist{
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        text-transform: uppercase;
        background-color: transparent;
        border: none;
        color: ${({theme}) => theme.color.text.primary};
        padding: 12px 0;
        cursor: pointer;

        svg{
            height: 21px;
            width: 21px;
            fill: ${({theme}) => theme.color.text.primary};
        }

        ${({theme}) => theme.mq.desktop}{
            margin-bottom: 30px;
        }
    }
`

export const ImageCarousel = styled.div`
    display: flex;
    width: 100%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    #image-carousel {
        width: fit-content;
        display: flex;
        gap: 10px;

        div{
            scroll-snap-align: start;
            position: relative;
            width: 92px;
            aspect-ratio: 1;
            cursor: pointer;
        }
    }
`

export const ButtonWrapper = styled.div<{type: 'options' | 'cart', blocked?: boolean}>`
    position: relative;
    width: inherit;

    ${({theme, blocked}) => !blocked && css`
        .option {
            background-color: ${theme.color.body.primary};
            color: ${theme.color.text.primary};
            border: 1px solid ${theme.color.text.primary};
        }
        .add-to-cart {
            background-color: ${theme.color.text.primary};
            color: ${theme.color.body.primary};
            border: none;
        }
    `}
    .option, .add-to-cart {
        ${({theme, blocked}) => blocked && css`
            background-color: ${theme.color.body.accent};
            color: ${theme.color.body.primary};
            pointer-events: none;
            border: none;
        `}

        position: relative;
        width: 100%;
        height: 41px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: .1em;
        text-align: left;
        padding: 6px 13px;
        margin-bottom: 7px;
        cursor: pointer;
    }

    ${({type}) => type === 'cart' && css`
        .price{
            position: absolute;
            font-size: 20px;
            top: 50%;
            right: 13px;
            transform: translateY(-50%);
        }
    `}

    ${({type}) => type === 'options' && css`
        .size{
            position: absolute;
            font-size: 20px;
            top: 50%;
            right: 13px;
            transform: translateY(-50%);
        }
    `}
    ul{
        position: absolute;
        z-index: 1;
        top: calc(100% - 7px);
        width: 100%;
        border-top: 1px solid ${({theme}) => theme.color.body.accent};
    }
`

export const OptionsButton = styled.button<{instock: boolean}>`
    width: 100%;
    height: 41px;
    border: none;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: .1em;
    text-align: left;
    padding: 6px 13px;
    cursor: pointer;

    ${({theme}) => css`
        color: ${theme.color.body.primary};
        background-color: ${theme.color.text.primary};
        border-bottom: 1px solid ${theme.color.body.accent};
    `}

    ${({instock}) => !instock && css`
        position: relative;
        background-color: ${({theme}) => theme.color.body.secondary};
        color: ${({theme}) => theme.color.text.primary};

        .outofstock {
            position: absolute;
            font-size: 20px;
            top: 50%;
            right: 13px;
            transform: translateY(-50%);
        }
    `}

`