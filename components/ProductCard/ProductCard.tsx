import React from 'react';
import { ProductCardWrapper } from './ProductCard.styles';
import Link from 'next/link';
import Image from 'next/image';
import { useGlobalContext } from '../../context/GlobalContext';
import texts from '../../containers/productpage/ProductInfo/texts';
import { CiHeart } from 'react-icons/ci';

interface IProductCard {
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
}

const ProductCard = ({ title, images, categoryid, price, slug }: IProductCard) => {
    const { currentLanguage, setNotify } = useGlobalContext();

    const [currentImageId, setCurrentImageId] = React.useState(0);

    const handleAddToWishList = () => {
        setNotify(texts[currentLanguage].addedtowishlist);
    };

    const handleMouseEnter = () => console.log(currentImageId);

    return (
        <ProductCardWrapper>
            <Link href={`/products/${categoryid}/${slug}`} className="product-body">
                <div className="image-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={() => setCurrentImageId(0)}>
                    <Image alt={title.ENG} src={images[currentImageId]} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="product-category">{texts[currentLanguage][categoryid]}</div>
                <h2 className="product-title">{title[currentLanguage]}</h2>
            </Link>
            <div className="product-footer">
                <span className="price">
                    {texts[currentLanguage].currency} {price[currentLanguage].toFixed(2)}
                </span>
                <button className="add-to-wishlist" onClick={handleAddToWishList}>
                    <CiHeart />
                </button>
            </div>
        </ProductCardWrapper>
    );
};

export default ProductCard;
