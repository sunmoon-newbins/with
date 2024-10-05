import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      login: "Login",
    },
  },
  ko: {
    translation: {
      login: "로그인",
    },
  },
  es: {
    translation: {
      login: "Iniciar sesión",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // 기본 언어 설정
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
