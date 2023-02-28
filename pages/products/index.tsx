import React from 'react';
import { getData } from '../../utils/fetchData';
import { IProduct } from '../../types/Product.types';
import { useRouter } from 'next/router';
import ProductsPageTemplate from '../../templates/ProductsPageTemplate';
import { GetServerSideProps } from 'next';

const ProductsPage = ({ products }: { products: IProduct[] }) => {
    return <ProductsPageTemplate header="All" products={products} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { products } = await getData(
        `products?${query.sortby ? `sortby=${query.sortby}&` : ''}${query.size ? `size=${query.size}&` : ''}${
            query.minPrice ? `minPrice=${query.minPrice}&` : ''
        }${query.maxPrice ? `maxPrice=${query.maxPrice}&` : ''}${query.lang ? `lang=${query.lang}` : ''}`
    );

    return {
        props: {
            products,
        },
    };
};

export default ProductsPage;
