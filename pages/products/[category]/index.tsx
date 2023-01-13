import { GetServerSideProps } from 'next';
import { getData } from '../../../utils/fetchData';
import { ParsedUrlQuery } from 'querystring';
import type { IProduct } from '../../../types/Product.types';

const CategoryPage = ({ products }: { products: IProduct[] }) => {
    return <></>;
};

interface IParams extends ParsedUrlQuery {
    category: 'tshirts' | 'hoodies' | 'shoes';
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { category } = context.params as IParams;

    const res = await getData(`/products/${category}`);

    return {
        props: {
            products: res.products,
        },
    };
};

export default CategoryPage;
