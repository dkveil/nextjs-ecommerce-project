import React from 'react';
import { ProductCardWrapper, StyledImage } from './ProductCard.styles';
import Link from 'next/link';
import Image from 'next/image';
import { useGlobalContext } from '../../context/GlobalContext';
import texts from '../../containers/productpage/ProductInfo/texts';
import { CiHeart } from 'react-icons/ci';
import { AiFillHeart } from 'react-icons/ai';

interface IProductCard {
    id: string;
    title: {
        ENG: string;
        PL: string;
    };
    price: {
        ENG: number;
        PL: number;
    };
    categoryid: 'tshirt' | 'hoodie' | 'shoes';
    images: string[];
    slug: string;
    isInWishlist: boolean;
    handleWishlist: (id: string) => void;
}

const ProductCard = ({ id, title, images, categoryid, price, slug, isInWishlist, handleWishlist }: IProductCard) => {
    const { currentLanguage } = useGlobalContext();

    return (
        <ProductCardWrapper>
            <Link href={`/products/${categoryid}/${slug}`} className="product-body">
                <div className="image-wrapper">
                    {images.length >= 2 && <StyledImage src={images[1]} alt={title[currentLanguage]} fill style={{ objectFit: 'cover' }} />}
                    <Image src={images[0]} alt={title[currentLanguage]} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="product-category">{texts[currentLanguage][categoryid]}</div>
                <h2 className="product-title">{title[currentLanguage]}</h2>
            </Link>
            <div className="product-footer">
                <span className="price">
                    {texts[currentLanguage].currency} {price[currentLanguage].toFixed(2)}
                </span>
                <button className="add-to-wishlist" onClick={() => handleWishlist(id)}>
                    {isInWishlist ? <AiFillHeart /> : <CiHeart />}
                </button>
            </div>
        </ProductCardWrapper>
    );
};

export default ProductCard;
