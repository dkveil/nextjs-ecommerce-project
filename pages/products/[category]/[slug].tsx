import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import ProductInfo from '../../../containers/productpage/ProductInfo/ProductInfo';
import { getData } from '../../../utils/fetchData';
import type { IProduct } from '../../../types/Product.types';

const ProductPage = ({ product }: { product: IProduct }) => {
    return (
        <>
            <ProductInfo product={product} />
        </>
    );
};

interface IParams extends ParsedUrlQuery {
    category: 'tshirts' | 'hoodies' | 'shoes';
    slug: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { category, slug } = context.params as IParams;

    const res = await getData(`/products/${category}/${slug}`);

    return {
        props: {
            product: res.product,
        },
    };
};

export default ProductPage;
