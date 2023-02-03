import { GetServerSideProps } from 'next';
import { getData } from '../../../utils/fetchData';
import type { IProduct } from '../../../types/Product.types';
import ProductsPageTemplate from '../../../templates/ProductsPageTemplate';

const CategoryPage = ({ products, categoryParam }: { products: IProduct[]; categoryParam: string }) => {
    return <ProductsPageTemplate header={categoryParam} products={products} categoryParam={categoryParam} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
    const { category } = params as { category: string };

    const res = await getData(
        `/products/${category}/?${query.sortby ? `sortby=${query.sortby}&` : ''}${query.size ? `size=${query.size}&` : ''}${
            query.minPrice ? `minPrice=${query.minPrice}&` : ''
        }${query.maxPrice ? `maxPrice=${query.maxPrice}&` : ''}${query.lang ? `lang=${query.lang}` : ''}`
    );

    return {
        props: {
            categoryParam: category,
            products: res.products,
        },
    };
};

export default CategoryPage;
