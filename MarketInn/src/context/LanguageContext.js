import { createContext } from 'react';

// Create Language Context
export const LanguageContext = createContext({
  language: 'ru', // Default language
  toggleLanguage: () => {} // Default empty function
});

export default LanguageContext; 