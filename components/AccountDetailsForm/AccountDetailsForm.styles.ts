import styled, { css } from "styled-components";

export const AccountDetailsFormWrapper = styled.form<{isLoading: boolean}>`
    width: 100%;
    max-width: 500px;

    .form-inputs{
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 30px;
    }

    input{
        font-size: 14px;
        padding: 14px 18px;
        width: 100%;
        height: 52px;
        background-color: transparent;
        border: 1px solid ${({theme}) => theme.color.body.accent};
        outline: none;
        color: ${({theme}) => theme.color.text.primary};
    }

    .inputs-group{
        display: flex;
        gap: 10px;
        flex-direction: column;

        ${({theme}) => theme.mq.tablet}{
            flex-direction: row;
        }
    }

    fieldset{
        margin-top: 50px;
        legend{
            font-size: 14px;
            letter-spacing: .06em;
            text-transform: uppercase;
            margin-bottom: 20px;
        }

        display: flex;
        flex-direction: column;
        gap: 10px;
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
    input, textarea, select {
        border: 1px solid ${({theme, error}) => error ? '#dc3545' : theme.color.body.accent}!important;
    }

    .error-message{
        margin-top: 5px;
        font-size: 12px;
        color: #dc3545;
    }

`