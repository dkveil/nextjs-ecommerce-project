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
    lastweekproductslength: number;
}

const Home = (props: HomeProps) => {
    const { newestproducts, featuredproducts, lastweekproductslength } = props;

    return (
        <>
            <Head>
                <title>Homepage</title>
            </Head>
            <Hero />
            <NewestProducts products={newestproducts} lastWeekProductsLength={lastweekproductslength} />
            <FeaturedProducts products={featuredproducts} />
        </>
    );
};

export const getServerSideProps = async () => {
    const { newestproducts, featuredproducts, lastweekproductslength } = await getData(`/products/homepage`);

    return {
        props: {
            newestproducts,
            featuredproducts,
            lastweekproductslength,
        },
    };
};

export default Home;
