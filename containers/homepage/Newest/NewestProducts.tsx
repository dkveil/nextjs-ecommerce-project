import { NewestProductsSection } from './NewestProducts.styles';
import React from 'react';
import texts from './texts';
import { useGlobalContext } from '../../../context/GlobalContext';
import type { IProduct } from '../../../types/Product.types';
import Link from 'next/link';
import NewestProductCard from '../../../components/NewestProductCard/NewestProductCard';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { media } from '../../../styles/theme';
import Slider from 'react-slick';

const NewestProducts = ({ products, lastWeekProductsLength }: { products: IProduct[]; lastWeekProductsLength: number }) => {
    const { currentLanguage } = useGlobalContext();
    const slider = React.useRef<Slider>(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: products.length < 4 ? products.length : 4,
        autoplay: true,
        responsive: [
            {
                breakpoint: media.desktop,
                settings: {
                    slidesToShow: 1.05,
                    infinite: true,
                    arrows: false,
                    dots: false,
                    autoplay: true,
                },
            },
        ],
    };

    return (
        <NewestProductsSection>
            <div className="container">
                <div className="inner-newest-products">
                    <div className="newest-products__desc">
                        {lastWeekProductsLength && (
                            <span>
                                {lastWeekProductsLength} {texts[currentLanguage].newitemsthisweek}
                            </span>
                        )}
                        <h2>{texts[currentLanguage].whatsnew}</h2>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis perspiciatis maxime a? Eos culpa maxime, hic
                            voluptatem ipsum est beatae laborum officiis. Veritatis eos, blanditiis aperiam quo, placeat beatae odit cumque
                            pariatur sed corrupti corporis?
                        </p>
                        <Link href="/products">{texts[currentLanguage].shopnow}</Link>
                    </div>
                    <div className="newest-products__items">
                        <Slider ref={slider} {...settings}>
                            {products.map((item) => (
                                <NewestProductCard
                                    key={item._id}
                                    title={item.title}
                                    images={item.images}
                                    categoryid={item.categoryid}
                                    price={item.price}
                                    slug={item.slug}
                                />
                            ))}
                        </Slider>
                        <div className="carousel-nav">
                            <button onClick={() => slider?.current?.slickPrev()}>
                                <MdOutlineArrowBackIos />
                            </button>
                            <button onClick={() => slider?.current?.slickNext()}>
                                <MdOutlineArrowForwardIos />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </NewestProductsSection>
    );
};

export default NewestProducts;
