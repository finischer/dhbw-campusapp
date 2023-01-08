import i18 from "i18next";
import { initReactI18next } from "react-i18next";
import de from "../../constants/translations/de";
import en from "../../constants/translations/en";
import RNLanguageDetector from "@os-team/i18next-react-native-language-detector";

const resources = {
  de,
  en,
};

i18.use(RNLanguageDetector).use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  fallbackLng: "en",
});

export default i18;
