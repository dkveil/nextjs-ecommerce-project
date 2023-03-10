import styled, { css } from "styled-components";

export const LoginContainer = styled.form<{isLoading: boolean | undefined, checkoutLogin?: boolean}>`
    width: 100%;
    max-width: 512px;
    color: ${({theme}) => theme.color.text.primary};

    input{
        color: ${({theme}) => theme.color.text.primary};
    }

    .inner-form{
        padding: 30px 15px;

        ${({theme}) => theme.mq.desktop}{
            padding: 30px 40px;
        }
    }

    h2{
        font-size: 42px;
        text-align: center;
        margin-bottom: 10px;
        line-height: .9;
    }

    .form-information {
        text-align: center;
        margin-bottom: 40px;
    }

    .inputs-wrapper{
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 40px;
    }

    button{
        width: 100%;
        height: 55px;
        text-transform: uppercase;
        font-size: 14px;
        border: none;
        letter-spacing: .1em;

        ${({theme, isLoading}) => css`
            color: ${theme.color.body.primary};
            background-color: ${isLoading ? theme.color.body.accent : theme.color.text.primary};
            font-weight: ${theme.font.weight.light};
            cursor: ${isLoading ? 'default' : 'pointer'};
            pointer-events: ${isLoading ? 'none' : 'fill'};
        `}
    }

    .form-footer{
        text-align: center;
        width: 100%;
        padding: 30px 15px;
        background-color: ${({checkoutLogin, theme}) => !checkoutLogin && theme.color.body.secondary};

        a{
            display: block;
            color: inherit;
            width: fit-content;
            margin: 0 auto;
            font-weight: ${({theme}) => theme.font.weight.bold};
        }
    }

`

export const InputWrapper = styled.div<{error: boolean}>`
    input{
        font-size: 16px;
        padding: 14px 18px;
        width: 100%;
        height: 52px;
        background-color: transparent;
        border: 1px solid ${({theme, error}) => error ? '#dc3545' : theme.color.body.accent};
        outline: none;
    }
    .error-message{
        margin-top: 5px;
        font-size: 12px;
        color: #dc3545;
    }
`