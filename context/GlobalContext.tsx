import React from 'react';
import langOptions from '../utils/languageOptions';
import ACTIONS from './Actions';
import reducers from './Reducers';
import { languageList } from '../helpers/languageList';
import { getData } from '../utils/fetchData';
import texts from './texts';

export interface IUser {
    accessToken?: String;
    data: {
        email: string;
        wishlist: string[];
        role: string;
        root: boolean;
    };
}

export interface ILanguageListItem {
    id: string;
    shortcut: string;
}

interface IGlobalContext {
    currentLanguage: string;
    setCurrentLanguage: (lang: string) => void;
    languageList: ILanguageListItem[];
    notify: string | null;
    setNotify: (message: string | null) => void;
    user: IUser | null;
    handleLogin: (userdata: IUser) => void;
}

const GlobalContext = React.createContext({} as IGlobalContext);

export const useGlobalContext = () => React.useContext(GlobalContext);

export interface IInitialState {
    currentLanguage: string;
    notify: string | null;
    loading: boolean;
    user: IUser | null;
}

const initialState: IInitialState = {
    currentLanguage: langOptions.ENGLISH,
    notify: null,
    loading: false,
    user: null,
};

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(reducers, initialState);

    const setCurrentLanguage = (lang: string) => {
        dispatch({ type: ACTIONS.LANGUAGE, payload: lang });
    };

    const setNotify = (message: string | null) => {
        dispatch({ type: ACTIONS.NOTIFY, payload: message });
    };

    const handleLogin = (userdata: IUser) => {
        dispatch({ type: ACTIONS.USER, payload: userdata });
    };

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
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
