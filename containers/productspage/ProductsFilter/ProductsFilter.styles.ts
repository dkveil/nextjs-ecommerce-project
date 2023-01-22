import styled, { css } from "styled-components";

export const ProductsFilterButtonSection = styled.section`
    padding-bottom: 30px;
    background-color: ${({theme}) => theme.color.body.primary};

    .filter-button{
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 18px 20px;
        font-size: 12px;
        text-transform: uppercase;
        cursor: pointer;

        ${({theme}) => css`
            color: ${theme.color.text.primary};
            border: 1px solid ${theme.color.body.accent};
            background-color: ${theme.color.body.primary};
        `}
    }

    ${({theme}) => theme.mq.desktop}{
        display: none;
    }
`

export const ProductsFilterSection = styled.section<{isOpen: boolean}>`
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${({theme}) => theme.color.body.secondary};
    z-index: ${({theme}) => theme.zindex.filterscart};
    transform: ${({isOpen }) => isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    transition: .4s transform;

    ${({theme}) => theme.mq.desktop}{
        position: static;
        transform: unset;
        margin-bottom: 80px;
    }

    .filters-header{
        padding: 20px 0;

        ${({theme}) => theme.mq.desktop}{
            display: none;
        }

        .inner-filters-header{
            display: flex;
            justify-content: space-between;
            align-items: center;

            button{
                display: flex;
                align-items: center;
                height: 100%;
                background-color: transparent;
                border: none;
                cursor: pointer;

                svg{
                    font-size: 26px;
                    fill: ${({theme}) => theme.color.text.primary};
                }
            }
        }

        h2{
            text-transform: uppercase;
        }
    }

    .filters-list{
        padding: 20px 0;
        flex: 1;
        overflow: auto;

        ${({theme}) => theme.mq.desktop}{
            overflow: visible;
            padding: 60px 0;
            flex-grow: unset;
        }

        .inner-filters-list {
            display: flex;
            flex-direction: column;
            gap: 80px;

            ${({theme}) => theme.mq.desktop}{
                flex-direction: row;
                gap: auto;
            }
        }
    }

    .filters-buttons{
        background-color: ${({theme}) => theme.color.body.primary};
        padding: 20px 0;

        ${({theme}) => theme.mq.desktop}{
            display: none;
        }

        .inner-filters-buttons{
            display: flex;
            flex-direction: column;
            gap: 10px;

            button{
                width: 100%;
                padding: 18px 20px;
                font-size: 12px;
                text-transform: uppercase;
                cursor: pointer;
            }

            ${({theme}) => css`
                .clear-filters{
                    color: ${theme.color.text.primary};
                    border: 1px solid ${theme.color.body.accent};
                    background-color: ${theme.color.body.primary};
                }

                .set-filters {
                    color: ${theme.color.body.primary};
                    border: 1px solid ${theme.color.text.primary};
                    background-color: ${theme.color.text.primary};
                }
            `}
        }
    }
`

export const FilterItem = styled.div<{submenuOpen: boolean}>`
    position: relative;

    ${({theme}) => theme.mq.desktop}{
        flex-grow: 1;
    }

    .filter-title{
        padding-bottom: 20px;
        font-size: 14px;
    }

    .filter-value{
        top: 42px;
        right: 0;
        display: flex;
        align-items: center;
        padding: 10px 0;

        ${({submenuOpen, theme}) => css`
            position: ${submenuOpen ? 'absolute' : 'static'};
            border-bottom: ${submenuOpen ? 'none' : `1px solid ${theme.color.body.accent}`};
            justify-content: ${submenuOpen ? 'flex-end' : 'space-between'};
            cursor: pointer;

            span{
                display: ${submenuOpen ? 'none' : 'block'};
                font-size: 12px;
                letter-spacing: .1em;
                text-transform: uppercase;
                opacity: ${submenuOpen ? 0 : 1};
            }

            svg{
                transform: rotate(${submenuOpen ? '180deg' : '0'});
                transition: transform .25s;
            }
        `}
    }

    ul, .price-inputs__wrapper{
        margin-top: 10px;
        transition: .25s;

        ${({submenuOpen}) => css`
            max-height: ${submenuOpen ? '1000px' : 0};
            opacity: ${submenuOpen ? 1 : 0};
            pointer-events: ${submenuOpen ? 'visible' : 'none'};
        `}

        li{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            cursor: pointer;

            label{
                cursor: pointer;
                font-size: 12px;
                padding-left: 10px;
            }
        }
    }

    .price-inputs__wrapper{
        display: flex;
        gap: 10px;
        cursor: pointer;

        .input-wrapper{
            position: relative;

            span{
                position: absolute;
                font-size: 10px;
                right: 8px;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        input[inputmode=numeric]{
            width: 80px;
            background-color: transparent;
            border: 1px solid ${({theme}) => theme.color.body.accent};
            border-radius: 5px;
            padding: 4px 30px 4px 10px;
        }

    }

    .clear-filter-button{
        margin-top: 20px;
        border: none;
        font-size: 8px;
        text-transform: uppercase;
        cursor: pointer;
        letter-spacing: .1em;
    }
`