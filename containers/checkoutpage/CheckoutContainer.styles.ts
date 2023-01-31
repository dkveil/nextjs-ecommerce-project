import styled from "styled-components";

export const CheckoutContainer = styled.div<{detailsOpen: boolean}>`

    ${({theme}) => theme.mq.desktop}{
        display: flex;
        flex-direction: row-reverse;
        border-bottom: none;
    }

    .checkout__summary{
        padding: 24px 20px;
        width: 100%;
        background-color: ${({theme}) => theme.color.body.secondary};
        cursor: pointer;
        border-bottom: ${({theme, detailsOpen}) => detailsOpen ? `1px solid ${theme.color.body.accent}` : 'none'} ;

        ${({theme}) => theme.mq.desktop}{
            display: none;
        }

        .inner-checkout-summary{
            display: flex;
            justify-content: space-between;
            align-items: center;

            .summary-title{
                display: flex;
                align-items: center;
                gap: 5px;

                svg{
                    transform: ${({detailsOpen}) => detailsOpen ? 'rotate(-180deg)' : 'rotate(0)'};
                    transition: .2s transform;
                    fill: ${({theme}) => theme.color.body.text};
                }
            }

            ${({theme}) => theme.mq.desktop}{
                display: none;
            }
        }
    }

    .checkout__details{
        overflow: hidden;
        background-color: ${({theme}) => theme.color.body.secondary};
        max-height: ${({detailsOpen}) => detailsOpen ? '10000px': '0px'};
        transition: max-height .2s;
        border-bottom: 1px solid ${({theme}) => theme.color.body.accent};


        ${({theme}) => theme.mq.desktop}{
            max-height: unset;
            width: 45%;
            min-height: 100%;
            padding: 70px 0;
            border-left: 1px solid ${({theme}) => theme.color.body.accent};
            border-bottom: none;
        }

        ${({theme}) => theme.mq.large}{
            width: 500px;
        }

        .checkout-details__header{
            margin-bottom: 10px;
            padding-top: 50px;
            margin: 0 15px;
        }

        .checkout-details__title{
            font-size: 22px;
        }

        .details-body__items{
            margin: 0 15px;
        }

        .details-body__cuopon{
            padding-bottom: 40px;
        }

        .details-body__cuopon{
            margin: 0 15px;

            .coupon{
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 8px;

                button {
                    cursor: pointer;
                    border: none;
                    background-color: transparent;
                    svg{
                        font-size: 16px;
                    }
                }
                span{
                    b{
                        font-weight: ${({theme}) => theme.font.weight.bold};
                    }
                }
            }

            .coupon-input-wrapper{
                display: flex;
                border: 1px solid ${({theme}) => theme.color.text.primary};

                input, button{
                    font-size: 16px;
                    border: none;
                    background-color: transparent;
                }

                input{
                    flex-grow: 1;
                    padding: 17px;
                    outline: none;
                }

                button{
                    text-transform: uppercase;
                    cursor: pointer;
                    padding: 16px;
                }
            }
        }

    }

    .details-body__total{
        border-top: 1px solid ${({theme}) => theme.color.body.accent};
        padding-top: 20px;
        padding-bottom: 20px;

        .inner-checkout-body__total{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 15px;

            .checkout-body__total-title{
                font-size: 14px;
            }

            strong{
                font-size: 22px;
            }
        }
    }

    .checkout__content{
        padding: 50px 0;

        ${({theme}) => theme.mq.desktop}{
            flex-grow: 1;
            padding: 110px 0;
        }

        .inner-checkout-content{
            margin: 0 15px;
            min-height: 360px;
            min-height: fit-content;
            display: flex;
            align-items: center;
            flex-direction: column;

            ${({theme}) => theme.mq.desktop}{
                display: flex;
                align-items: center;
                margin: 0 auto;
            }
        }

        .checkout-content__header{
            text-align: center;
            max-width: 340px;

            h3{
                font-size: 32px;
                margin-bottom: 5px;
            }
            span{
                display: block;
                margin-bottom: 10px;
            }
            a{
                color: inherit;
                text-transform: uppercase;
                letter-spacing: .1em;
                font-size: 14px;
            }
        }
    }
`

export const CreateOrderButton = styled.button`
    padding: 16px;
    border: none;
    background-color: ${({theme}) => theme.color.text.primary};
    color: ${({theme}) => theme.color.body.primary};
    text-transform: uppercase;
    cursor: pointer;
    letter-spacing: .1em;
    width: 100%;
    max-width: 555px;
    display: block;
    margin: auto;
`