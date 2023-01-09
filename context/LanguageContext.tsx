import React from 'react';
import { languageOptions } from '../utils/languageOptions';

interface ILanguageContext {
    currentLanguage: string;
    setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const LanguageContext = React.createContext({} as ILanguageContext);

export const useLanguageContext = () => React.useContext(LanguageContext);

export const LanguageContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentLanguage, setCurrentLanguage] = React.useState(languageOptions.ENGLISH);

    return <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>{children}</LanguageContext.Provider>;
};
