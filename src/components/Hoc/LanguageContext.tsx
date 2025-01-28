import React, { createContext, useContext, useEffect, useState } from 'react';

interface LanguageContextProps {
    language: string;
    setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
    undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [language, setLanguage] = useState<string>('az'); // Default language
    useEffect(() => {
        const storedLang = localStorage.getItem('accept-language');
        if (storedLang) {
            setLanguage(storedLang);
        }
    }, []);
    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
