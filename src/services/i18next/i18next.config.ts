import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import de from "../../constants/translations/de";
import en from "../../constants/translations/en";
import es from "../../constants/translations/es";
import RNLanguageDetector from "@os-team/i18next-react-native-language-detector";

const resources = {
  de,
  en,
  es,
};

i18next.use(RNLanguageDetector).use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  fallbackLng: "en",
});

export default i18next;
