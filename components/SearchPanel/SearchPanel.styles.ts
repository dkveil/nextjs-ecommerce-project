import styled, {keyframes} from "styled-components";

const showSearchPanel = keyframes`
    from {
        opacity: 0;
        transform: translateX(-100%);
    }
    to{
        transform: translateX(0);
        opacity: 1;
    }
`

export const SearchPanelContainer = styled.div<{closeAnimation: boolean}>`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${({theme}) => theme.color.body.primary};
    animation: .2s ${showSearchPanel};
    transform: ${({closeAnimation}) => closeAnimation ? 'translateX(-100%)' : 'translateX(0)'};
    transition: transform .2s;
    padding: 60px 20px 20px;

    ${({theme}) => theme.mq.desktop}{
        width: 33.3333%;
    }

    .search-panel-header{
        position: relative;
        height: 100%;
        height: 55px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .search-panel-info{
            display: none;
            align-items: center;
            text-transform: uppercase;
            gap: 10px;
            color: ${({theme}) => theme.color.text.primary};
            fill: ${({theme}) => theme.color.text.primary};
            font-size: 16px;

            ${({theme}) => theme.mq.desktop}{
                display: flex;
            }
        }

        button{
            display: flex;
            align-items: center;
            gap: 6px;
            height: 100%;
            background-color: transparent;
            border: none;
            color: ${({theme}) => theme.color.text.primary};
            cursor: pointer;

            svg{
                font-size: 26px;
                fill: ${({theme}) => theme.color.text.primary};
            }

            span{
                ${({theme}) => theme.mq.desktop}{
                    display: none;
                }
            }
        }
    }

    .search-panel-body{
        width: 100%;
        margin-top: 240px;
    }
`

export const SearchInputWrapper = styled.div`
    position: relative;
    width: 100%;

    input {
        font-size: 18px;
        line-height: 31px;
        padding: 6px 40px 6px 6px;
        width: 100%;
        border: none;
        outline: none;
        border-bottom: 1px solid ${({theme}) => theme.color.body.accent};
    }

    button {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        height: 100%;
        width: 40px;
        background-color: transparent;
        border: none;
        cursor: pointer;

        svg{
            fill: ${({theme}) => theme.color.body.accent};
            font-size: 24px;
        }
    }
`