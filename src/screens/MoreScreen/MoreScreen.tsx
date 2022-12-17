import React from "react";
import { Switch } from "react-native";
import GlobalBody from "../../components/GlobalBody";
import RegularText from "../../components/RegularText";
import { useMetadata } from "../../hooks/useMetadata";

const MoreScreen = () => {
  const { theme, changeTheme } = useMetadata();

  const toggle = () => {
    if (theme === "light") {
      changeTheme("dark");
    } else if (theme === "dark") {
      changeTheme("light");
    }
  };

  return (
    <GlobalBody>
      <RegularText>MoreScreen</RegularText>
      <Switch onChange={toggle} value={theme === "dark"} />
    </GlobalBody>
  );
};

export default MoreScreen;
