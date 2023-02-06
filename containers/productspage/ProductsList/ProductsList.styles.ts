import styled from "styled-components";

export const ProductsListWrapper = styled.section`
    background-color: ${({theme}) => theme.color.body.primary};
    padding-bottom: 160px;

    .featured-products__wrapper{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 30px;
        grid-row-gap: 20px;
        width: 100%;

        ${({theme}) => theme.mq.tablet}{
            grid-template-columns: 1fr 1fr 1fr;
        }

        ${({theme}) => theme.mq.desktop}{
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
`