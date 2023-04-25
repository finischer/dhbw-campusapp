import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GlobalBody from '../../components/GlobalBody';
import useAlert from '../../hooks/useAlert';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import { useMetadata } from '../../hooks/useMetadata';
import SettingRow from '../../components/SettingRow';
import { notificationSettingsScreenStyles } from './notificationSettingsScreen.styles';
import { NotificationSettings } from './notificationSettingsScreen.types';

const NotificationSettingsScreen = () => {
    const { storeDataInAsyncStorage, getDataFromAsyncStorage } = useAsyncStorage();
    const { alert } = useAlert();
    const { t } = useTranslation();
    const navigation = useNavigation();
    const { colors } = useMetadata();


    const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
        dualis: false,
        lectures: false
    })


    // const showAlertSetupNotifications = async () => {
    //     alert("Ändere deine Einstellungen", "Du musst in den Einstellungen Mitteilungen für die App erlauben", [
    //         {
    //             text: "Zu den Einstellungen",
    //             isPreferred: true,
    //             onPress: () => {
    //                 Linking.openSettings()
    //                 navigation.goBack();
    //             }
    //         },
    //         {
    //             text: "Zurück",
    //             style: "cancel",
    //             onPress: () => navigation.goBack()
    //         }
    //     ])
    // }


    // const initNotificationSettings = async () => {
    //     if (!await notificationPermissionAllowed()) {
    //         showAlertSetupNotifications()
    //         return
    //     }
    //     const storageNotificationSettings = await getDataFromAsyncStorage("notifications-settings");

    //     setNotificationSettings(storageNotificationSettings)
    // }

    // init notification settings
    // useEffect(() => {
    //     initNotificationSettings();
    // }, [])

    // const notificationPermissionAllowed = async () => {
    //     const res = await getNotificationPermission();
    //     return res.granted
    // }

    // const updateSetting = async (service: NotificationService) => {
    //     if (!await notificationPermissionAllowed()) {
    //         showAlertSetupNotifications()
    //     } else {
    //         const currentServiceSetting = notificationSettings[service]
    //         setNotificationSettings(oldState => ({
    //             ...oldState,
    //             [service]: !currentServiceSetting
    //         }))

    //         const newNotificationSettings = {
    //             ...notificationSettings,
    //             [service]: !currentServiceSetting
    //         }

    //         storeDataInAsyncStorage("notifications-settings", newNotificationSettings)
    //     }
    // }

    return (
        <GlobalBody style={notificationSettingsScreenStyles.wrapper}>
            <SettingRow disabled title={t("navigation:dualis")} subtitle={t("notificationSettings:dualisDescription")} onChangeSwitch={null} switchValue={notificationSettings.dualis} />
            <SettingRow disabled title={t("navigation:lectures")} subtitle={t("notificationSettings:lecturesDescription")} onChangeSwitch={null} switchValue={notificationSettings.lectures} />
        </GlobalBody>
    )
}

export default NotificationSettingsScreen