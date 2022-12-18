import React from "react";
import { Switch } from "react-native";
import GlobalBody from "../../components/GlobalBody";
import RegularText from "../../components/RegularText";
import { useMetadata } from "../../hooks/useMetadata";

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
    </GlobalBody>
  );
};

export default MoreScreen;
