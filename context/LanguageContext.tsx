import React from 'react';
import langOptions from '../utils/languageOptions';

export interface ILanguageListItem {
    id: string;
    shortcut: string;
}

interface ILanguageContext {
    currentLanguage: string;
    setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>;
    languageList: ILanguageListItem[];
}

const LanguageContext = React.createContext({} as ILanguageContext);

export const useLanguageContext = () => React.useContext(LanguageContext);

const languageList = [
    {
        id: langOptions.ENGLISH,
        shortcut: 'ENG',
    },
    {
        id: langOptions.POLISH,
        shortcut: 'PL',
    },
];

export const LanguageContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentLanguage, setCurrentLanguage] = React.useState(langOptions.ENGLISH);

    return <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, languageList }}>{children}</LanguageContext.Provider>;
};
