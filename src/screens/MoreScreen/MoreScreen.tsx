import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as WebBrowser from 'expo-web-browser';
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Linking, ScrollView, View } from "react-native";
import uuid from 'react-native-uuid';
import Button from "../../components/Button/Button";
import GlobalBody from "../../components/GlobalBody";
import ImportCalendarDialog from "../../components/ImportCalendarDialog";
import { IImportCalendarDialogFunctions } from "../../components/ImportCalendarDialog/importCalendarDialog.types";
import RegularRowItem from "../../components/RegularRowItem";
import SettingSection from "../../components/SettingSection";
import { CONTACT_MAIL } from "../../constants/common";
import { useMetadata } from "../../hooks/useMetadata";
import { RootStackParamList } from "../../infrastructure/navigation/Navigation/navigation.types";
import AppInfo from "./components/AppInfo";
import { SIZES, SPACING } from '../../constants/layout';
import SegmentedControl from "../../components/SegmentedControl/SegmentedControl";
import { moreScreenStyles } from "./moreScreen.styles";


const MoreScreen = () => {
  const { theme, changeTheme, isAndroid, colors } = useMetadata();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const importCalendarRef = useRef<IImportCalendarDialogFunctions | null>(null);

  const segmentIndex = theme === "light" ? 0 : theme === "dark" ? 2 : 1 // light = 0, dark = 2, system = 1

  const handleChangeTheme = (segmentIndex: number) => {
    if (segmentIndex === 0) {
      // light mode
      changeTheme("light")
    } else if (segmentIndex === 1) {
      // system theme
      changeTheme("system")
    } else if (segmentIndex === 2) {
      // dark mode
      changeTheme("dark")
    }
  }

  const goTo = (to: keyof RootStackParamList) => {
    navigation.navigate(to);
  };

  const handleReportBug = async () => {
    const reportId = uuid.v4().slice(0, 8);
    const subject = t("common:emailSubjectBugFound").concat(` - ${reportId}`);
    const body = t("common:emailBodyBugFound");

    const url = `mailto:${CONTACT_MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url)
    }
  };

  const openExternalLink = async (url: string) => {
    await WebBrowser.openBrowserAsync(url, {
      controlsColor: colors.lightText,
      secondaryToolbarColor: colors.lightText,
      enableBarCollapsing: true,
      toolbarColor: colors.accent
    });
  };

  const handleImportCalendar = () => {
    if (true) {
      return importCalendarRef.current?.openDialog();
    }

  };

  return (
    <GlobalBody noVerticalPadding >
      <ImportCalendarDialog ref={importCalendarRef} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: SPACING.md }}>

        {/* General Section */}
        <SettingSection title={t("moreScreen:sectionGeneral")}>
          <RegularRowItem
            leftIconSource="feather"
            leftIcon="message-square"
            rightIconSource="feather"
            rightIcon="chevron-right"
            onClick={() => goTo("NotificationSettingsScreen")}
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
            leftIcon="language-outline"
            onClick={() => goTo("ChangeLanguageScreen")}
            rightIconSource="feather"
            rightIcon="chevron-right"
          >
            {t("navigation:changeLanguage")}
          </RegularRowItem>
        </SettingSection>

        {/* University section */}
        <SettingSection title={t("moreScreen:sectionUniversity")}>
          <RegularRowItem
            leftIconSource="feather"
            leftIcon="map"
            onClick={() =>
              goTo("CampusplanScreen")
            }
            rightIconSource="feather"
            rightIcon="chevron-right"
          >
            {t("moreScreen:campusplan")}
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
            leftIconSource="feather"
            leftIcon="users"
            onClick={() => openExternalLink("https://www.stw-ma.de")}
            rightIconSource="feather"
            rightIcon="external-link"
          >
            {t("moreScreen:studentUnionMannheim")}
          </RegularRowItem>
          <RegularRowItem
            leftIconSource="feather"
            leftIcon="map-pin"
            rightIconSource="feather"
            rightIcon="chevron-right"
            disabled
            onClick={() => goTo("SelectLocationScreen")}
          >
            {t("moreScreen:selectLocation")}
          </RegularRowItem>
        </SettingSection>

        {/* Legal notices Section */}
        <SettingSection title={t("moreScreen:sectionLegalNotices")}>
          <RegularRowItem
            leftIconSource="feather"
            leftIcon="info"
            rightIconSource="feather"
            rightIcon="chevron-right"
            onClick={() => goTo("LegalNoticeScreen")}
          >
            {t("moreScreen:legalNotice")}
          </RegularRowItem>
          <RegularRowItem
            leftIconSource="feather"
            leftIcon="lock"
            rightIconSource="feather"
            rightIcon="external-link"
            onClick={() => openExternalLink("https://github.com/finischer/dhbw-campusapp-legal-texts/blob/main/de/Datenschutzerkl%C3%A4rung.md")}
          >
            {t("moreScreen:privacyPolicy")}
          </RegularRowItem>
          <RegularRowItem
            leftIconSource="feather"
            leftIcon="award"
            rightIconSource="feather"
            rightIcon="chevron-right"
            onClick={() => goTo("LicensesScreen")}
          >
            {t("moreScreen:licenses")}
          </RegularRowItem>
        </SettingSection>


        {/* Theme Toggler */}
        <SettingSection title={t("moreScreen:appearance")} contentGap>
          <SegmentedControl
            values={[t("common:light"), t("common:system"), t("common:dark")]}
            selectedIndex={segmentIndex}
            onChange={(event: any) => {
              handleChangeTheme(event.nativeEvent.selectedSegmentIndex)
            }}
          />
        </SettingSection>

        {/* AppInfo Container */}
        <View style={moreScreenStyles.appInfoView}>
          <AppInfo />

          {/* BugFound Button */}
          <Button variant="text" onClick={handleReportBug}>
            {t("moreScreen:reportBug")}
          </Button>
        </View>


      </ScrollView>
    </GlobalBody>
  );
};

export default MoreScreen;
