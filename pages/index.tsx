import React from 'react';
import { getData } from '../utils/fetchData';
import Hero from '../components/Hero/Hero';
import Head from 'next/head';
import Link from 'next/link';
import { useGlobalContext } from '../context/GlobalContext';
import type { IProduct } from '../types/Product.types';

interface HomeProps {
    products: IProduct[];
}

const Home = (props: HomeProps) => {
    const { products } = props;
    const { currentLanguage } = useGlobalContext();

    return (
        <>
            <Head>
                <title>Homepage</title>
            </Head>
            <Hero />
            {products.map((product) => (
                <Link href={`/products/${product._id}`} style={{ display: 'block' }}>
                    {product.title[currentLanguage]}
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
