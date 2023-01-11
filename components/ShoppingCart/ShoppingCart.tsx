import React from 'react';
import ReactDOM from 'react-dom';
import { ShoppingCartContainer } from './ShoppingCart.styles';
import PopupOverlay from '../PopupOverlay/PopupOverlay';
import { useGlobalContext } from '../../context/GlobalContext';
import texts from './texts';
import { IoIosClose } from 'react-icons/io';

interface IShoppingCart {
    open: boolean;
    websiteTheme: 'light theme' | 'dark theme';
    closeCart: () => void;
}

const ShoppingCart = ({ open, websiteTheme, closeCart }: IShoppingCart) => {
    const [isBrowser, setIsBrowser] = React.useState<boolean>(false);
    const [closeAnimation, setCloseAnimation] = React.useState<boolean>(false);
    const { currentLanguage } = useGlobalContext();

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

    const handleClick = () => console.log('test');

    if (isBrowser && open) {
        return ReactDOM.createPortal(
            <>
                <PopupOverlay websiteTheme={websiteTheme} closeAnimation={closeAnimation} onClick={handleClose} />
                <ShoppingCartContainer closeAnimation={closeAnimation}>
                    <div className="container">
                        <div className="inner-shoppingcart">
                            <div className="shoppingcart-header">
                                <span>{texts[currentLanguage].carttitle}</span>
                                <button onClick={handleClose}>
                                    <IoIosClose />
                                    <span>{texts[currentLanguage].search}</span>
                                </button>
                            </div>
                            <div className="shoppingcart-body"></div>
                            <div className="shoppingcart-footer">
                                <div className="shoppingcart-summary">
                                    <span>{texts[currentLanguage].subtotal}</span>
                                    <span>10$</span>
                                </div>
                                <button onClick={handleClick}>{texts[currentLanguage].checkout}</button>
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
