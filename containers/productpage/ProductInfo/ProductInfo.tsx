import React from 'react';
import { ProductInfoContainer, ButtonWrapper, OptionsButton, ImageCarousel } from './ProductInfo.styles';
import Image from 'next/image';
import type { IProduct } from '../../../types/Product.types';
import { useGlobalContext } from '../../../context/GlobalContext';
import texts from './texts';
import { CiHeart } from 'react-icons/ci';
import { BsPlus } from 'react-icons/bs';

const ProductInfo = ({ product }: { product: IProduct }) => {
    const { currentLanguage, user, setNotify, addShoppingCartItem, shoppingCartLoading } = useGlobalContext();
    const [currentOption, setCurrentOption] = React.useState<{ title: string; inStock: number } | null>();
    const [optionsOpen, setOptionsOpen] = React.useState<boolean>(false);
    const [currentImage, setCurrentImage] = React.useState<number>(0);

    const handleAddToWishlist = () => {
        if (!user) {
            setNotify(texts[currentLanguage].mustbelogged);
            return;
        }

        setNotify(texts[currentLanguage].addedtowishlist);
    };

    const handleSetOption = (option: typeof currentOption) => {
        setCurrentOption(option);
        setOptionsOpen(false);
    };

    const handleAddToCart = async () => {
        if (!currentOption) {
            setNotify(texts[currentLanguage].choosesizefirst);
            return;
        }

        addShoppingCartItem({ _id: product._id, size: currentOption.title });
    };

    return (
        <ProductInfoContainer>
            <div className="container">
                <div className="inner-product-info">
                    <div className="product-images">
                        <div className="image-displayer">
                            <Image alt={product.title.ENG} src={product.images[currentImage]} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <ImageCarousel>
                            <ul id="image-carousel">
                                {product.images.map((image, index) => (
                                    <div key={image} onClick={() => setCurrentImage(index)}>
                                        <Image src={image} alt={product.title.ENG + index} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </ul>
                        </ImageCarousel>
                    </div>
                    <div className="product-info">
                        <div className="product-headbodywrapper">
                            <div className="product-body">
                                <p className="stock">
                                    {!currentOption
                                        ? ''
                                        : currentOption?.inStock
                                        ? texts[currentLanguage].instock
                                        : texts[currentLanguage].outofstock}
                                </p>
                                <ButtonWrapper type="options">
                                    <button className="option" onClick={() => setOptionsOpen((prev) => !prev)}>
                                        <span>{!currentOption ? texts[currentLanguage].choosesize : texts[currentLanguage].size}</span>
                                        <span className="size">
                                            {!currentOption || currentOption?.inStock ? null : texts[currentLanguage].outofstock}{' '}
                                            {currentOption?.title}
                                        </span>
                                    </button>
                                    {optionsOpen ? (
                                        <ul>
                                            {product.options.map((option) => (
                                                <li key={option.title}>
                                                    <OptionsButton instock={option.inStock > 0} onClick={() => handleSetOption(option)}>
                                                        <span>{option.title}</span>
                                                        {!option.inStock ? (
                                                            <span className="outofstock">{texts[currentLanguage].outofstock}</span>
                                                        ) : null}
                                                    </OptionsButton>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </ButtonWrapper>
                                <ButtonWrapper type="cart" blocked={currentOption?.inStock === 0}>
                                    <button className="add-to-cart" onClick={handleAddToCart}>
                                        <span>{texts[currentLanguage].addtocart}</span>
                                        <span className="price">
                                            {texts[currentLanguage].currency} {product.price[currentLanguage].toFixed(2)}
                                        </span>
                                    </button>
                                </ButtonWrapper>
                                <button className="add-to-wishlist" onClick={handleAddToWishlist}>
                                    <CiHeart />
                                    <span>{texts[currentLanguage].addtowishlist}</span>
                                </button>
                            </div>
                            <div className="product-header">
                                <h1>{product.title[currentLanguage]}</h1>
                                <h2>{texts[currentLanguage][product.categoryid]}</h2>
                                <p>{product.predescription[currentLanguage]}</p>
                            </div>
                        </div>
                        {product.description ? (
                            <div className="product-details">
                                <details>
                                    <summary>
                                        <span>{texts[currentLanguage].desc}</span>
                                        <BsPlus />
                                    </summary>
                                    <div>{product.description[currentLanguage]}</div>
                                </details>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </ProductInfoContainer>
    );
};

export default ProductInfo;
