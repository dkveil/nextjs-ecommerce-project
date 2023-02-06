import styled from "styled-components";
import Image from "next/image";

export const ProductCardWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ::after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: ${({theme}) => theme.color.body.accent};
    }

    .product-body{
        text-decoration: none;
        color: inherit;

        .image-wrapper {
            position: relative;
            width: 100%;
            aspect-ratio: 1/1;
            margin-bottom: 16px;
        }

        .product-category{
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: .05em;
            color: ${({theme}) => theme.color.body.accent}
        }

        .product-title{
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 16px;
            margin-bottom: 20px;
        }
    }
    .product-footer{
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;

        .price{
            font-size: 16px;
            font-weight: ${({theme}) => theme.font.weight.thin};
        }

        .add-to-wishlist{
            background-color: transparent;
            border: none;
            cursor: pointer;

            svg{
                font-size: 24px;
                fill: ${({theme}) => theme.color.text.primary};
            }
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