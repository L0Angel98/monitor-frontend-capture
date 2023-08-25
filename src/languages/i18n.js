import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { supportedLngs } from "../utils/ConstCapture";

const detectionOptions = {
  order: [
    "path",
    "cookie",
    "navigator",
    "localStorage",
    "subdomain",
    "queryString",
    "htmlTag"
  ],
  lookupFromPathIndex: 0
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .use(Backend)
  .init({
    detection: detectionOptions,
    //debug: process.env.NODE_ENV === "development",
    fallbackLng: "en", // Idioma de respaldo si no se encuentra una traducción
    supportedLngs,
    interpolation: {
      escapeValue: false // Evitar la necesidad de escapar caracteres especiales
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    },
    defaultNS: false
  });

export default i18n;
