import styled from "styled-components";

export const CheckoutContainer = styled.div<{detailsOpen: boolean}>`

    ${({theme}) => theme.mq.desktop}{
        display: flex;
        flex-direction: row-reverse;
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
        border-bottom: 1px solid ${({theme}) => theme.color.body.accent};
        transition: max-height .2s;

        ${({theme}) => theme.mq.desktop}{
            max-height: unset;
            width: 45%;
            min-height: 100%;
            padding: 70px 0;
            border-left: 1px solid ${({theme}) => theme.color.body.accent};
        }

        ${({theme}) => theme.mq.large}{
            width: 570px;
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

            .coupon-input-wrapper{
                display: flex;
                border: 1px solid ${({theme}) => theme.color.text.primary};

                input, button{
                    font-size: 16px;
                    border: none;
                    background-color: transparent;
                    flex-grow: 1;
                }

                input{
                    padding: 17px;
                    outline: none;
                }

                button{
                    text-transform: uppercase;
                    width: fit-content;
                    cursor: pointer;
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
            height: 360px;
            min-height: fit-content;
            display: flex;
            align-items: center;

            ${({theme}) => theme.mq.desktop}{
                display: flex;
                align-items: center;
                flex-direction: column;
                margin: 0 auto;
            }
        }

        .checkout-content__header{
            font-size: 32px;
            text-align: center;

            ${({theme}) => theme.mq.desktop}{
                margin-bottom: 20px;
                width: 340px;
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