import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import Link from 'next/link';
import { MyAccountSection, NavItem } from '../../containers/myaccountpage/MyAccount.styles';
import texts from '../../containers/myaccountpage/texts';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getData } from '../../utils/fetchData';
import AccountDetailsForm from '../../components/AccountDetailsForm/AccountDetailsForm';

const userNavItems = [
    {
        name: 'orders',
        path: '/my-account/orders',
    },
    {
        name: 'accdetails',
        path: '/my-account/edit-account',
    },
    {
        name: 'wishlist',
        path: '/my-account/wishlist',
    },
    {
        name: 'logout',
        path: '#',
    },
];

const MyAccountPage = ({ params }: { params: { accountpage: string } }) => {
    const { currentLanguage, handleLogout, user } = useGlobalContext();

    if (!user) {
        return null;
    }

    const router = useRouter();

    const { accountpage } = router.query;

    const handleLogoutClick = () => {
        handleLogout();
        router.push('/');
    };

    const getOrders = async () => {
        try {
            const res = await getData('user/orders', user?.accessToken);

            console.log(res);
        } catch (error) {}
    };

    React.useEffect(() => {
        if (params.accountpage === 'orders') {
            getOrders();
        }
    }, [params.accountpage]);

    return (
        <MyAccountSection>
            <div className="container">
                <div className="my-account__header">
                    <h2>{texts[currentLanguage].header}</h2>
                </div>
                <div className="my-account__body">
                    <nav>
                        <ul>
                            {userNavItems.map((item) => (
                                <NavItem key={item.name} active={router.asPath === item.path}>
                                    {item.name === 'logout' ? (
                                        <a href="#" onClick={handleLogoutClick}>
                                            {texts[currentLanguage][item.name]}
                                        </a>
                                    ) : (
                                        <Link href={item.path}>{texts[currentLanguage][item.name]}</Link>
                                    )}
                                </NavItem>
                            ))}
                        </ul>
                    </nav>
                    <div className="my-account__items">{accountpage === 'edit-account' ? <AccountDetailsForm /> : null}</div>
                </div>
            </div>
        </MyAccountSection>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;

    const { refreshToken } = context.req.cookies;

    if (!refreshToken) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            params,
        },
    };
};

export default MyAccountPage;
