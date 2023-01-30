import React from 'react';
import Image from 'next/image';
import { useGlobalContext } from '../../context/GlobalContext';
import { FeaturedProductWrapper, StyledImage } from './FeaturedProductCard.styles';
import texts from '../ShoppingCartItem/texts';

interface IFeaturedProductCard {
    title: {
        ENG: string;
        PL: string;
    };
    images: string[];
    categoryid: string;
    slug: string;
    price: {
        ENG: number;
        PL: number;
    };
}

const FeaturedProductCard = ({ title, images, categoryid, slug, price }: IFeaturedProductCard) => {
    const { currentLanguage } = useGlobalContext();

    return (
        <FeaturedProductWrapper href={`/products/${categoryid}/${slug}`}>
            <div className="image-wrapper">
                {images.length >= 2 && <StyledImage src={images[1]} alt={title[currentLanguage]} fill style={{ objectFit: 'cover' }} />}
                <Image src={images[0]} alt={title[currentLanguage]} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="product-info">
                <h3>{title[currentLanguage]}</h3>
                <p>
                    {texts[currentLanguage].currency} {price[currentLanguage].toFixed(2)}
                </p>
            </div>
        </FeaturedProductWrapper>
    );
};

export default FeaturedProductCard;
