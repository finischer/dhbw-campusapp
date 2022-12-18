import React from "react";
import { Switch, ScrollView } from "react-native";
import GlobalBody from "../../components/GlobalBody";
import RegularRowItem from "../../components/RegularRowItem";
import RegularText from "../../components/RegularText";
import { useMetadata } from "../../hooks/useMetadata";

const ROW_ITEM_GAP = 10;

const MoreScreen = () => {
  const { theme, changeTheme, language, changeLanguage } = useMetadata();

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

  return (
    <GlobalBody>
      <RegularText>MoreScreen</RegularText>
      <Switch onChange={toggleTheme} value={theme === "dark"} />
      <Switch onChange={toggleLanguage} value={language === "de"} />

      <ScrollView>
        <RegularRowItem leftIcon="settings" rightIcon="chevron-right" disabled>
          Einstellungen
        </RegularRowItem>
        <RegularRowItem disabled marginTop={ROW_ITEM_GAP}>
          Sprache ändern
        </RegularRowItem>
        <RegularRowItem disabled marginTop={ROW_ITEM_GAP}>
          Benachrichtigungen
        </RegularRowItem>
        <RegularRowItem disabled marginTop={ROW_ITEM_GAP}>
          Kalender importieren
        </RegularRowItem>
      </ScrollView>
    </GlobalBody>
  );
};

export default MoreScreen;
