import { IProduct } from '../../../types/Product.types';
import { ProductsListWrapper } from './ProductsList.styles';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { useGlobalContext } from '../../../context/GlobalContext';

const ProductsList = ({ products }: { products: IProduct[] }) => {
    const { user, handleWishlist } = useGlobalContext();

    return (
        <ProductsListWrapper>
            <div className="container">
                <div className="featured-products__wrapper">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            title={product.title}
                            images={product.images}
                            categoryid={product.categoryid}
                            price={product.price}
                            slug={product.slug}
                            isInWishlist={Boolean(user?.data.wishlist.find((item) => item.productId === product._id))}
                            handleWishlist={handleWishlist}
                        />
                    ))}
                </div>
            </div>
        </ProductsListWrapper>
    );
};

export default ProductsList;
