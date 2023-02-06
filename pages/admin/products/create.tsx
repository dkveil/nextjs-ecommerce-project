import React from 'react';
import ProductActionPageTemplate from '../../../templates/ProductActionPageTemplate';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../../../context/GlobalContext';
import { GetServerSideProps } from 'next';
import { getData } from '../../../utils/fetchData';

const CreateProductPage = ({ status }: { status: string }) => {
    const { user } = useGlobalContext();

    const router = useRouter();

    React.useEffect(() => {
        router.push({
            query: {
                accessToken: user?.accessToken,
            },
        });
    }, [user]);

    if (status === 'OK') return <ProductActionPageTemplate action="ADD" />;

    return null;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { accessToken } = query;

    if (typeof accessToken == 'string') {
        const { status } = await getData('admin', accessToken);

        if (status === 'OK') {
            return {
                props: {
                    status,
                },
            };
        }
    }

    return {
        props: {},
    };
};

export default CreateProductPage;
