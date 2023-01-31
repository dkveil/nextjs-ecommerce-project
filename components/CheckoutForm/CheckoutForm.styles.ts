import styled, { css } from "styled-components";

export const CheckoutFormWrapper = styled.form<{isLoading: boolean}>`

    width: 100%;
    max-width: 640px;

    h2{
        font-size: 32px;
        margin-bottom: 30px;
    }

    .form-inputs{
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 30px;
    }

    .inputs-group{
        display: flex;
        gap: 10px;
        flex-direction: column;

        ${({theme}) => theme.mq.tablet}{
            flex-direction: row;
        }
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

`

export const InputWrapper = styled.div<{error: boolean}>`
    width: 100%;
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