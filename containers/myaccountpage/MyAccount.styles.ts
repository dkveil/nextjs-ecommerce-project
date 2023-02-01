import Link from "next/link";
import styled from "styled-components";

export const MyAccountSection = styled.section`
    padding: 50px 15px;

    a{
        color: inherit;
        text-decoration: none;
    }

    .my-account__header{
        h2{
            font-size: 42px;
            text-align: center;
            margin-bottom: 45px;
        }
    }

    .my-account__body{
        display: flex;
        align-items: center;
        flex-direction: column;

        nav{
            width: fit-content;
            padding: 0 15px;
            margin-left: -15px;
            margin-right: -15px;
            margin-bottom: 47px;

            ul{
                display: flex;
                justify-content: center;
                flex-direction: column;
                border: 1px solid ${({theme}) => theme.color.body.accent};

                ${({theme}) => theme.mq.desktop}{
                    flex-direction: row;
                    padding: .4rem 0;
                }

                li:last-child a{
                    border-right: none;
                }
            }
        }
    }

    .my-account__items{
        width: 100%;
        display: flex;
        justify-content: center;
    }

`

export const NavItem = styled.li<{active: boolean}>`
    display: flex;
    justify-content: center;

    a {
        padding: 12px 24px 10px;
        line-height: 1.2;
        text-transform: uppercase;
        text-align: center;
        font-size: 14px;
        font-weight: ${({theme}) => theme.font.weight.normal};
        letter-spacing: .15em;
        display: block;
        width: 100%;
        border-right: 0.5px solid ${({theme}) => theme.color.body.accent};
        opacity: ${({active}) => active ? 1 : 0.5 };
    }

`