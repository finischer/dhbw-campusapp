import React from "react";
import GlobalBody from "../../components/GlobalBody";
import RegularRowItem from "../../components/RegularRowItem";
import { useMetadata } from "../../hooks/useMetadata";
import { FeatherIconName } from "../../services/expo-vector-icons/expo-vector-icons.types";
import { ILanguageOptions } from "../../hooks/useMetadata/useMetadata.types";
import RegularText from "../../components/RegularText";

const ChangeLanguageScreen = () => {
  const { language, changeLanguage } = useMetadata();
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
        leftIcon={() => <RegularText>&#x1f1e9;&#x1f1ea;</RegularText>} // Germany Flag
      >
        Deutsch
      </RegularRowItem>
      <RegularRowItem
        onClick={() => handleChangeLanguage("en")}
        selected={language === "en"}
        leftIcon={() => <RegularText>&#x1f1fa;&#x1f1f8;</RegularText>} // USA Flag
        rightIconSource="feather"
        rightIcon={language === "en" ? rightIcon : undefined}
      >
        English
      </RegularRowItem>
      <RegularRowItem
        onClick={() => handleChangeLanguage("es")}
        selected={language === "es"}
        leftIcon={() => <RegularText>&#58641;</RegularText>} // USA Flag
        rightIconSource="feather"
        rightIcon={language === "es" ? rightIcon : undefined}
      >
        Español
      </RegularRowItem>
    </GlobalBody>
  );
};

export default ChangeLanguageScreen;
