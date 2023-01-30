import styled from "styled-components";

export const FeaturedProductsSection = styled.section`
    padding: 50px 0 30px;

    ${({theme}) => theme.mq.desktop}{
        padding: 60px 0 38px;
    }

    .featured-products__desc{
        margin-bottom: 40px;

        span{
            font-size: 14px;
        }

        h2{
            font-size: 42px;
            margin-bottom: 15px;
            font-weight: ${({theme}) => theme.font.weight.light};
        }

        p{
            font-size: 14px;
            margin-bottom: 1rem;
            max-width: 600px;
        }

        a{
            font-size: 12px;
            letter-spacing: .1em;
            color: inherit;
            text-decoration: none;
            text-transform: uppercase;

            :hover{
                text-decoration: underline;
            }
        }
    }

    .featured-products__items{
        .first-group{
            display: grid;
            grid-template-columns: 1fr;
            margin-bottom: 30px;
            grid-gap: 30px;

            ${({theme}) => theme.mq.desktop}{
                grid-template-columns: 1fr 1fr;
            }
        }
        .second-group{
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 30px;

            ${({theme}) => theme.mq.desktop}{
                grid-template-columns: 1fr 1fr 1fr;
            }
        }
    }
`