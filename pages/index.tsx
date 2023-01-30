import React from 'react';
import { getData } from '../utils/fetchData';
import Hero from '../containers/homepage/Hero/Hero';
import Head from 'next/head';
import type { IProduct } from '../types/Product.types';
import NewestProducts from '../containers/homepage/Newest/NewestProducts';
import FeaturedProducts from '../containers/homepage/Featured/FeaturedProducts';

interface HomeProps {
    newestproducts: IProduct[];
    featuredproducts: IProduct[];
}

const Home = (props: HomeProps) => {
    const { newestproducts, featuredproducts } = props;

    return (
        <>
            <Head>
                <title>Homepage</title>
            </Head>
            <Hero />
            <NewestProducts products={newestproducts} />
            <FeaturedProducts products={featuredproducts} />
        </>
    );
};

export const getServerSideProps = async () => {
    const { newestproducts } = await getData(`/products/newest`);
    const { featuredproducts } = await getData(`/products/mostpopular`);

    return {
        props: {
            newestproducts,
            featuredproducts,
        },
    };
};

export default Home;
