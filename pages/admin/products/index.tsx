import React from 'react';
import { ManagerSection } from '../../../containers/managerpage/ManagerPage.styles';
import texts from '../../../containers/managerpage/texts';
import { useGlobalContext } from '../../../context/GlobalContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getData } from '../../../utils/fetchData';
import type { IProduct } from '../../../types/Product.types';
import ProductManagerItem from '../../../components/ProductManagerItem/ProductManagerItem';
import { GetServerSideProps } from 'next';

const ProductsManagerPage = ({ products, status }: { products: IProduct[]; status: string }) => {
    const { currentLanguage, user } = useGlobalContext();

    const router = useRouter();

    const handleDeleteProduct = (id: string) => {
        alert(id);
    };

    React.useEffect(() => {
        router.push({ query: { accessToken: user?.accessToken } });
    }, [user]);

    if (status === 'OK') {
        return (
            <ManagerSection>
                <div className="container">
                    <div className="manager__header">
                        <h2>{texts[currentLanguage].productsheader}</h2>
                    </div>
                    <div className="manager__body">
                        <Link className="add-product-button" href={'/admin/products/create'}>
                            {texts[currentLanguage].addproduct}
                        </Link>
                        <div className="manager__items">
                            <ul>
                                {products.map((item) => (
                                    <li key={item._id}>
                                        <ProductManagerItem
                                            id={item._id}
                                            title={item.title}
                                            categoryid={item.categoryid}
                                            img={item.images[0]}
                                            handleDeleteProduct={handleDeleteProduct}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </ManagerSection>
        );
    }

    return null;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { accessToken } = query;

    if (typeof accessToken == 'string') {
        const { status } = await getData('admin', accessToken);
        const { products } = await getData('products');

        if (status === 'OK') {
            return {
                props: {
                    status,
                    products,
                },
            };
        }
    }

    return {
        props: {},
    };
};

export default ProductsManagerPage;
