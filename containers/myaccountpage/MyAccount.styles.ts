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

        ul{
            width: 100%;

            li{
                border-bottom: 1px solid ${({theme}) => theme.color.body.accent};
                padding-bottom: 62px;
                margin-bottom: 62px;

                :last-child{
                    border-bottom: none;
                }
            }
        }

        table, td, tr{
            border: 1px solid ${({theme}) => theme.color.text.primary};
        }

        table{
            width: 100%;
            border-collapse: collapse;
            text-align: center;
            overflow-x: scroll;

            thead{
                background-color: ${({theme}) => theme.color.body.secondary};
                text-transform: uppercase;
            }

            td{
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                font-size: 14px;
                padding: 4px;

                :first-child{
                    text-align: start;
                    display: none;

                    ${({theme}) => theme.mq.desktop}{
                        display: table-cell;
                    }
                }

                a{
                    text-decoration: underline;
                }

                ${({theme}) => theme.mq.desktop}{
                    padding: 8px;
                }
            }
        }
    }

`

export const NavItem = styled.li<{active?: boolean}>`
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