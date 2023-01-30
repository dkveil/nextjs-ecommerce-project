import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export const NewestProductWrapper = styled(Link)`
    width: 100%;
    margin-right: 20px;
    text-align: center;
    text-decoration: none;
    color: inherit;

    .image-wrapper{
        position: relative;
        width: inherit;
        aspect-ratio: 1/1;
        margin-bottom: 20px;
    }

    span{
        display: block;
        font-size: 82%;
        text-transform: uppercase;
        color: ${({theme}) => theme.color.body.accent};
    }

    .product-content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    h3{
        font-size: 16px;
        line-height: 17px;
        margin-bottom: 5px;
        text-overflow: ellipsis;
        text-transform: uppercase;
    }

    p{
        font-size: 14px;
    }
`

export const StyledImage = styled(Image)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: 0;
    transition: opacity .2s ease;

    :hover{
        opacity: 1;
    }
`