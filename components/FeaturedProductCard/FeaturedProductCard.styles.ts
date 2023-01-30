import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export const FeaturedProductWrapper = styled(Link)`
    text-align: center;
    text-decoration: none;
    color: inherit;

    .image-wrapper{
        position: relative;
        width: inherit;
        aspect-ratio: 1/1;
    }

    .product-info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 20px;
        background-color: ${({theme}) => theme.color.body.secondary};

        h3{
            font-size: 16px;
            font-weight: ${({theme}) => theme.font.weight.light};
        }
        p{
            font-size: 14px;
        }
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