import styled, { css } from "styled-components";

const iconsize = '28px';

export const HeaderContainer = styled.header`
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    z-index: ${({theme}) => theme.zindex.header};

    ${({theme}) => css`
        border-bottom: 1px solid ${theme.color.text.primary};
        background-color: ${theme.color.body.primary};
        transition: background-color .2s;

        ${theme.mq.desktop}{
            position: static;
        }
    `}

    .logo{
        display: grid;
        place-items: center;
        text-decoration: none;
        font-size: 32px;

        ${({theme}) => css`
            color: ${theme.color.text.primary};
            font-weight: ${theme.font.weight.light};
        `}
    }

    .websitemenu {
        display: none;

        ${({theme}) => css`
            ${theme.mq.desktop}{
                display: block;
                background-color: ${({theme}) => theme.color.body.secondary};
                transition: background-color .2s;
            }
        `}
    }

    .inner-websitemenu {
        display: flex;
        justify-content: space-between;
        padding: 2px 0;
    }

    .usernav{
        padding: 10px 0;
    }

    .inner-usernav{
        display: flex;
        justify-content: space-between;

        .right-col, .left-col{
            display: flex;
            flex: 1;

            ul{
                display: flex;
                flex-direction: row;
            }
        }

        .right-col{
            justify-content: flex-end;
        }
    }

    ul{
        height: 100%;
        display: flex;
        gap: 15px;
    }
`

export const ListItem = styled.li<{hamburgerToggler?: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;

    ${({theme}) => theme.mq.desktop}{
        display: ${({hamburgerToggler}) => hamburgerToggler && 'none'};
    }

    button, a{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;

        span{
            display: none;
            font-size: 14px;

            ${({theme}) => css`
                ${theme.mq.desktop}{
                    display: block;
                    color: ${theme.color.text.primary};
                    text-transform: uppercase;
                }

            `}
        }
    }

    svg{
        fill: ${({theme}) => theme.color.text.primary};
        width: ${iconsize};
        height: ${iconsize};
    }

    .menu-button__clear{
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: transparent;
        text-transform: uppercase;
        cursor: pointer;
    }

    a{
        text-decoration: none;
    }

    .login{
        display: none;

        ${({theme}) => css`
            ${theme.mq.desktop}{
                display: flex;
            }
        `
        }
    }

    .cart{
        position: relative;

        i{
            display: grid;
            place-items: center;
            position: absolute;
            top: -2px;
            right: -8px;
            height: 18px;
            min-width: 18px;
            border-radius: 100%;
            font-size: 10px;
            padding: 1px;

            ${({theme}) => css`
                color: ${theme.color.body.primary};
                background: ${theme.color.text.primary};
            `}
        }
    }
`

export const LangItem = styled.li`
    display: grid;
    position: relative;
    height: 100%;

    ::after{
        content: '';
        position: absolute;
        background-color: ${({theme}) => theme.color.text.primary};
        width: 1px;
        height: 30%;
        top: 50%;
        transform: translateY(-50%);
        right: -7px;
    }

    :last-of-type::after{
        display: none;
    }

    button{
        color: ${({theme}) => theme.color.text.primary};
        border: none;
        background-color: transparent;
        cursor: pointer;


    }
    .active{
        font-weight: ${({theme}) => theme.font.weight.bold};
    }
`

export const MainNavigationContainer = styled.div<{isOpen: boolean}>`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: fixed;
    width: 100%;
    top: 58px;
    left: 0;
    transform: translateX(${({isOpen}) => isOpen ? 0 : '-100%'});
    transition: .2s .2s transform, .2s background-color .2s;
    height: calc(100% - 59px);
    background-color: ${({theme}) => theme.color.body.primary};
    text-transform: uppercase;


    ::after{
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        transform: ${({isOpen}) => isOpen ? 'translateX(100%)' : 'translateX(0)'};
        background-color: ${({theme}) => theme.color.text.primary};
        transition: transform .4s;

        ${({theme}) => theme.mq.desktop}{
            display: none;
        }
    }

    ${({theme}) => theme.mq.desktop}{
        position: static;
        width: fit-content;
        margin: auto;
        height: auto;
        transform: unset;
        transition: unset;
        background-color: transparent;
    }

    .inner-mainnavigation{
        padding-top: 5rem;
        flex-grow: 1;

        ${({theme}) => theme.mq.desktop}{
            padding: 0;
            button{
                display: none;
            }
        }
    }

    .loginbutton{
        text-decoration: none;
        text-transform: uppercase;
        width: 100%;
        height: 80px;
        padding: 0 15px;
        text-align: left;
        display: flex;
        align-items: center;
        border: none;
        gap: 10px;
        cursor: pointer;

        ${({theme}) => css`
            background-color: ${theme.color.body.secondary};
            color: ${theme.color.text.primary};
            transition: color .2s, background-color .2s;

            ${theme.mq.desktop}{
                display: none;
            }
        `}

        svg{
            width: ${iconsize};
            height: ${iconsize};
        }
    }

    .navlist{
        display: flex;
        flex-direction: column;
        height: fit-content;
        gap: 15px;
        margin-bottom: 6rem;

        ${({theme}) => theme.mq.desktop}{
            flex-direction: row;
            margin-bottom: 0;
            gap: 30px;
        }
    }
`

export const MainNavigationItem = styled.li<{active: boolean}>`
    position: relative;
    width: 100%;

    ::after{
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: ${({theme}) => theme.color.body.secondary};

        ${({theme}) => theme.mq.desktop}{
            display: ${({active}) => active ? 'block' : 'none'};
            bottom: 0;
            height: 2px;
            background-color: ${({theme}) => theme.color.text.primary};
        }
    }

    a{
        display: block;
        box-sizing: border-box;
        text-decoration: none;
        font-weight: ${({theme, active}) => active ? theme.font.weight.bold : theme.font.weight.regular};
        padding: 1rem 0;
        height: 100%;
        width: 100%;
        color: ${({theme}) => theme.color.text.primary};
        white-space: nowrap;

        ${({theme}) => theme.mq.desktop}{
            padding: .5rem 1rem;
        }
    }
`