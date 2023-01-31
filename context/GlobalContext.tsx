import React from 'react';
import langOptions from '../utils/languageOptions';
import ACTIONS from './Actions';
import reducers from './Reducers';
import { languageList } from '../helpers/languageList';
import { getData } from '../utils/fetchData';
import texts from './texts';
import Cookie from 'js-cookie';
import type { IUser } from '../types/User.types';
import { useSkipFirstEffect } from '../hooks/useSkipFirstEffect.hook';
import { IShoppingCartItem } from '../types/ShoppingCartItem.types';

export interface ILanguageListItem {
    id: string;
    shortcut: string;
}

interface IGlobalContext {
    currentLanguage: 'ENG' | 'PL';
    setCurrentLanguage: (lang: string) => void;
    languageList: ILanguageListItem[];
    notify: string | null;
    setNotify: (message: string | null) => void;
    user: IUser | null;
    handleLogin: (userdata: IUser) => void;
    handleLogout: () => void;
    websiteTheme: 'light theme' | 'dark theme';
    handleChangeTheme: () => void;
    shoppingcart: IShoppingCartItem[];
    addShoppingCartItem: (product: { _id: string; size: string }, addingFromShoppingCart?: boolean) => void;
    subShoppingCartItem: (product: { _id: string; size: string }, decreasingFromShoppingCart?: boolean) => void;
    removeShoppingCartItem: (product: { _id: string; size: string }) => void;
    updateShoppingCartItems: () => Promise<string[]>;
    clearShoppingCart: () => void;
    totalShoppingCartItems: number;
    globalLoading: boolean;
    setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = React.createContext({} as IGlobalContext);

export const useGlobalContext = () => React.useContext(GlobalContext);

export interface IInitialState {
    websiteTheme: 'light theme' | 'dark theme';
    currentLanguage: null | string;
    notify: string | null;
    loading: boolean;
    user: IUser | null;
    shoppingcart: [];
}

const initialState: IInitialState = {
    websiteTheme: 'light theme',
    currentLanguage: langOptions.ENGLISH,
    notify: null,
    loading: false,
    user: null,
    shoppingcart: [],
};

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(reducers, initialState);
    const [globalLoading, setGlobalLoading] = React.useState<boolean>(false);
    const totalShoppingCartItems = state.shoppingcart.reduce((total: number, item: IShoppingCartItem) => total + item?.quantity, 0);

    const setCurrentLanguage = (lang: string) => {
        dispatch({ type: ACTIONS.LANGUAGE, payload: lang });
        localStorage.setItem('language', lang);
    };

    const setNotify = (message: string | null) => {
        dispatch({ type: ACTIONS.NOTIFY, payload: message });
    };

    const handleLogin = (userdata: IUser) => {
        dispatch({ type: ACTIONS.USER, payload: userdata });
    };

    const handleLogout = () => {
        Cookie.remove('refreshToken', { path: '/api/auth/accessToken' });
        localStorage.removieItem('firstLogin');
        dispatch({ type: ACTIONS.LOGOUT_USER });
        setNotify(texts[state.currentLanguage].logout);
    };

    const handleChangeTheme = () => {
        const payload = state.websiteTheme === 'light theme' ? 'dark theme' : 'light theme';

        dispatch({
            type: ACTIONS.CHANGE_THEME,
            payload,
        });

        localStorage.setItem('theme', payload);
    };

    const addShoppingCartItem = async (product: { _id: string; size: string }, addingFromShoppingCart?: boolean) => {
        setGlobalLoading(true);

        const productInCart =
            state.shoppingcart.find((item: IShoppingCartItem) => item._id === product._id && item.size === product.size) || null;

        try {
            const res = await getData(`product/${product._id}`);

            const { product: currentProduct, messageid } = res;

            if (messageid === 'product404') {
                setNotify(texts[state.currentLanguage].product404);
                return;
            }

            const selectedSize = currentProduct.options.find((option: { title: string }) => option.title === product.size);

            if (!selectedSize.inStock) {
                setNotify(texts[state.currentLanguage].size404);
                removeShoppingCartItem(product);
                return;
            }

            if (selectedSize.inStock === productInCart?.quantity) {
                setNotify(texts[state.currentLanguage].qunatityequalinstock);
                return;
            }

            if (selectedSize.inStock < (productInCart ? productInCart.quantity + 1 : 1)) {
                setNotify(texts[state.currentLanguage].size404);
                return;
            }

            if (productInCart) {
                const newshoppingcartstate = state.shoppingcart.map((item: IShoppingCartItem) => {
                    if (item._id === product._id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
                dispatch({ type: ACTIONS.SET_SHOPPING_CART, payload: newshoppingcartstate });
                if (!addingFromShoppingCart) setNotify(texts[state.currentLanguage].addtocart);
                return;
            }

            dispatch({
                type: ACTIONS.SET_SHOPPING_CART,
                payload: [
                    ...state.shoppingcart,
                    {
                        ...product,
                        name: currentProduct.title,
                        img: currentProduct.images[0],
                        categoryid: currentProduct.categoryid,
                        price: currentProduct.price,
                        slug: currentProduct.slug,
                        quantity: 1,
                    },
                ],
            });
            if (!addingFromShoppingCart) setNotify(texts[state.currentLanguage].addtocart);
        } catch (error) {
            setNotify(texts[state.currentLanguage].unknownerror);
        } finally {
            setGlobalLoading(false);
        }
    };

    const subShoppingCartItem = async (product: { _id: string; size: string }, decreasingFromShoppingCart?: boolean) => {
        const productInCart =
            state.shoppingcart.find((item: IShoppingCartItem) => item._id === product._id && item.size === product.size) || null;

        if (productInCart.quantity === 1) {
            removeShoppingCartItem(product);
            return;
        }

        setGlobalLoading(true);

        try {
            const res = await getData(`product/${product._id}`);

            const { product: currentProduct, messageid } = res;

            if (messageid === 'product404') {
                setNotify(texts[state.currentLanguage].product404);
                return;
            }

            const selectedSize = currentProduct.options.find((option: { title: string }) => option.title === product.size);
            if (selectedSize.inStock === 0) {
                setNotify(texts[state.currentLanguage].size404);
                removeShoppingCartItem(product);
                return;
            }

            let newProductQuantity: number;

            if (selectedSize.inStock < productInCart.quantity - 1) {
                newProductQuantity = selectedSize.inStock;
            } else {
                newProductQuantity = productInCart.quantity - 1;
            }

            const newshoppingcartstate = state.shoppingcart.map((item: IShoppingCartItem) => {
                if (item._id === product._id && item.size === product.size) {
                    return { ...item, quantity: newProductQuantity };
                }
                return item;
            });

            dispatch({ type: ACTIONS.SET_SHOPPING_CART, payload: newshoppingcartstate });
            if (!decreasingFromShoppingCart) setNotify(texts[state.currentLanguage].removefromcart);
        } catch (error) {
            setNotify(texts[state.currentLanguage].unknownerror);
        } finally {
            setGlobalLoading(false);
        }
    };

    const removeShoppingCartItem = (product: { _id: string; size: string }) => {
        const newshoppingcartstate = state.shoppingcart.filter(
            (item: IShoppingCartItem) => !(product._id === item._id && product.size === item.size)
        );

        dispatch({ type: ACTIONS.SET_SHOPPING_CART, payload: newshoppingcartstate });
    };

    const updateShoppingCartItems = async () => {
        let shoppingCartChanges: string[] = [];

        const shoppingCartUpdate = await Promise.all(
            state.shoppingcart.map(async (item: IShoppingCartItem) => {
                try {
                    const res = await getData(`/product/${item._id}`);

                    const { product } = res;

                    if (!product) {
                        shoppingCartChanges.push(item._id);
                        return;
                    }

                    const selectedSize = product.options.find((option: { title: string }) => option.title === item.size);

                    if (selectedSize.inStock === 0) {
                        shoppingCartChanges.push(item._id);
                        return;
                    }

                    if (selectedSize.inStock < item.quantity) {
                        shoppingCartChanges.push(item._id);
                        return { ...item, quantity: selectedSize.inStock };
                    }

                    return item;
                } catch (error) {
                    shoppingCartChanges.push(item?._id);
                    return;
                }
            })
        );

        dispatch({ type: ACTIONS.SET_SHOPPING_CART, payload: shoppingCartUpdate });

        return shoppingCartChanges;
    };

    const clearShoppingCart = () => {
        dispatch({ type: ACTIONS.SET_SHOPPING_CART, payload: [] });
    };

    React.useEffect(() => {
        if (localStorage.getItem('language')) {
            setCurrentLanguage(localStorage.getItem('language')!);
            return;
        }
        setCurrentLanguage(langOptions.ENGLISH);
    }, []);

    React.useEffect(() => {
        if (localStorage.getItem('theme')) {
            dispatch({ type: ACTIONS.CHANGE_THEME, payload: localStorage.getItem('theme')! });
            return;
        }
        dispatch({ type: ACTIONS.CHANGE_THEME, payload: 'light theme' });
        localStorage.setItem('theme', 'light theme');
    }, []);

    React.useEffect(() => {
        if (localStorage.getItem('firstLogin') === 'true') {
            getData('auth/accessToken').then((res) => {
                if (res.messageid) {
                    setNotify(texts[state.currentLanguage][res.messageid]);
                    localStorage.removeItem('firstLogin');
                    return;
                }

                const { accessToken, data } = res;

                handleLogin({ accessToken, data });
            });
        }
    }, []);

    React.useEffect(() => {
        if (localStorage.getItem('shopping_cart_items')) {
            dispatch({ type: ACTIONS.SET_SHOPPING_CART, payload: JSON.parse(localStorage.getItem('shopping_cart_items')) });
        }
    }, []);

    React.useEffect(() => {
        if (state.shoppingcart.length > 0) {
            updateShoppingCartItems();
        }
    }, [state.shoppingcart.length]);

    useSkipFirstEffect(() => {
        localStorage.setItem('shopping_cart_items', JSON.stringify(state.shoppingcart));
    }, [state.shoppingcart]);

    React.useEffect(() => {
        if (state.shoppingcart.length > 0) {
            updateShoppingCartItems();
        }
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                currentLanguage: state.currentLanguage,
                setCurrentLanguage,
                languageList,
                notify: state.notify,
                setNotify,
                user: state.user,
                handleLogin,
                handleLogout,
                websiteTheme: state.websiteTheme,
                handleChangeTheme,
                shoppingcart: state.shoppingcart,
                addShoppingCartItem,
                subShoppingCartItem,
                removeShoppingCartItem,
                totalShoppingCartItems,
                globalLoading,
                updateShoppingCartItems,
                clearShoppingCart,
                setGlobalLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
