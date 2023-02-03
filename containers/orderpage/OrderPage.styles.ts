import styled from "styled-components";

export const OrderPageContainer = styled.section`
    padding: 6rem 0;
    .inner-order-page{
        width: 100%;
        max-width: 920px;
        margin: auto;
    }

    .order-page{

        &__header{
            margin-bottom: 25px;
            h2{
                font-size: 32px;
                text-transform: uppercase;
            }
        }

        &__info{
            margin-bottom: 25px;

            h4{
                font-size: 20px;
                margin-bottom: 12px;
            }
        }

        &__items{
            h4{
                font-size: 20px;
                margin-bottom: 12px;
            }
            table{
                width: 100%;
            }
        }
    }
`