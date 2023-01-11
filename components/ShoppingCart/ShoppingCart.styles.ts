import styled, { keyframes, css } from "styled-components";

const showShoppingCart = keyframes`
    from {
        opacity: 0;
        transform: translateY(-100%);
    }
    to{
        transform: translateX(0);
        opacity: 1;
    }
`

export const ShoppingCartContainer = styled.div<{closeAnimation: boolean}>`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${({theme}) => theme.color.body.primary};
    animation: .2s ${showShoppingCart};
    transform: ${({closeAnimation}) => closeAnimation ? 'translateY(-100%)' : 'translateX(0)'};
    transition: transform .2s;
    padding: 60px 20px 20px;
    z-index: ${({theme}) => theme.zindex.usercarts};

    .inner-shoppingcart{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    .shoppingcart-header{
        display: flex;
        justify-content: space-between;
        text-transform: uppercase;

        ${({theme}) => css`
            border-bottom: 1px solid ${theme.color.body.accent};
            color: ${theme.color.text.primary};
        `}

        button{
            display: flex;
            align-items: center;
            height: 100%;
            background-color: transparent;
            border: none;
            cursor: pointer;

            svg{
                font-size: 26px;
                fill: ${({theme}) => theme.color.text.primary};
            }
        }
    }

    .shoppingcart-body {
        flex-grow: 1;
    }

    .shoppingcart-summary{
        display: flex;
        width: 100%;
        justify-content: space-between;
        font-size: 18px;
        margin-bottom: 20px;
        text-transform: uppercase;
    }

    .shoppingcart-footer{
        padding: 20px 0 40px;
        border-top: 1px solid ${({theme}) => theme.color.body.accent};

        button {
            text-transform: uppercase;
            border: none;
            width: 100%;
            height: 56px;
            cursor: pointer;

            ${({theme}) => css`
                color: ${theme.color.body.primary};
                background-color: ${theme.color.text.primary};
                font-weight: ${theme.font.weight.bold};
            `}
        }
    }
`