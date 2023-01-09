import Link from 'next/link';
import React from 'react';
import { HeaderContainer, ListItem, LangItem, MainNavigationContainer, MainNavigationItem } from './Header.styles';
import { CiSearch, CiHeart, CiUser, CiShoppingCart, CiSun, CiCloudMoon } from 'react-icons/ci';
import { useLanguageContext, ILanguageListItem } from '../../context/LanguageContext';
import texts from './texts';
import ChangeThemeButton from '../Button/ChangeThemeButton';
import HamburgerButton from '../Button/HamburgerButton';
import { useRouter } from 'next/router';

interface IWebsiteMenu extends IHeader {
    currentLanguage: string;
    languageList: ILanguageListItem[];
    setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const WebsiteMenu = ({ currentLanguage, languageList, setCurrentLanguage, websiteTheme, handleChangeTheme }: IWebsiteMenu) => (
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

interface IUserNav {
    currentLanguage: string;
    handleToggleOpenNav: () => void;
    activeNav: boolean;
}

const UserNav = ({ currentLanguage, handleToggleOpenNav, activeNav }: IUserNav) => {
    const shoppingCartItems = 14;

    return (
        <div className="usernav">
            <div className="container">
                <div className="inner-usernav">
                    <div className="left-col">
                        <ul>
                            <ListItem>
                                <button className="menu-button__clear search">
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
                    <Link href="" className="logo">
                        NGSENIX
                    </Link>
                    <div className="right-col">
                        <ul>
                            <ListItem>
                                <button className="menu-button__clear login">
                                    <span>{texts[currentLanguage].login}</span>
                                    <CiUser />
                                </button>
                            </ListItem>
                            <ListItem>
                                <button className="menu-button__clear cart">
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

interface IHeader {
    websiteTheme: 'light theme' | 'dark theme';
    handleChangeTheme: () => void;
}

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

interface IMainNavigation extends IHeader {
    openNavigation: boolean;
    currentLanguage: string;
    handleToggleOpenNav: () => void;
}

const MainNavigation = ({ openNavigation, currentLanguage, websiteTheme, handleChangeTheme, handleToggleOpenNav }: IMainNavigation) => (
    <MainNavigationContainer className="mainnavigation" isOpen={openNavigation}>
        <div className="container">
            <nav className="inner-mainnavigation">
                <ul className="navlist">
                    {navItems.map((item) => (
                        <MainNavigationItem active={item.path === useRouter().pathname} onClick={handleToggleOpenNav}>
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
        <button className="loginbutton">
            <CiUser />
            <span>{texts[currentLanguage].login}</span>
        </button>
    </MainNavigationContainer>
);

const Header = ({ websiteTheme, handleChangeTheme }: IHeader) => {
    const { currentLanguage, languageList, setCurrentLanguage } = useLanguageContext();

    const [openNavigation, setOpenNavigation] = React.useState<boolean>(true);

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
            <UserNav currentLanguage={currentLanguage} activeNav={openNavigation} handleToggleOpenNav={handleToggleOpenNav} />
            <MainNavigation
                openNavigation={openNavigation}
                currentLanguage={currentLanguage}
                websiteTheme={websiteTheme}
                handleChangeTheme={handleChangeTheme}
                handleToggleOpenNav={handleToggleOpenNav}
            />
        </HeaderContainer>
    );
};

export default Header;
