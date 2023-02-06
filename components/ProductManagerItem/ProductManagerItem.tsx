import React from 'react';
import { ProductManagerItemWrapper } from './ProductManagerItem.styles';
import texts from '../ShoppingCartItem/texts';
import Image from 'next/image';
import { useGlobalContext } from '../../context/GlobalContext';
import Link from 'next/link';

interface IProductManagerItem {
    id: string;
    title: {
        ENG: string;
        PL: string;
    };
    categoryid: string;
    img: string;
    handleDeleteProduct: (id: string) => void;
}

const ProductManagerItem = ({ id, title, categoryid, img, handleDeleteProduct }: IProductManagerItem) => {
    const { currentLanguage } = useGlobalContext();

    return (
        <ProductManagerItemWrapper>
            <div className="image-wrapper">
                <Image src={img} alt={title[currentLanguage]} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="product-body">
                <div className="product-body__info">
                    <h3>{title[currentLanguage]}</h3>
                    <p>{texts[currentLanguage][categoryid]}</p>
                </div>
                <div className="product-body__buttons">
                    <Link href={`/admin/products/edit/${id}`}>{texts[currentLanguage].edit}</Link>
                    <button onClick={() => handleDeleteProduct(id)}>{texts[currentLanguage].delete}</button>
                </div>
            </div>
        </ProductManagerItemWrapper>
    );
};

export default ProductManagerItem;
