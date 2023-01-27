import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { useRouter } from 'next/router';
import { useSkipFirstEffect } from '../hooks/useSkipFirstEffect.hook';
import { CheckoutContainer, CreateOrderButton } from '../containers/checkoutpage/CheckoutContainer.styles';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import texts from '../containers/checkoutpage/texts';
import Login from '../components/Login/Login';
import CheckoutItem from '../components/CheckoutShoppingCartItem/CheckoutShoppingCartItem';

const CheckoutPage = () => {
    const router = useRouter();
    const { shoppingcart, currentLanguage, user } = useGlobalContext();
    const totalPrice = shoppingcart.reduce((total, item) => total + item?.quantity * item?.price[currentLanguage], 0);
    const [checkoutDetailsOpen, setChekoutDetailsOpen] = React.useState<boolean>(false);
    const cuoponInputRef = React.useRef<HTMLInputElement>(null);

    useSkipFirstEffect(() => {
        if (shoppingcart.length === 0) {
            router.push('/');
        }
    }, []);

    if (shoppingcart.length === 0) {
        return null;
    }

    const handleCuopon = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(cuoponInputRef.current?.value);
    };

    const handleOrder = () => {};

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
                        {shoppingcart.map((item) => (
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
                        <form onSubmit={handleCuopon}>
                            <div className="coupon-input-wrapper">
                                <input ref={cuoponInputRef} placeholder={texts[currentLanguage].gotacoupon} />
                                <button>
                                    <span>{texts[currentLanguage].apply}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="details-body__total">
                        <div className="inner-checkout-body__total">
                            <span className="checkout-body__total-title">{texts[currentLanguage].total}</span>
                            <strong className="checkout-body__total-price">
                                {texts[currentLanguage].currency} {totalPrice.toFixed(2)}
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="checkout__content">
                <div className="inner-checkout-content">
                    {user ? (
                        <CreateOrderButton onClick={handleOrder}>Create order</CreateOrderButton>
                    ) : (
                        <>
                            <div className="checkout-content__header">{texts[currentLanguage].youneedbelogged}</div>
                            <Login type="login" checkoutLogin />
                        </>
                    )}
                </div>
            </div>
        </CheckoutContainer>
    );
};

export default CheckoutPage;
