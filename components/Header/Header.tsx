import Link from 'next/link';
import React from 'react';
import { HeaderContainer, ListItem, LangItem, MainNavigationContainer, MainNavigationItem } from './Header.styles';
import { CiSearch, CiHeart, CiUser, CiShoppingCart, CiSun, CiCloudMoon } from 'react-icons/ci';
import { useGlobalContext, ILanguageListItem } from '../../context/GlobalContext';
import texts from './texts';
import ChangeThemeButton from '../Button/ChangeThemeButton';
import HamburgerButton from '../Button/HamburgerButton';
import { useRouter } from 'next/router';

type WebsiteMenuTypes = {
    currentLanguage: string;
    languageList: ILanguageListItem[];
    setCurrentLanguage: (lang: string) => void;
} & Omit<IHeader, 'openLoginModal' | 'openShoppingCart' | 'openSearchPanel'>;

const WebsiteMenu = ({ currentLanguage, languageList, setCurrentLanguage, websiteTheme, handleChangeTheme }: WebsiteMenuTypes) => (
    <div className="websitemenu">
        <div className="container">
            <div className="inner-websitemenu">
                <div className="left-col">
                    <ul>
                        {languageList?.map((lang) => (
                            <LangItem key={lang.id}>
                                <button
                                    className={currentLanguage === lang.id ? 'active' : undefined}
                                    onClick={() => setCurrentLanguage(lang.id)}
                                >
                                    {lang.shortcut}
                                </button>
                            </LangItem>
                        ))}
                    </ul>
                </div>
                <div className="right-col">
                    <ChangeThemeButton activeTheme={websiteTheme} onClick={handleChangeTheme}>
                        <CiSun className="sun" />
                        <CiCloudMoon className="moon" />
                        <span />
                    </ChangeThemeButton>
                </div>
            </div>
        </div>
    </div>
);

type UserNavTypes = {
    currentLanguage: string;
    handleToggleOpenNav: () => void;
    activeNav: boolean;
    openLoginModal: () => void;
} & Pick<IHeader, 'openLoginModal' | 'openShoppingCart' | 'openSearchPanel'>;

const UserNav = ({ currentLanguage, handleToggleOpenNav, activeNav, openLoginModal, openShoppingCart, openSearchPanel }: UserNavTypes) => {
    const shoppingCartItems = 14;
    const { user } = useGlobalContext();

    return (
        <div className="usernav">
            <div className="container">
                <div className="inner-usernav">
                    <div className="left-col">
                        <ul>
                            <ListItem>
                                <button className="menu-button__clear search" onClick={openSearchPanel}>
                                    <span>{texts[currentLanguage].search}</span>
                                    <CiSearch />
                                </button>
                            </ListItem>
                            <ListItem>
                                <Link href="/">
                                    <span>{texts[currentLanguage].wish}</span>
                                    <CiHeart />
                                </Link>
                            </ListItem>
                        </ul>
                    </div>
                    <Link href="/" className="logo">
                        NGSENIX
                    </Link>
                    <div className="right-col">
                        <ul>
                            <ListItem>
                                {user ? (
                                    <Link href="/" className="login">
                                        <span>{texts[currentLanguage].myaccount}</span>
                                        <CiUser />
                                    </Link>
                                ) : (
                                    <button className="menu-button__clear login" onClick={openLoginModal}>
                                        <span>{texts[currentLanguage].login}</span>
                                        <CiUser />
                                    </button>
                                )}
                            </ListItem>
                            <ListItem>
                                <button className="menu-button__clear cart" onClick={openShoppingCart}>
                                    <span>{texts[currentLanguage].cart}</span>
                                    <CiShoppingCart />
                                    <i>{shoppingCartItems}</i>
                                </button>
                            </ListItem>
                            <ListItem hamburgerToggler>
                                <HamburgerButton onClick={handleToggleOpenNav} active={activeNav}>
                                    <span className="hamburger"></span>
                                </HamburgerButton>
                            </ListItem>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const navItems = [
    {
        id: 'home',
        path: '/',
    },
    {
        id: 'tshirts',
        path: '/tshirts',
    },
    {
        id: 'hoodies',
        path: '/hoodies',
    },
    {
        id: 'shoes',
        path: '/shoes',
    },
];

type MainNavigationTypes = {
    openNavigation: boolean;
    currentLanguage: string;
    handleToggleOpenNav: () => void;
} & Omit<IHeader, 'openShoppingCart' | 'openSearchPanel'>;

const MainNavigation = ({
    openNavigation,
    currentLanguage,
    websiteTheme,
    handleChangeTheme,
    handleToggleOpenNav,
    openLoginModal,
}: MainNavigationTypes) => {
    const { user } = useGlobalContext();

    return (
        <MainNavigationContainer className="mainnavigation" isOpen={openNavigation}>
            <div className="container">
                <nav className="inner-mainnavigation">
                    <ul className="navlist">
                        {navItems.map((item) => (
                            <MainNavigationItem key={item.id} active={item.path === useRouter().pathname} onClick={handleToggleOpenNav}>
                                <Link href={item.path}>{texts[currentLanguage][item.id]}</Link>
                            </MainNavigationItem>
                        ))}
                    </ul>
                    <ChangeThemeButton activeTheme={websiteTheme} onClick={handleChangeTheme}>
                        <CiSun className="sun" />
                        <CiCloudMoon className="moon" />
                        <span />
                    </ChangeThemeButton>
                </nav>
            </div>
            {user ? (
                <Link href="/" className="loginbutton">
                    <CiUser />
                    <span>{texts[currentLanguage].myaccount}</span>
                </Link>
            ) : (
                <button className="loginbutton" onClick={openLoginModal}>
                    <CiUser />
                    <span>{texts[currentLanguage].login}</span>
                </button>
            )}
        </MainNavigationContainer>
    );
};

interface IHeader {
    websiteTheme: 'light theme' | 'dark theme';
    handleChangeTheme: () => void;
    openLoginModal: () => void;
    openShoppingCart: () => void;
    openSearchPanel: () => void;
}

const Header = ({ websiteTheme, handleChangeTheme, openLoginModal, openShoppingCart, openSearchPanel }: IHeader) => {
    const { currentLanguage, languageList, setCurrentLanguage } = useGlobalContext();

    const [openNavigation, setOpenNavigation] = React.useState<boolean>(false);

    const handleToggleOpenNav = () => setOpenNavigation((prev) => !prev);

    return (
        <HeaderContainer>
            <WebsiteMenu
                currentLanguage={currentLanguage}
                languageList={languageList}
                setCurrentLanguage={setCurrentLanguage}
                websiteTheme={websiteTheme}
                handleChangeTheme={handleChangeTheme}
            />
            <UserNav
                currentLanguage={currentLanguage}
                activeNav={openNavigation}
                handleToggleOpenNav={handleToggleOpenNav}
                openLoginModal={openLoginModal}
                openShoppingCart={openShoppingCart}
                openSearchPanel={openSearchPanel}
            />
            <MainNavigation
                openNavigation={openNavigation}
                currentLanguage={currentLanguage}
                websiteTheme={websiteTheme}
                handleChangeTheme={handleChangeTheme}
                handleToggleOpenNav={handleToggleOpenNav}
                openLoginModal={openLoginModal}
            />
        </HeaderContainer>
    );
};

export default Header;
