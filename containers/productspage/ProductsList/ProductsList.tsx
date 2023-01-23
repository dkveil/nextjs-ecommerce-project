import { IProduct } from '../../../types/Product.types';
import { ProductsListWrapper } from './ProductsList.styles';
import ProductCard from '../../../components/ProductCard/ProductCard';

const ProductsList = ({ products }: { products: IProduct[] }) => {
    return (
        <ProductsListWrapper>
            <div className="container">
                <div className="featured-products__wrapper">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            title={product.title}
                            images={product.images}
                            categoryid={product.categoryid}
                            price={product.price}
                            slug={product.slug}
                        />
                    ))}
                </div>
            </div>
        </ProductsListWrapper>
    );
};

export default ProductsList;
