import styled from "styled-components"

export const ProductManagerItemWrapper = styled.div`
    padding: 20px 0;
    display: flex;

    .image-wrapper{
        position: relative;
        min-width: 80px;
        height: 80px;
        aspect-ratio: 1/1;
        margin-right: 15px;

        ${({theme}) => theme.mq.desktop}{
            width: 100px;
        }
    }

    .product-body{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;

        ${({theme}) => theme.mq.desktop}{
            flex-direction: row;
            align-items: center;
        }

        &__info{
            text-transform: uppercase;
            flex-grow: 1;

            h3{
                font-size: 18px;
            }
            p{
                font-size: 12px;
                color: ${({theme}) => theme.color.text.secondary};
            }
        }

        &__buttons {
            display: flex;
            width: 100%;
            gap: 10px;

            ${({theme}) => theme.mq.desktop}{
                width: 300px;
                justify-content: flex-end;
            }

            a, button {
                display: block;
                text-align: center;
                font-size: 12px;
                border: none;
                background-color: ${({theme}) => theme.color.text.primary};
                color: ${({theme}) => theme.color.body.primary};
                padding: 10px 6px;
                text-transform: uppercase;
                line-height: 1;
                cursor: pointer;
                height: fit-content;
            }
        }
    }
`