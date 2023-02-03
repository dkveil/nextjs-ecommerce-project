import React from 'react';
import { GetServerSideProps } from 'next';
import { getData } from '../../utils/fetchData';
import { useGlobalContext } from '../../context/GlobalContext';
import { OrderPageContainer } from '../../containers/orderpage/OrderPage.styles';
import texts from '../../containers/orderpage/texts';
import ShoppingCartItem from '../../components/ShoppingCartItem/ShoppingCartItem';
import type { IShoppingCartItem } from '../../types/ShoppingCartItem.types';

interface IOrderDetails {
    _id: string;
    orderNumber: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    postcode: string;
    delivered: boolean;
    totalPrice: number;
    currency: string;
    shoppingcart: IShoppingCartItem[];
}

const OrderDetailsPage = ({ orderId }: { orderId: string }) => {
    const [orderDetails, setOrderDetails] = React.useState<IOrderDetails>();

    const { user, currentLanguage, setNotify, setGlobalLoading } = useGlobalContext();

    const getOrderData = async () => {
        setGlobalLoading(true);
        try {
            const { order } = await getData(`order/${orderId}`, user?.accessToken);

            setOrderDetails(order);
        } catch (error) {
            setNotify(texts[currentLanguage].unknowerror);
        } finally {
            setGlobalLoading(false);
        }
    };

    React.useEffect(() => {
        getOrderData();
    }, [user]);

    if (!orderDetails) {
        return;
    }

    return (
        <OrderPageContainer>
            <div className="container">
                <div className="inner-order-page">
                    <div className="order-page__header">
                        <h2>
                            {texts[currentLanguage].header} NR {orderDetails.orderNumber}
                        </h2>
                    </div>
                    <div className="order-page__body">
                        <div className="order-page__info">
                            <h4>{texts[currentLanguage].detailsheader}:</h4>
                            <p>
                                {texts[currentLanguage].totalprice}: {orderDetails.totalPrice.toFixed(2)} {orderDetails.currency}
                            </p>
                            <p>
                                {texts[currentLanguage].firstName}: {orderDetails.name}
                            </p>
                            <p>
                                {texts[currentLanguage].lastName}: {orderDetails.lastName}
                            </p>
                            <p>E-mail: {orderDetails.email}</p>
                            <p>
                                {texts[currentLanguage].phone}: {orderDetails.phone}
                            </p>
                            <p>
                                {texts[currentLanguage].street}: {orderDetails.street}
                            </p>
                            <p>
                                {texts[currentLanguage].city}: {orderDetails.city}
                            </p>
                            <p>
                                {texts[currentLanguage].postcode}: {orderDetails.postcode}
                            </p>
                            <p>
                                {texts[currentLanguage].delivered}:{' '}
                                {orderDetails.delivered ? texts[currentLanguage].yes : texts[currentLanguage].no}
                            </p>
                        </div>
                        <div className="order-page__items">
                            <h4>{texts[currentLanguage].orderedheader}:</h4>
                            <table>
                                {orderDetails.shoppingcart.map((item) => (
                                    <ShoppingCartItem
                                        _id={item._id}
                                        size={item.size}
                                        name={item.name}
                                        img={item.img}
                                        categoryid={item.categoryid}
                                        price={item.price}
                                        quantity={item.quantity}
                                        slug={item.slug}
                                        orderItem
                                    />
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </OrderPageContainer>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };

    return {
        props: {
            orderId: id,
        },
    };
};

export default OrderDetailsPage;
