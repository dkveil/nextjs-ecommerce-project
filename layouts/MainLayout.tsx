import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { darkThemePallete, lightThemePallete, variablesTheme } from '../styles/theme';
import Header from '../components/Header/Header';
import { LanguageContextProvider } from '../context/LanguageContext';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [websiteTheme, setWebsiteTheme] = React.useState<'light theme' | 'dark theme'>('light theme');

    const handleChangeTheme = () => setWebsiteTheme(websiteTheme === 'light theme' ? 'dark theme' : 'light theme');

    return (
        <LanguageContextProvider>
            <ThemeProvider theme={Object.assign(websiteTheme === 'light theme' ? lightThemePallete : darkThemePallete, variablesTheme)}>
                <GlobalStyles />
                <Header websiteTheme={websiteTheme} handleChangeTheme={handleChangeTheme} />
                <main>{children}</main>
            </ThemeProvider>
        </LanguageContextProvider>
    );
};

export default MainLayout;
