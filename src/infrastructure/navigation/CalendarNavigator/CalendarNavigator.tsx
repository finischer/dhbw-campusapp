import React, { useEffect, useState } from "react";
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from "@react-navigation/stack";
import { DeviceEventEmitter, View } from "react-native";
import { headerConfig } from "../Navigation/config";
import CalendarScreen from "../../../screens/CalendarScreen";
import NavigationHeader from "../../../components/NavigationHeader";
import { useTranslation } from "react-i18next";
import { useMetadata } from "../../../hooks/useMetadata";
import ChangeCourseScreen from "../../../screens/ChangeCourseScreen";
import Icon from "../../../components/Icon";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/navigation.types";
import { useLectures } from "../../../hooks/useLectures";
import { GLOBAL_PADDING_HORIZONTAL } from "../../../constants/layout";

const CalendarStack = createStackNavigator();

const CalendarNavigator = () => {
  const { colors } = useMetadata();
  const { course } = useLectures();
  const { t } = useTranslation("navigation");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [showSubTitle, setShowSubTitle] = useState(false);

  useEffect(() => {
    const handleShowSubTitle = (newState: boolean) => {
      setShowSubTitle(newState);
    };

    DeviceEventEmitter.addListener(
      "handleShowSubTitle-CalendarScreen",
      handleShowSubTitle
    );

    return () => {
      DeviceEventEmitter.removeAllListeners(
        "handleShowSubTitle-CalendarScreen"
      );
    };
  }, []);

  const goToChangeCourseScreen = () => {
    navigation.navigate("ChangeCourseScreen");
  };

  return (
    <CalendarStack.Navigator screenOptions={headerConfig()}>
      <CalendarStack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          headerTitle: () => (
            <NavigationHeader
              title={t("lectures")}
              subTitle={course?.courseName}
              showSubTitle={showSubTitle}
            />
          ),
          headerRight: () => (
            <View style={{ marginRight: GLOBAL_PADDING_HORIZONTAL }}>
              <Icon
                source="feather"
                name="edit"
                onClick={goToChangeCourseScreen}
                color={colors.lightText}
              />
            </View>
          ),
        }}
      />

      <CalendarStack.Group
        screenOptions={{
          presentation: "modal",
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.primary,
          },
        }}
      >
        <CalendarStack.Screen
          name="ChangeCourseScreen"
          component={ChangeCourseScreen}
        />
      </CalendarStack.Group>
    </CalendarStack.Navigator>
  );
};

export default CalendarNavigator;
