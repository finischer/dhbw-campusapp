import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import de from "../../constants/translations/de";
import en from "../../constants/translations/en";

const resources = {
  de,
  en,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  fallbackLng: "en",
});

export default i18n;
