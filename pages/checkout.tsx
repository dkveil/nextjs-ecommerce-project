import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { useRouter } from 'next/router';
import { useSkipFirstEffect } from '../hooks/useSkipFirstEffect.hook';
import { CheckoutContainer, CreateOrderButton } from '../containers/checkoutpage/CheckoutContainer.styles';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import texts from '../containers/checkoutpage/texts';
import Login from '../components/Login/Login';
import CheckoutItem from '../components/CheckoutShoppingCartItem/CheckoutShoppingCartItem';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';
import { postData } from '../utils/fetchData';
import { IoMdClose } from 'react-icons/io';

const CheckoutPage = () => {
    const router = useRouter();
    const { shoppingcart, currentLanguage, user, setNotify, setGlobalLoading } = useGlobalContext();
    const totalPrice = shoppingcart.reduce((total, item) => total + item?.quantity * item?.price[currentLanguage], 0);
    const [checkoutDetailsOpen, setChekoutDetailsOpen] = React.useState<boolean>(false);
    const [checkoutFormType, setCheckoutFormType] = React.useState<'user' | 'guest' | null>(user ? 'user' : null);
    const cuoponInputRef = React.useRef<HTMLInputElement>(null);
    const [coupon, setCoupon] = React.useState<{ title: string; percentageDiscount: number } | null>(null);

    useSkipFirstEffect(() => {
        if (shoppingcart.length === 0) {
            router.push('/');
        }
    }, []);

    if (shoppingcart.length === 0) {
        return null;
    }

    const handleCuopon = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setGlobalLoading(true);

        try {
            const { messageid, coupon } = await postData('coupon', { couponValue: cuoponInputRef?.current?.value });

            if (coupon) {
                setCoupon(coupon);
            }

            setNotify(texts[currentLanguage][messageid]);
        } catch (error) {
            setNotify(texts[currentLanguage].unknowerror);
        } finally {
            setGlobalLoading(false);
        }
    };

    const handleTotalPrice = () => {
        if (coupon) {
            return (totalPrice * (100 - coupon.percentageDiscount)) / 100;
        }
        return totalPrice;
    };

    return (
        <CheckoutContainer detailsOpen={checkoutDetailsOpen}>
            <div className="checkout__summary" onClick={() => setChekoutDetailsOpen((prev) => !prev)}>
                <div className="inner-checkout-summary">
                    <div className="summary-title">
                        <span>{texts[currentLanguage].ordersummary}</span>
                        <MdOutlineKeyboardArrowDown />
                    </div>
                    <strong className="summary-total-price">
                        <span>
                            {texts[currentLanguage].currency} {totalPrice.toFixed(2)}
                        </span>
                    </strong>
                </div>
            </div>
            <div className="checkout__details">
                <div className="checkout-details__header">
                    <h3 className="checkout-details__title">{texts[currentLanguage].detailstitle}</h3>
                </div>
                <div className="checkeout-details__body">
                    <div className="details-body__items">
                        {shoppingcart?.map((item) => (
                            <CheckoutItem
                                key={item._id}
                                img={item.img}
                                name={item.name}
                                categoryid={item.categoryid}
                                slug={item.slug}
                                price={item.price}
                                quantity={item.quantity}
                                size={item.size}
                            />
                        ))}
                    </div>
                    <div className="details-body__cuopon">
                        {coupon ? (
                            <div className="coupon">
                                <button onClick={() => setCoupon(null)}>
                                    <IoMdClose />
                                </button>
                                <span>
                                    {texts[currentLanguage].applied}{' '}
                                    <b>
                                        {coupon.title} {coupon.percentageDiscount}%
                                    </b>
                                </span>
                            </div>
                        ) : null}
                        <form onSubmit={handleCuopon}>
                            <div className="coupon-input-wrapper">
                                <input ref={cuoponInputRef} placeholder={texts[currentLanguage].gotacoupon} />
                                <button className="coupon-button">
                                    <span>{texts[currentLanguage].apply}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="details-body__total">
                        <div className="inner-checkout-body__total">
                            <span className="checkout-body__total-title">{texts[currentLanguage].total}</span>
                            <strong className="checkout-body__total-price">
                                {texts[currentLanguage].currency} {handleTotalPrice().toFixed(2)}
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="checkout__content">
                <div className="inner-checkout-content">
                    {checkoutFormType ? (
                        <CheckoutForm type={checkoutFormType} totalPrice={handleTotalPrice()} />
                    ) : (
                        <>
                            <div className="checkout-content__header">
                                <h3>{texts[currentLanguage].logintoyouraccount}</h3>
                                <span>{texts[currentLanguage].or}</span>
                                <a href="#" onClick={() => setCheckoutFormType('guest')}>
                                    {texts[currentLanguage].continueasguest}
                                </a>
                            </div>
                            <Login type="login" checkoutLogin />
                        </>
                    )}
                </div>
            </div>
        </CheckoutContainer>
    );
};

export default CheckoutPage;
