import styled, { css } from "styled-components";

export const ManagerSection = styled.section`
    padding: 50px 0;

    input, select, textarea{
        color: ${({theme}) => theme.color.text.primary};
    }

    a{
        color: inherit;
        text-decoration: none;
    }

    .inputs-group{
        margin-bottom: 60px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;

        h4{
            font-size: 18px;
            margin-bottom: 6px;
        }

        input{
            width: 100%;
            color: ${({theme}) => theme.color.text.primary};
        }
    }

    .manager{
        &__header{
            h2{
                font-size: 42px;
                text-align: center;
                margin-bottom: 45px;
            }
        }

        &__body{
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
        }

        &__items{
            ul{

                li{
                    border-bottom: 1px solid ${({theme}) => theme.color.body.accent};

                    :last-child{
                        border-bottom: none;
                    }
                }
            }
        }
    }

    .current-product{
        display: flex;
        flex-direction: column;

        ${({theme}) => theme.mq.desktop}{
            width: 620px;
            margin: auto;
        }
    }

    .current-product__info{
        ${({theme}) => theme.mq.desktop}{
            flex-grow: 1;
        }

        input, textarea{
            font-size: 14px;
            padding: 14px 18px;
            width: 100%;
            height: 50px;
            background-color: transparent;
            border: 1px solid ${({theme}) => theme.color.body.accent};
            outline: none;
        }

        textarea{
            resize: none;
            height: 180px;
        }

        select{
            font-size: 14px;
            padding: 14px 18px;
            height: 50px;
            width: fit-content;
            border: 1px solid ${({theme}) => theme.color.body.accent};
            outline: none;
            background-color: transparent;
        }

        .add-size-button{
            height: 55px;
            padding: 12px;
            border: none;
            background-color: ${({theme}) => theme.color.text.primary};
            color: ${({theme}) => theme.color.body.primary};
            text-transform: uppercase;
            cursor: pointer;
        }
    }

    table, td, tr {
        border: 1px solid ${({theme}) => theme.color.text.primary};
        text-transform: uppercase;
    }

    td{
        padding: 10px 12px;

        ${({theme}) => theme.mq.desktop}{
            white-space: nowrap;
        }
    }

    .size-group{
        width: 100%;
        margin-bottom: 15px;
        font-size: 14px;

        ${({theme}) => theme.mq.desktop}{
            font-size: 16px;
        }

        .button{
            width: 10px;

            ${({theme}) => theme.mq.desktop}{
                width: 140px;
            }

            button{
                font-size: 14px;
                background-color: transparent;
                border: none;
                cursor: pointer;
                text-transform: uppercase;
                font-weight: ${({theme}) => theme.font.weight.bold};
                color: ${({theme}) => theme.color.text.primary};

                :hover{
                    text-decoration: underline;
                }
            }
        }

        td{
            text-align: center;
        }
    }

    .add-product-button, .create-product-button{
        display: grid;
        place-items: center;
        width: 100%;
        height: 55px;
        text-transform: uppercase;
        font-size: 14px;
        border: none;
        letter-spacing: .1em;
        margin-bottom: 20px;

        ${({theme}) => css`
            color: ${theme.color.body.primary};
            background-color: ${theme.color.text.primary};
            cursor: pointer;
        `}
    }

    .image-displayer{
        position: relative;
        width: 100%;
        aspect-ratio: 1/1;
        margin-bottom: 30px;

        ${({theme}) => theme.mq.desktop}{
            aspect-ratio: 16/14;
        }
    }

    .delete-image-button{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        background-color: ${({theme}) => theme.color.text.primary};
        cursor: pointer;
        width: 32px;
        height: 32px;

        svg{
            height: 100%;
            width: 100%;
            fill: ${({theme}) => theme.color.body.primary};
        }
    }
`

export const InputFileWrapper = styled.div<{error: boolean}>`
    label {
        width: 100%;
        display: flex;
        border: 1px solid ${({theme, error}) => error ? '#dc3545' : theme.color.body.accent}!important;

        button{
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 16px;
            color: ${({theme}) => theme.color.body.primary};
            background-color: ${({theme}) => theme.color.text.primary};
            cursor: pointer;
            text-transform: uppercase;
        }

        .input-file__info{
            display: flex;
            align-items: center;
            padding-left: 15px;
        }
    }

    input {
        display: none;
    }

    ul{
        margin-top: 10px;
        margin-bottom: 20px;

        li{
            border: 1px solid ${({theme}) => theme.color.text.primary};
            border-top: none;

            &:first-child{
                border-top: 1px solid ${({theme}) => theme.color.text.primary};
            }

            .uploaded-file{
                display: flex;
                max-width: 100%;
                background-color: ${({theme}) => theme.color.body.secondary};


                &__info{
                    flex-grow: 1;
                    padding: 3px 6px;
                    display: flex;
                    align-items: center;
                    min-width: 0;

                    .name{
                        flex-grow: 1;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;

                        p{
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                    }

                    .size{
                        margin-left: 10px;
                        width: fit-content;
                        white-space: nowrap;
                    }
                }

                &__button{
                    margin-left: 10px;
                    min-width: 30px;
                    height: 30px;
                    border: none;
                    background-color: transparent;
                    cursor: pointer;


                    svg{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }

    .error-message{
        margin-top: 5px;
        font-size: 12px;
        color: #dc3545;
    }
`


export const SizeSubformWrapper = styled.div`
    padding: 15px;

    h5{
        font-size: 18px;
        margin-bottom: 6px;
    }

    p{
        font-size: 10px;
        margin-bottom: 6px;
        color: ${({theme}) => theme.color.text.secondary};
    }


    input, textarea{
        font-size: 14px;
        color: ${({theme}) => theme.color.text.primary};
        padding: 14px 18px;
        width: 100%;
        height: 50px;
        background-color: transparent;
        border: 1px solid ${({theme}) => theme.color.body.accent};
        outline: none;
    }

    div{
        margin-bottom: 10px;
    }

    .buttons-wrapper{
        display: flex;
        gap: 10px;
        width: 100%;
        margin-top: 30px;

        button{
            width: 50%;
            height: 42px;
            text-transform: uppercase;
            font-size: 14px;
            border: none;
            letter-spacing: .1em;
            cursor: pointer;

            ${({theme}) => css`
                color: ${theme.color.body.primary};
                background-color: ${theme.color.text.primary};
           `}
        }
    }

`
