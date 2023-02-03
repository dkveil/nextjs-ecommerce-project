import React from 'react';
import { IProduct } from '../types/Product.types';
import ProductsHeader from '../containers/productspage/ProductsHeader/ProductsHeader';
import ProductsFilter from '../containers/productspage/ProductsFilter/ProductsFilter';
import ProductsList from '../containers/productspage/ProductsList/ProductsList';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../context/GlobalContext';

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

interface IProductsPageTemplate {
    header: string;
    products: IProduct[];
    categoryParam?: string;
}

const ProductsPageTemplate = ({ header, products, categoryParam }: IProductsPageTemplate) => {
    const [filterValues, setFilterValues] = React.useState<IFilterValues>(initialFilterValues);

    const router = useRouter();

    console.log(router);

    const { currentLanguage } = useGlobalContext();

    const filterSearch = () => {
        router.push({
            pathname: router.pathname,
            query: {
                category: categoryParam ? categoryParam : 'null',
                sortby: filterValues.sortby,
                maxPrice: filterValues.maxPrice === 0 ? 'null' : filterValues.maxPrice,
                minPrice: filterValues.minPrice === 0 ? 'null' : filterValues.minPrice,
                size: filterValues.size,
                lang: currentLanguage || 'ENG',
            },
        });
    };

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
            [e.target.name]: [e.target.value],
        }));
    };

    const setPriceFilters = (minPrice: number, maxPrice: number) => {
        setFilterValues((prev) => ({
            ...prev,
            minPrice,
            maxPrice,
        }));
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

    React.useEffect(() => {
        filterSearch();
    }, [filterValues, currentLanguage]);

    return (
        <>
            <ProductsHeader header={header} />
            <ProductsFilter
                filterValues={filterValues}
                handleChangeFilters={handleChangeFilters}
                setPriceFilters={setPriceFilters}
                clearFilters={clearFilters}
            />
            <ProductsList products={products} />
        </>
    );
};

export default ProductsPageTemplate;
