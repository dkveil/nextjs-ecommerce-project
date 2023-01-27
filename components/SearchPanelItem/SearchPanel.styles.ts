import styled from "styled-components";
import Link from 'next/link';

export const SearchPanelItemWrapper = styled(Link)`
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    color: inherit;
    margin-bottom: 20px;

    .image-wrapper{
        position: relative;
        width: 50px;
        aspect-ratio: 1/1;

        ${({theme}) => theme.mq.desktop}{
            width: 62px;
        }
    }

    .item-details{
        span{
            display: block;
            text-decoration: none;
            color: inherit;
        }

        .item-name{
            font-size: 16px;
            margin-bottom: 4px;
        }

        .item-category{
            font-size: 12px;
            text-transform: uppercase;
            color: ${({theme}) => theme.color.body.accent};
        }

        .item-price{
            font-size: 14px;
        }
    }
`