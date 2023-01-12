import React from 'react';
import langOptions from '../utils/languageOptions';
import ACTIONS from './Actions';
import reducers from './Reducers';
import { languageList } from '../helpers/languageList';
import { getData } from '../utils/fetchData';
import texts from './texts';
import Cookie from 'js-cookie';
import type { IUser } from '../types/User.types';

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
}

const GlobalContext = React.createContext({} as IGlobalContext);

export const useGlobalContext = () => React.useContext(GlobalContext);

export interface IInitialState {
    websiteTheme: 'light theme' | 'dark theme';
    currentLanguage: null | string;
    notify: string | null;
    loading: boolean;
    user: IUser | null;
}

const initialState: IInitialState = {
    websiteTheme: 'light theme',
    currentLanguage: langOptions.ENGLISH,
    notify: null,
    loading: false,
    user: null,
};

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(reducers, initialState);

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
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
