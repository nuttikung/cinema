import { Language } from '@/types';
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

type UseLanguage = {
  language: Language['label'];
  setLanguage: React.Dispatch<React.SetStateAction<Language['value']>>;
};

const getLanguage = (language: string) => {
  switch (language) {
    case 'en-US':
    case 'en-GB':
      return 'ENGLISH';
    case 'th':
      return 'THAI';
    default:
      return 'ENGLISH';
  }
};

export const LanguageContext = createContext<UseLanguage | null>(null);

export const LanguageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [language, setLanguage] = useState<Language['label']>(getLanguage(navigator.language));
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): UseLanguage => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used inside the LanguageProvider');
  }

  return context;
};
