import React from 'react';
import ReactDOM from 'react-dom';
import { ShoppingCartContainer } from './ShoppingCart.styles';
import PopupOverlay from '../PopupOverlay/PopupOverlay';
import { useGlobalContext } from '../../context/GlobalContext';
import texts from './texts';
import { IoIosClose } from 'react-icons/io';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import LoadingSpinner from '../Loading/Loading';
import { useRouter } from 'next/router';

interface IShoppingCart {
    open: boolean;
    websiteTheme: 'light theme' | 'dark theme';
    closeCart: () => void;
}

const ShoppingCart = ({ open, websiteTheme, closeCart }: IShoppingCart) => {
    const [isBrowser, setIsBrowser] = React.useState<boolean>(false);
    const [closeAnimation, setCloseAnimation] = React.useState<boolean>(false);
    const [checkoutLoading, setCheckoutLoading] = React.useState<boolean>(false);
    const { currentLanguage, shoppingcart, totalShoppingCartItems, updateShoppingCartItems, setNotify } = useGlobalContext();

    const router = useRouter();

    const totalPrice = shoppingcart.reduce((total, item) => total + item?.quantity * item?.price[currentLanguage], 0);

    React.useEffect(() => {
        setIsBrowser(true);

        return () => {
            setIsBrowser(false);
            setCloseAnimation(false);
        };
    }, []);

    const handleClose = () => {
        setCloseAnimation(true);
        setTimeout(() => {
            setCloseAnimation(false);
            closeCart();
        }, 400);
    };

    const handleClick = async () => {
        if (shoppingcart.length === 0) {
            setNotify(texts[currentLanguage].cartempty);
            return;
        }

        setCheckoutLoading(true);

        const cartChanges = await updateShoppingCartItems();

        if (cartChanges.length > 0) {
            setNotify(texts[currentLanguage].cartupdated);
            setCheckoutLoading(false);
            return;
        }

        setCheckoutLoading(false);
        handleClose();
        router.push({
            pathname: '/checkout',
        });
    };

    if (isBrowser && open) {
        return ReactDOM.createPortal(
            <>
                <PopupOverlay websiteTheme={websiteTheme} closeAnimation={closeAnimation} onClick={handleClose} />
                <ShoppingCartContainer closeAnimation={closeAnimation} isLoading={checkoutLoading}>
                    <div className="container">
                        <div className="inner-shoppingcart">
                            <div className="shoppingcart-header">
                                <span>
                                    {totalShoppingCartItems === 0 ? texts[currentLanguage].cartempty : texts[currentLanguage].carttitle}
                                </span>
                                <button onClick={handleClose}>
                                    <IoIosClose />
                                    <span>{texts[currentLanguage].search}</span>
                                </button>
                            </div>
                            <div className="shoppingcart-body">
                                <table className="shoppingcart-table">
                                    <tbody>
                                        {shoppingcart?.map((item) => (
                                            <ShoppingCartItem
                                                key={item._id + item.size}
                                                _id={item._id}
                                                size={item.size}
                                                name={item.name}
                                                img={item.img}
                                                categoryid={item.categoryid}
                                                price={item.price}
                                                slug={item.slug}
                                                quantity={item.quantity}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="shoppingcart-footer">
                                <div className="shoppingcart-summary">
                                    <span>{texts[currentLanguage].subtotal}</span>
                                    <span>
                                        {texts[currentLanguage].currency} {totalPrice.toFixed(2)}
                                    </span>
                                </div>
                                <button onClick={handleClick}>
                                    {checkoutLoading ? <LoadingSpinner /> : texts[currentLanguage].checkout}
                                </button>
                            </div>
                        </div>
                    </div>
                </ShoppingCartContainer>
            </>,
            document.getElementById('popup')!
        );
    }

    return null;
};

export default ShoppingCart;
