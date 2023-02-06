import React from 'react';
import { GetServerSideProps } from 'next';
import ProductActionPageTemplate from '../../../../templates/ProductActionPageTemplate';
import type { IProduct } from '../../../../types/Product.types';
import { getData } from '../../../../utils/fetchData';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../../../../context/GlobalContext';

const EditProductPage = ({ id: productId, product, status }: { id: string; product: IProduct; status: string }) => {
    const { user } = useGlobalContext();

    const router = useRouter();

    React.useEffect(() => {
        router.push({
            query: {
                id: productId,
                accessToken: user?.accessToken,
            },
        });
    }, [user]);

    if (status === 'OK' && product) return <ProductActionPageTemplate action="EDIT" product={product} />;

    return null;
};

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
    const { id } = params as { id: string };
    const { accessToken } = query;

    if (typeof accessToken == 'string') {
        const { status } = await getData('admin', accessToken);
        const { product, messageid } = await getData(`product/${id}`);

        if (messageid === 'product404') {
            return {
                notFound: true,
            };
        }

        if (status === 'OK') {
            return {
                props: {
                    id,
                    status,
                    product,
                },
            };
        }
    }

    return {
        props: {
            id,
        },
    };
};

export default EditProductPage;
