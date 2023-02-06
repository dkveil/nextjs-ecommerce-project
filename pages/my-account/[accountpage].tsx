import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import Link from 'next/link';
import { MyAccountSection, NavItem } from '../../containers/myaccountpage/MyAccount.styles';
import texts from '../../containers/myaccountpage/texts';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getData } from '../../utils/fetchData';
import AccountDetailsForm from '../../components/AccountDetailsForm/AccountDetailsForm';
import LoadingSpinner from '../../components/Loading/Loading';
import type { IWishlistItem } from '../../components/WishlistItem/WishlistItem';
import WishlistItem from '../../components/WishlistItem/WishlistItem';

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
];

interface IOrderItem {
    _id: string;
    orderNumber: number;
    createdAt: string;
    totalPrice: number;
    currency: string;
    delivered: boolean;
}

const MyAccountPage = ({ params }: { params: { accountpage: string } }) => {
    const [wishlistItems, setWishlistItems] = React.useState<(IWishlistItem | undefined)[]>([]);
    const [orderItems, setOrderItems] = React.useState<IOrderItem[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    const { currentLanguage, handleLogout, user, setNotify, handleWishlist } = useGlobalContext();

    const router = useRouter();

    const { accountpage } = params;

    const handleLogoutClick = () => {
        handleLogout();
        router.push('/');
    };

    const getOrders = async () => {
        setLoading(true);

        try {
            const { orders } = await getData('user/orders', user?.accessToken);

            setOrderItems(orders);
        } catch (error) {
            setNotify(texts[currentLanguage].unknowerror);
        } finally {
            setLoading(false);
        }
    };

    const getWishlist = async () => {
        if (!user?.data.wishlist) {
            return;
        }

        setLoading(true);

        try {
            const wishlistProducts = await Promise.all(
                user.data.wishlist.map(async (item) => {
                    try {
                        const res = await getData(`product/${item.productId}`);

                        const { product } = res;

                        if (!product) return;

                        return {
                            id: product._id,
                            title: product.title,
                            categoryid: product.categoryid,
                            img: product.images[0],
                            price: product.price,
                            slug: product.slug,
                            createdAt: item.createdAt,
                        };
                    } catch (error) {
                        return;
                    }
                })
            );

            setWishlistItems(wishlistProducts);
        } catch (error) {
            setNotify(texts[currentLanguage].unknowerror);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (accountpage === 'orders') {
            getOrders();
        }
        if (accountpage === 'wishlist') {
            getWishlist();
        }
    }, [params.accountpage, user]);

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
                            {user?.data.role === 'admin' ? (
                                <NavItem>
                                    <Link
                                        href={{
                                            pathname: '/admin',
                                            query: {
                                                accessToken: user?.accessToken,
                                            },
                                        }}
                                    >
                                        Admin
                                    </Link>
                                </NavItem>
                            ) : null}
                            <NavItem>
                                <a href="#" onClick={handleLogoutClick}>
                                    {texts[currentLanguage].logout}
                                </a>
                            </NavItem>
                        </ul>
                    </nav>
                    <div className="my-account__items">
                        {loading && <LoadingSpinner />}
                        {!loading && accountpage === 'orders' ? (
                            orderItems?.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <td>{texts[currentLanguage].ordernumber}</td>
                                            <td>{texts[currentLanguage].orderdate}</td>
                                            <td>{texts[currentLanguage].totalprice}</td>
                                            <td>{texts[currentLanguage].delivered}</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderItems.map((item) => (
                                            <tr key={item._id}>
                                                <td>Nr {item.orderNumber}</td>
                                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    {item.totalPrice} {item.currency}
                                                </td>
                                                <td>{item.delivered ? texts[currentLanguage].yes : texts[currentLanguage].no}</td>
                                                <td>
                                                    <Link href={`/orders/${item._id}`}>{texts[currentLanguage].details}</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div>{texts[currentLanguage].youhavenoorders}</div>
                            )
                        ) : null}
                        {!loading && accountpage === 'edit-account' ? <AccountDetailsForm /> : null}
                        {!loading && accountpage === 'wishlist' ? (
                            wishlistItems.length > 0 ? (
                                <ul>
                                    {wishlistItems.map(
                                        (item) =>
                                            item !== undefined && (
                                                <li key={item.id}>
                                                    <WishlistItem
                                                        id={item.id}
                                                        title={item.title}
                                                        categoryid={item.categoryid}
                                                        img={item.img}
                                                        price={item.price}
                                                        slug={item.slug}
                                                        createdAt={item.createdAt}
                                                        handleWishlist={handleWishlist}
                                                    />
                                                </li>
                                            )
                                    )}
                                </ul>
                            ) : (
                                <div>{texts[currentLanguage].youhavenoitemsinwishlist}</div>
                            )
                        ) : null}
                    </div>
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
