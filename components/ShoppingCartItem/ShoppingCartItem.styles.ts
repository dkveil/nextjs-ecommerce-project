import styled from "styled-components";

export const ShoppingCartItemWrapper = styled.tr`
    position: relative;
    width: 100%;
    border-bottom: 1px solid ${({theme}) => theme.color.body.accent};
    display: flex;
    flex-direction: column;
    padding: 16px 0;

    ${({theme}) => theme.mq.desktop}{
        display: table-row;
    }

    a{
        text-decoration: none;
        color: inherit;
    }

    :last-child{
        border-bottom: none;
    }

    .cart-item__img{
        position: relative;
        display: none;

        ${({theme}) => theme.mq.desktop}{
            display: table-cell;
            width: 100px;
        }

        .image-wrapper{
            position: relative;
            width: 100px;
            aspect-ratio: 1/1;

            img{
                background-color: transparent;
            }
        }
    }

    .cart-item__name{
        text-transform: uppercase;
        padding-right: 100px;
        max-width: 100%;
        margin-bottom: 10px;

        h5{
            font-size: 18px;
        }
        p{
            font-size: 12px;
            color: ${({theme}) => theme.color.body.accent};
        }

        ${({theme}) => theme.mq.desktop}{
            padding: 0;
            padding-left: 20px;
            vertical-align: middle;
        }
    }

    .cart-item__size{
        font-size: 12px;
        text-transform: uppercase;
        margin-bottom: 10px;

        ${({theme}) => theme.mq.desktop}{
            vertical-align: middle;
            text-align: center;
            width: 90px;
            font-size: 16px;
        }
    }

    .cart-item__quantity{
        display: flex;
        justify-content: space-between;

        ${({theme}) => theme.mq.desktop}{
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            width: 200px;
            max-width: 200px;
        }

        .buttons-group{
            display: flex;
            align-items: center;
            gap: 6px;

            ${({theme}) => theme.mq.desktop}{
                display: inline-flex;
                margin-right: 20px;
                gap: 10px;
            }

            button{
                padding: 6px;
                background-color: transparent;
                border: 1px solid ${({theme}) => theme.color.text.primary};
                cursor: pointer;

                svg{
                    fill: ${({theme}) => theme.color.text.primary};
                }
            }

            span{
                font-size: 16px;
            }
        }

        .remove-button{
            background-color: transparent;
            border: none;
            color: ${({theme}) => theme.color.body.accent};
            text-transform: uppercase;
            cursor: pointer;
        }
    }

    .cart-item__price{
        position: absolute;
        top: 16px;
        right: 0;
        text-align: end;
        vertical-align: middle;

        ${({theme}) => theme.mq.desktop}{
            position: static;
        }
    }
`