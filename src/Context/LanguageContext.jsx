import { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../Services/i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const {i18n} = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const languages = [
    { label: "English", value: "en" },
    { label: "Polish", value: "pl" },
    { label: "Korean", value: "ko" },
    { label: "French", value: "fr" },
    { label: "Japanese", value: "ja" },
  ];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode); 
    setCurrentLanguage(langCode);
  };


  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        changeLanguage, 
        languages 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
