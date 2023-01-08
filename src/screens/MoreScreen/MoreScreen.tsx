import React, { useRef, useState } from "react";
import { ScrollView, View, Linking, Alert } from "react-native";
import GlobalBody from "../../components/GlobalBody";
import RegularRowItem from "../../components/RegularRowItem";
import Switch from "../../components/Switch/Switch";
import { useMetadata } from "../../hooks/useMetadata";
import { useLectures } from "../../hooks/useLectures";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { moreScreenStyles } from "./moreScreen.styles";
import AppInfo from "./components/AppInfo";
import Button from "../../components/Button/Button";
import { CONTACT_MAIL } from "../../constants/common";
import useAlert from "../../hooks/useAlert";
import Icon from "../../components/Icon";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../infrastructure/navigation/Navigation/navigation.types";
import { moreScreenFunctions } from "../../utilities/MoreScreenFunctions";
import ImportCalendarDialog from "../../components/ImportCalendarDialog";
import { IImportCalendarDialogFunctions } from "../../components/ImportCalendarDialog/importCalendarDialog.types";

const MoreScreen = () => {
  const { alert } = useAlert();
  const { theme, changeTheme, isAndroid } = useMetadata();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { importCalendar } = moreScreenFunctions();
  const importCalendarRef = useRef<IImportCalendarDialogFunctions | null>(null);

  const toggleTheme = () => {
    if (theme === "light") {
      changeTheme("dark");
    } else if (theme === "dark") {
      changeTheme("light");
    }
  };

  const goTo = (to: keyof RootStackParamList) => {
    navigation.navigate(to);
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

  const handleImportCalendar = () => {
    if (isAndroid) {
      return importCalendarRef.current?.openDialog();
    }

    importCalendar();
  };

  return (
    <GlobalBody noVerticalPadding>
      <ImportCalendarDialog ref={importCalendarRef} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <RegularRowItem
          leftIconSource="feather"
          leftIcon="message-square"
          disabled
        >
          {t("moreScreen:notifications")}
        </RegularRowItem>
        <RegularRowItem
          leftIconSource="feather"
          leftIcon="calendar"
          onClick={handleImportCalendar}
          rightIconSource="feather"
          rightIcon="download"
        >
          {t("moreScreen:importCalendar")}
        </RegularRowItem>
        <RegularRowItem
          leftIconSource="ionicons"
          leftIcon="ios-american-football-outline"
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
          leftIconSource="ionicons"
          leftIcon="ios-people-outline"
          onClick={() => openExternalLink("https://www.stw-ma.de")}
          rightIconSource="feather"
          rightIcon="external-link"
        >
          {t("moreScreen:studentUnionMannheim")}
        </RegularRowItem>
        <RegularRowItem
          leftIconSource="ionicons"
          leftIcon="language-outline"
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
        <RegularRowItem
          leftIconSource="feather"
          leftIcon="info"
          rightIconSource="feather"
          rightIcon="chevron-right"
          onClick={() => goTo("LegalNoticeScreen")}
        >
          {t("moreScreen:legalNotice")}
        </RegularRowItem>

        {/* Theme Toggler */}
        <View style={moreScreenStyles.switchContainer}>
          <View style={moreScreenStyles.themeSwitchContainer}>
            <Icon source="feather" clickable={false} name="sun" />
            <Switch onChange={toggleTheme} value={theme === "dark"} />
            <Icon source="feather" clickable={false} name="moon" />
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
