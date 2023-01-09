import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { darkThemePallete, lightThemePallete, variablesTheme } from '../styles/theme';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [websiteTheme, setWebsiteTheme] = React.useState<'light theme' | 'dark theme'>('light theme');

    const handleChangeTheme = () => setWebsiteTheme(websiteTheme === 'light theme' ? 'dark theme' : 'light theme');

    return (
        <>
            <ThemeProvider theme={Object.assign(websiteTheme === 'light theme' ? lightThemePallete : darkThemePallete, variablesTheme)}>
                <GlobalStyles />
                {children}
            </ThemeProvider>
        </>
    );
};

export default MainLayout;
