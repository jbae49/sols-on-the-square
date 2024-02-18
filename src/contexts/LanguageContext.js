// src/contexts/LanguageContext.js
import React, { createContext, useContext, useState } from 'react';
import i18n from '../i18n'; // Import your i18n configuration

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(i18n.language);

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        setLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, handleLanguageChange }}>
            {children}
        </LanguageContext.Provider>
    );
};
