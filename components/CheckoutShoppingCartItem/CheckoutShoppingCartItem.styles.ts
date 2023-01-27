import styled from "styled-components";

export const CheckoutItemContainer = styled.div`
    display: flex;
    padding: 20px 0;

    a{
        color: inherit;
        text-decoration: none;
    }

    .image-wrapper {
        position: relative;
        width: 90px;
        aspect-ratio: 1/1;
        margin-right: 12px;
    }

    .checkout-item__info{
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        flex: 1;
        margin-right: 20px;


        h3{
            font-size: 18px;
        }
        p{
            font-weight: ${({theme}) => theme.font.weight.bold};
            font-size: 12px;
            text-transform: uppercase;
            color: ${({theme}) => theme.color.body.accent};
        }
        .checkout-item__size{
            font-size: 12px;
            text-transform: uppercase;
        }
        .checkout-item__quantity{
            font-size: 12px;
            text-transform: uppercase;
        }
    }

    .checkout-item__price{
        font-size: 18px;

    }



`