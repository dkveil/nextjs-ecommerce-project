import { FeaturedProductsSection } from './FeaturedProducts.styles';
import texts from './texts';
import { useGlobalContext } from '../../../context/GlobalContext';
import Link from 'next/link';
import type { IProduct } from '../../../types/Product.types';
import FeaturedProductCard from '../../../components/FeaturedProductCard/FeaturedProductCard';

const FeaturedProducts = ({ products }: { products: IProduct[] }) => {
    const { currentLanguage } = useGlobalContext();

    return (
        <FeaturedProductsSection>
            <div className="container">
                <div className="featured-products__desc">
                    <h2>{texts[currentLanguage].header}</h2>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur rerum totam veniam fugit suscipit perferendis
                        minus quae dolor corporis, eos commodi, nulla, quod magnam sequi soluta illum at.
                    </p>
                    <Link href="/products">{texts[currentLanguage].shopnow}</Link>
                </div>
                <div className="featured-products__items">
                    <div className="first-group">
                        {products.slice(0, 2).map((item) => (
                            <FeaturedProductCard
                                key={item._id}
                                title={item.title}
                                categoryid={item.categoryid}
                                images={item.images}
                                price={item.price}
                                slug={item.slug}
                            />
                        ))}
                    </div>
                    <div className="second-group">
                        {products.slice(2, products.length).map((item) => (
                            <FeaturedProductCard
                                key={item._id}
                                title={item.title}
                                categoryid={item.categoryid}
                                images={item.images}
                                price={item.price}
                                slug={item.slug}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </FeaturedProductsSection>
    );
};

export default FeaturedProducts;
