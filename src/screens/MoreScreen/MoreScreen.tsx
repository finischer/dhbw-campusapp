import React from "react";
import { ScrollView, View, Linking } from "react-native";
import GlobalBody from "../../components/GlobalBody";
import RegularRowItem from "../../components/RegularRowItem";
import Switch from "../../components/Switch/Switch";
import { useMetadata } from "../../hooks/useMetadata";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { moreScreenStyles } from "./moreScreen.styles";
import FeatherIcon from "../../components/FeatherIcon";
import AppInfo from "./components/AppInfo";
import Button from "../../components/Button/Button";
import { CONTACT_MAIL } from "../../constants/common";
import useAlert from "../../hooks/useAlert";

const MoreScreen = () => {
  const { alert } = useAlert();
  const { theme, changeTheme, language, changeLanguage, colors } =
    useMetadata();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const toggleTheme = () => {
    if (theme === "light") {
      changeTheme("dark");
    } else if (theme === "dark") {
      changeTheme("light");
    }
  };

  const goTo = (to: string) => {
    navigation.navigate(to as never);
  };

  const handleReportBug = async () => {
    const subject = t("common:emailSubjectBugFound");
    const body = t("common:emailBodyBugFound");

    await Linking.openURL(
      `mailto:${CONTACT_MAIL}?subject=${subject}&body=${body}`
    );
  };

  const openExternalLink = async (url: string) => {
    const canOpenUrl = await Linking.canOpenURL(url);

    if (!canOpenUrl) {
      const title = t("common:errorOccured");
      const message = t("moreScreen:alertErrorMessageUrl");
      alert(title, message);
      return;
    }

    await Linking.openURL(url);
  };

  return (
    <GlobalBody>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RegularRowItem
          leftIconSource="feather"
          leftIcon="message-square"
          disabled
        >
          {t("moreScreen:notifications")}
        </RegularRowItem>
        <RegularRowItem leftIconSource="feather" leftIcon="calendar" disabled>
          {t("moreScreen:importCalendar")}
        </RegularRowItem>
        <RegularRowItem
          leftIconSource="fa5"
          leftIcon="table-tennis"
          onClick={() =>
            openExternalLink(
              "https://www.mannheim.dhbw.de/dual-studieren/rund-ums-studium/hochschulsport"
            )
          }
          rightIconSource="feather"
          rightIcon="external-link"
        >
          {t("moreScreen:universitySports")}
        </RegularRowItem>
        <RegularRowItem
          onClick={() => openExternalLink("https://www.stw-ma.de")}
          rightIconSource="feather"
          rightIcon="external-link"
        >
          {t("moreScreen:studentUnionMannheim")}
        </RegularRowItem>
        <RegularRowItem
          leftIconSource="feather"
          onClick={() => goTo("ChangeLanguageScreen")}
          rightIconSource="feather"
          rightIcon="chevron-right"
        >
          {t("navigation:changeLanguage")}
        </RegularRowItem>
        <RegularRowItem
          leftIconSource="feather"
          leftIcon="settings"
          rightIconSource="feather"
          rightIcon="chevron-right"
          disabled
        >
          {t("moreScreen:settings")}
        </RegularRowItem>

        {/* Theme Toggler */}
        <View style={moreScreenStyles.switchContainer}>
          <View style={moreScreenStyles.themeSwitchContainer}>
            <FeatherIcon clickable={false} name="sun" />
            <Switch onChange={toggleTheme} value={theme === "dark"} />
            <FeatherIcon clickable={false} name="moon" />
          </View>
        </View>

        {/* AppInfo Container */}
        <AppInfo />

        {/* BugFound Button */}
        <View>
          <Button variant="text" onClick={handleReportBug}>
            {t("moreScreen:reportBug")}
          </Button>
        </View>
      </ScrollView>
    </GlobalBody>
  );
};

export default MoreScreen;
