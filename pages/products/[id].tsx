import { GetServerSideProps } from 'next';
import React from 'react';
import { getData } from '../../utils/fetchData';

const ProductPage = ({ product }: { product: any }) => {
    console.log(product);

    return <></>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string };

    const res = await getData(`products/${id}`);

    return {
        props: {
            product: res.product,
        },
    };
};

export default ProductPage;
