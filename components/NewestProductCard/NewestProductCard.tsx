import React from 'react';
import { NewestProductWrapper, StyledImage } from './NewestProductCard.styles';
import Image from 'next/image';
import { useGlobalContext } from '../../context/GlobalContext';
import texts from '../ShoppingCartItem/texts';

interface INewestProductCard {
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

const NewestProductCard = ({ title, images, categoryid, slug, price }: INewestProductCard) => {
    const { currentLanguage } = useGlobalContext();

    return (
        <NewestProductWrapper href={`/products/${categoryid}/${slug}`}>
            <div className="image-wrapper">
                {images.length >= 2 && <StyledImage src={images[1]} alt={title[currentLanguage]} fill style={{ objectFit: 'cover' }} />}
                <Image src={images[0]} alt={title[currentLanguage]} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="product-content">
                <h3>
                    {title[currentLanguage]} <span>{texts[currentLanguage][categoryid]}</span>
                </h3>
                <p>
                    {texts[currentLanguage].currency} {price[currentLanguage].toFixed(2)}
                </p>
            </div>
        </NewestProductWrapper>
    );
};

export default NewestProductCard;
