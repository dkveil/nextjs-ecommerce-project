import styled from "styled-components";

export const NewestProductsSection = styled.section`
    padding: 50px 0 0;
    border-bottom: 1px solid ${({theme}) => theme.color.body.accent};

    ${({theme}) => theme.mq.desktop}{
        padding: 120px 0 50px;
    }

    .inner-newest-products{

        ${({theme}) => theme.mq.desktop}{
            display: flex;
        }

        .newest-products__desc{
            margin-bottom: 40px;

            ${({theme}) => theme.mq.desktop}{
                padding-right: 30px;
            }

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

        .newest-products__items{
            overflow: hidden;
            position: relative;

            ${({theme}) => theme.mq.desktop}{
                flex: 0 0 70%;
                max-width: 70%;
            }

            .slick-track{
                display: flex;
                gap: 10px;
            }

            .slick-slider{
                 ${({theme}) => theme.mq.desktop}{
                    width: calc(100% - 100px);
                    margin: auto;
                    z-index: 1;
                    position: relative;
                }
            }

            .carousel-nav{
                display: flex;
                justify-content: space-between;

                ${({theme}) => theme.mq.desktop}{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                }

                button{
                    padding: 16px;
                    border: none;
                    background-color: transparent;
                    cursor: pointer;

                    ${({theme}) => theme.mq.desktop}{
                        position: absolute;
                        top: 40%;
                        transform: translateY(-50%);

                        :first-child{
                            left: 0;
                        }

                        :nth-child(2){
                            right: 0;
                        }
                    }

                    svg{
                        fill: ${({theme}) => theme.color.text.primary};
                    }
                }
            }
        }

    }

`

export const ImageCarousel = styled.div<{currentSlide: number}>`
    display: flex;
    transform: ${({currentSlide}) => `translateX(${currentSlide * -205}px)`};
    transition: transform .4s;
    margin-bottom: 60px;
`

export const NewestProductsCarousel = styled.div`
    background-color: yellow;

    ${({theme}) => theme.mq.desktop}{
        flex: 0 0 70%;
        max-width: 70%;
    }
`