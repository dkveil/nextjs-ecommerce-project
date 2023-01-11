import { getData } from '../utils/fetchData';
import products from '../exampleProducts.json';
import Hero from '../components/Hero/Hero';

const Home = () => {
    return (
        <>
            <Hero />
        </>
    );
};

export const getServerSideProps = async () => {
    // const res = await getData('product');

    return {
        props: {},
    };
};

export default Home;
