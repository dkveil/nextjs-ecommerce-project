import React from 'react';
import { getData } from '../../utils/fetchData';
import { IProduct } from '../../types/Product.types';
import ProductsHeader from '../../containers/productspage/ProductsHeader/ProductsHeader';
import ProductsFilter from '../../containers/productspage/ProductsFilter/ProductsFilter';
import ProductsList from '../../containers/productspage/ProductsList/ProductsList';

export interface IFilterValues {
    ['size']: string[];
    minPrice: number;
    maxPrice: number;
    ['sortby']: string;
}

const initialFilterValues: IFilterValues = {
    size: [],
    minPrice: 0,
    maxPrice: 0,
    sortby: 'newest',
};

const ProductsPage = ({ products }: { products: IProduct[] }) => {
    const [filterValues, setFilterValues] = React.useState<IFilterValues>(initialFilterValues);

    const handleChangeFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'clear prices') {
            setFilterValues((prev) => ({
                ...prev,
                minPrice: 0,
                maxPrice: 0,
            }));
        }

        if (e.target.name === 'size') {
            if (filterValues.size?.find((item) => item === e.target.value)) {
                setFilterValues((prev) => ({
                    ...prev,
                    [e.target.name]: prev.size?.filter((item) => item !== e.target.value),
                }));
                return;
            }

            setFilterValues((prev) => ({
                ...prev,
                [e.target.name]: [...prev.size, e.target.value],
            }));
            return;
        }

        setFilterValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.name === 'minPrice' || e.target.name === 'maxPrice' ? Number(e.target.value) : e.target.value,
        }));
        return;
    };

    const clearFilters = (value?: 'size' | 'maxPrice' | 'minPrice' | 'sortby') => {
        if (value === 'minPrice') {
            setFilterValues((prev) => ({
                ...prev,
                minPrice: 0,
                maxPrice: 0,
            }));
        }
        if (value) {
            setFilterValues((prev) => ({
                ...prev,
                [value]: initialFilterValues[value],
            }));
            return;
        }

        setFilterValues({
            size: [],
            minPrice: 0,
            maxPrice: 0,
            sortby: 'newest',
        });
    };

    return (
        <>
            <ProductsHeader header="All" />
            <ProductsFilter filterValues={filterValues} handleChangeFilters={handleChangeFilters} clearFilters={clearFilters} />
            <ProductsList products={products} />
        </>
    );
};

export const getServerSideProps = async () => {
    const res = await getData('/products');

    return {
        props: {
            products: res.products,
        },
    };
};

export default ProductsPage;
