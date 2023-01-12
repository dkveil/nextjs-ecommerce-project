import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { darkThemePallete, lightThemePallete, variablesTheme } from '../styles/theme';
import Header from '../components/Header/Header';
import { GlobalContextProvider, useGlobalContext } from '../context/GlobalContext';
import Modal from '../components/Modal/Modal';
import Login from '../components/Login/Login';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import ShoppingCart from '../components/ShoppingCart/ShoppingCart';
import Notify from '../components/Notify/Notify';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [openLoginModal, setOpenLoginModal] = React.useState<boolean>(false);
    const [openShoppingCart, setOpenShoppingCart] = React.useState<boolean>(false);
    const [openSearchPanel, setOpenSearchPanel] = React.useState<boolean>(false);

    const { websiteTheme } = useGlobalContext();

    return (
        <ThemeProvider theme={Object.assign(websiteTheme === 'light theme' ? lightThemePallete : darkThemePallete, variablesTheme)}>
            <GlobalStyles />
            <Header
                openLoginModal={() => setOpenLoginModal(true)}
                openShoppingCart={() => setOpenShoppingCart(true)}
                openSearchPanel={() => setOpenSearchPanel(true)}
            />
            <main>{children}</main>
            <Modal show={openLoginModal} closeModal={() => setOpenLoginModal(false)} websiteTheme={websiteTheme}>
                <Login type="login" closeLoginForm={() => setOpenLoginModal(false)} />
            </Modal>
            <ShoppingCart open={openShoppingCart} websiteTheme={websiteTheme} closeCart={() => setOpenShoppingCart(false)} />
            <SearchPanel open={openSearchPanel} websiteTheme={websiteTheme} closePanel={() => setOpenSearchPanel(false)} />
            <Notify websiteTheme={websiteTheme} />
        </ThemeProvider>
    );
};

export default MainLayout;
