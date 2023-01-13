import React from 'react';
import { getData } from '../utils/fetchData';
import Hero from '../components/Hero/Hero';
import Head from 'next/head';
import Link from 'next/link';
import type { IProduct } from '../types/Product.types';
import slugify from 'slugify';

interface HomeProps {
    products: IProduct[];
}

const Home = (props: HomeProps) => {
    const { products } = props;

    return (
        <>
            <Head>
                <title>Homepage</title>
            </Head>
            <Hero />
            {products.map((product) => (
                <Link
                    href={`/products/${product.categoryid}/${slugify(product.title.ENG).toLocaleLowerCase()}`}
                    style={{ display: 'block' }}
                >
                    {slugify(product.title.ENG).toLocaleLowerCase()}
                </Link>
            ))}
        </>
    );
};

export const getServerSideProps = async () => {
    const res = await getData(`/products`);

    return {
        props: {
            products: res.products,
        },
    };
};

export default Home;
