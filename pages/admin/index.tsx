import React from 'react';
import { MyAccountSection, NavItem } from '../../containers/myaccountpage/MyAccount.styles';
import texts from '../../containers/myaccountpage/texts';
import { useGlobalContext } from '../../context/GlobalContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getData } from '../../utils/fetchData';

const adminNavItems = [
    {
        name: 'products',
        path: '/admin/products',
    },
];

const AdminPage = ({ status }: { status: string }) => {
    const { currentLanguage, handleLogout, user } = useGlobalContext();

    const router = useRouter();

    const handleLogoutClick = () => {
        handleLogout();
        router.push('/');
    };

    React.useEffect(() => {
        router.push({ query: { accessToken: user?.accessToken } });
    }, [user]);

    if (status === 'OK') {
        return (
            <MyAccountSection>
                <div className="container">
                    <div className="my-account__header">
                        <h2>{texts[currentLanguage].adminmode}</h2>
                    </div>
                    <div className="my-account__body">
                        <nav>
                            <ul>
                                {adminNavItems.map((item) => (
                                    <NavItem key={item.name} active={router.asPath === item.path}>
                                        <Link
                                            href={{
                                                pathname: item.path,
                                                query: {
                                                    accessToken: user?.accessToken,
                                                },
                                            }}
                                        >
                                            {texts[currentLanguage][item.name]}
                                        </Link>
                                    </NavItem>
                                ))}
                                {user?.data.role === 'admin' ? (
                                    <NavItem>
                                        <Link href="/my-account/orders">{texts[currentLanguage].usermode}</Link>
                                    </NavItem>
                                ) : null}
                                <NavItem>
                                    <a href="#" onClick={handleLogoutClick}>
                                        {texts[currentLanguage].logout}
                                    </a>
                                </NavItem>
                            </ul>
                        </nav>
                        <div className="my-account__items"></div>
                    </div>
                </div>
            </MyAccountSection>
        );
    }

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

export default AdminPage;
