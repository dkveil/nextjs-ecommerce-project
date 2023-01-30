import styled from "styled-components";

export const FooterContainer = styled.footer`
    padding: 40px 0 0;
    border-top: 1px solid ${({theme}) => theme.color.body.accent};

    ${({theme}) => theme.mq.desktop}{
        .footer-content{
            display: flex;
        }
    }

    .footer-items-group{
        ${({theme}) => theme.mq.desktop}{
            flex: 0 0 82%;
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
    }

    .footer-logo{
        margin-bottom: 40px;
        flex: 0 0 33.3333%;

        h3{
            font-size: 36px;
            text-align: center;
            margin-bottom: 20px;
            font-weight: ${({theme}) => theme.font.weight.thin};

            ${({theme}) => theme.mq.desktop}{
                font-size: 14px;
                line-height: 1.4;
                font-weight: ${({theme}) => theme.font.weight.normal};
                letter-spacing: .1em;
                text-align: start;
                max-width: 280px;
            }
        }

        p{
            font-size: 14px;
            line-height: 1.4;
            text-align: center;
            color: ${({theme}) => theme.color.text.secondary};

            ${({theme}) => theme.mq.desktop}{
                text-align: start;
                max-width: 280px;
            }
        }
    }

    .footer-socials{
        display: none;

        h3{
            display: flex;
            justify-content: space-between;
            padding: 16px 0;
            font-size: 14px;
            line-height: 17px;
            letter-spacing: .1em;
            text-transform: uppercase;

            ${({theme}) => theme.mq.desktop}{
                padding: 0 0 16px;
                max-width: 280px;
            }
        }

        ul{
            display: flex;
            gap: 20px;
        }

        svg{
            font-size: 17px;
        }

        a{
            color: inherit;
        }

        ${({theme}) => theme.mq.desktop}{
            display: block;
            flex: 0 0 18%;
        }
    }

    .footer-info{
        margin: 20px 0 15px;

        &__socials{
            margin-bottom: 20px;

            ${({theme}) => theme.mq.desktop}{
                display: none;
            }

            ul{
                display: flex;
                justify-content: center;
                gap: 20px;
            }

            svg{
                font-size: 17px;
            }

            a{
                color: inherit;
            }
        }

        &__copyright{
            text-align: center;
            font-size: 12px;

            ${({theme}) => theme.mq.desktop}{
                text-align: start;
            }

            a{
                text-decoration: none;
                color: inherit;
            }
        }
    }
`

export const FooterWidget = styled.div<{open: boolean}>`
    border-top: 1px solid ${({theme}) => theme.color.body.accent};

    ${({theme}) => theme.mq.desktop}{
        border: none;
        flex: 0 0 33.3333%;
    }

    h3{
        display: flex;
        justify-content: space-between;
        padding: 16px 0;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: .1em;
        text-transform: uppercase;

        ${({theme}) => theme.mq.desktop}{
            padding: 0 0 16px;
            max-width: 280px;
        }

        svg{
            ${({theme}) => theme.mq.desktop}{
                display: none;
            }
        }
    }

    .footer-widget__content{
        display: ${({open}) => open ? 'block' : 'none'};

        ${({theme}) => theme.mq.desktop}{
            display: block;
        }

        p{
            font-size: 14px;
            line-height: 140%;
            color: ${({theme}) => theme.color.text.secondary};
            margin-bottom: 16px;

            ${({theme}) => theme.mq.desktop}{
                max-width: 280px;
            }
        }
    }
`