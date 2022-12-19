import React from "react";
import { ScrollView } from "react-native";
import GlobalBody from "../../components/GlobalBody";
import RegularRowItem from "../../components/RegularRowItem";
import RegularText from "../../components/RegularText";
import Switch from "../../components/Switch/Switch";
import { useMetadata } from "../../hooks/useMetadata";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const ROW_ITEM_GAP = 10;

const MoreScreen = () => {
  const { theme, changeTheme, language, changeLanguage, colors } =
    useMetadata();
  const navigation = useNavigation();
  const { t } = useTranslation("navigation");

  const toggleTheme = () => {
    if (theme === "light") {
      changeTheme("dark");
    } else if (theme === "dark") {
      changeTheme("light");
    }
  };

  const toggleLanguage = () => {
    if (language === "de") {
      changeLanguage("en");
    } else if (language === "en") {
      changeLanguage("de");
    }
  };

  const goTo = (to: string) => {
    navigation.navigate(to as never);
  };

  return (
    <GlobalBody>
      <ScrollView>
        <RegularRowItem leftIcon="settings" rightIcon="chevron-right" disabled>
          Einstellungen
        </RegularRowItem>
        <RegularRowItem
          onClick={() => goTo("ChangeLanguageScreen")}
          rightIcon="chevron-right"
        >
          {t("changeLanguage")}
        </RegularRowItem>
        <RegularRowItem disabled>Benachrichtigungen</RegularRowItem>
        <RegularRowItem disabled>Kalender importieren</RegularRowItem>

        {/* Toggler */}
        <Switch onChange={toggleTheme} value={theme === "dark"} disabled />
        <Switch onChange={toggleLanguage} value={language === "de"} disabled />
      </ScrollView>
    </GlobalBody>
  );
};

export default MoreScreen;
