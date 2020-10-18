import i18n from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';
import EN from './en';
import VI from './vi';

const resources = {
  vi: {
    translation: VI,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',

  keySeparator: '.',

  interpolation: {
    escapeValue: false,
  },
});

export const t = (text) => { 
  const {t} = useTranslation();
  return t(text);
};

export const changeLanguage = (locale) => {
  const {i18n} = useTranslation();
  i18n.changeLanguage(locale);
};
