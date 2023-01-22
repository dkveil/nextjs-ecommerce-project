import styled from "styled-components";

export const ProductsHeaderWrapper = styled.section`
    padding: 60px 0 40px;

    .products-header__title{
        font-size: 32px;
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 10px;

        ${({theme}) => theme.mq.desktop}{
            font-size: 56px;
            margin-bottom: 14px;
        }
    }
    .products-header__description{
        font-size: 12px;
        font-weight: ${({theme}) => theme.font.weight.thin};
        text-align: center;
        width: 90%;
        margin: auto;

        ${({theme}) => theme.mq.desktop}{
            font-size: 16px;
            width: 60%;
        }
    }

`