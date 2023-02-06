import styled, {css, keyframes} from "styled-components";

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

export const SearchPanelContainer = styled.div<{closeAnimation: boolean, resultsOpen: boolean }>`
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
    z-index: ${({theme}) => theme.zindex.usercarts};

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

            ${({theme}) => theme.mq.desktop}{
                display: ${({resultsOpen}) => resultsOpen ? 'none' : 'flex'};
            }

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
        background-color: transparent;
        color: ${({theme}) => theme.color.text.primary};
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

export const SearchResultsContainer = styled.div<{open: boolean, loading: boolean}>`
    position: fixed;
    padding: 60px 20px 20px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: ${({theme}) => theme.color.body.primary};
    z-index: ${({theme}) => theme.zindex.searchresultsmobile};
    transform: ${({open}) => open ? 'translateX(0)' : 'translate(-100%)'};
    opacity:  ${({open}) => open ? 1 : 0};
    transition: opacity .6s, transform .6s;
    display: flex;
    flex-direction: column;

    ${({theme}) => theme.mq.desktop}{
        width: 33.3333%;
        left: 33.3333%;
        z-index: ${({theme}) => theme.zindex.searchresultsdesktop};
        border-left: 1px solid ${({theme}) => theme.color.body.accent};
        padding: 60px 30px 30px;
    }

    .search-results__header{
        min-height: 55px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .back-search-button{
            display: flex;
            align-items: center;
            gap: 6px;
            height: 100%;
            background-color: transparent;
            border: none;
            color: ${({theme}) => theme.color.text.primary};
            cursor: pointer;

            svg{
                font-size: 14px;
                fill: ${({theme}) => theme.color.text.primary};
            }
        }

        .close-results-button{
            background-color: transparent;
            border: none;
            color: ${({theme}) => theme.color.text.primary};
            cursor: pointer;

            ${({theme}) => theme.mq.desktop}{
                display: ${({open}) => open ? 'block' : 'none'};
            }

            svg{
                font-size: 26px;
                fill: ${({theme}) => theme.color.text.primary};
            }

        }
    }


    .search-results__body{
        margin-top: 20px;

        ${({theme}) => theme.mq.desktop}{
            margin-top: 240px;
        }

        ${({loading, theme}) => loading ? css`
            display: flex;
            justify-content: center;
            align-items: center;

            ${theme.mq.desktop}{
                margin-top: 0;
            }
        `: null}

        .search-results__desc{
            font-size: 12px;
            color: ${({theme}) => theme.color.body.accent};
            text-transform: uppercase;
            margin-bottom: 20px;
        }
    }
`