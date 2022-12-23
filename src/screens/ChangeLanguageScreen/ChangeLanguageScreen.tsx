import React from "react";
import GlobalBody from "../../components/GlobalBody";
import RegularRowItem from "../../components/RegularRowItem";
import { useMetadata } from "../../hooks/useMetadata";
import { FeatherIconName } from "../../services/expo-vector-icons/expo-vector-icons.types";
import { ILanguageOptions } from "../../hooks/useMetadata/useMetadata.types";
import { useTranslation } from "react-i18next";

const ChangeLanguageScreen = () => {
  const { language, changeLanguage } = useMetadata();
  const { t } = useTranslation("common");
  const rightIcon: FeatherIconName = "check";

  const handleChangeLanguage = (newLanguage: ILanguageOptions) => {
    changeLanguage(newLanguage);
  };

  return (
    <GlobalBody>
      <RegularRowItem
        onClick={() => handleChangeLanguage("de")}
        selected={language === "de"}
        rightIconSource="feather"
        rightIcon={language === "de" ? rightIcon : undefined}
      >
        Deutsch
      </RegularRowItem>
      <RegularRowItem
        onClick={() => handleChangeLanguage("en")}
        selected={language === "en"}
        rightIconSource="feather"
        rightIcon={language === "en" ? rightIcon : undefined}
      >
        English
      </RegularRowItem>
    </GlobalBody>
  );
};

export default ChangeLanguageScreen;
