import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Vietnamese from './vi';
const resources = {
  vi: {
    translation: Vietnamese,
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

// import {useTranslation} from 'react-i18next';
//   const {t} = useTranslation();

//   changeLanguage = (locale) => {
//     i18n.changeLanguage(locale);
//   };
//   return {string, changeLanguage};
// };
