import styled from "styled-components";

export const WishlistItemWrapper = styled.div`
    width: 100%;

    ${({theme}) => theme.mq.desktop}{
        display: flex;
    }

    a{
        color: inherit;
        text-decoration: none;
    }

    .wishlist-product-header{
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;

        ${({theme}) => theme.mq.desktop}{
            flex-grow: 3;
            margin-bottom: 0;
        }
    }

    .image-wrapper{
        position: relative;
        width: calc(40% - 25px);
        max-width: 170px;
        aspect-ratio: 1/1;
        margin-right: 25px;

    }

    .wishlist-product-info{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &__head{
            ${({theme}) => theme.mq.desktop}{
                flex-direction: row;
            }
            h3{
                font-size: 18px;
                margin-bottom: 5px;
            }
            p{
                font-size: 12px;
                text-transform: uppercase;
                color: ${({theme}) => theme.color.body.accent};
            }
        }

        button{
            background-color: transparent;
            border: none;
            width: fit-content;
            font-size: 14px;
            line-height: 140%;
            cursor: pointer;
            color: ${({theme}) => theme.color.text.secondary};
        }
    }

    .wishlist-product-details{

        ${({theme}) => theme.mq.desktop}{
            flex-grow: 1;
            height: inherit;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        &__date{
            display: flex;
            justify-content: space-between;
            margin-bottom: 1em;

            span{
                font-size: 14px;
            }
        }

        &__price{
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;

            span{
                font-size: 14px;
            }
        }

        a{
            display: block;
            width: 100%;
            letter-spacing: .125em;
            text-transform: uppercase;
            text-align: center;
            padding: 16px;
            border: none;
            font-size: 14px;
            background-color: ${({theme}) => theme.color.text.primary};
            color: ${({theme}) => theme.color.body.primary};
        }
    }
`