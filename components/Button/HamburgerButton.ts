import styled from "styled-components"

export default styled.button<{active: boolean}>`
    display: none;
    place-items: center;
    background-color: transparent;
    border: none;
    width: 24px;
    height: 24px;
    cursor: pointer;

    .hamburger{
        position: relative;
        display: block;
        width: 100%;
        height: 1px;
        background-color: ${({theme}) => theme.color.text.primary};

        ::after, ::before{
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            left: 0;
            background-color: ${({theme}) => theme.color.text.primary};
        }

        ::after{
            top: 6px;
        }

        ::before{
            bottom: 6px;
        }
    }
`