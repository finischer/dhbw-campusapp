import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from "@react-navigation/stack";
import { View } from "react-native";
import { headerConfig } from "../Navigation/config";
import CalendarScreen from "../../../screens/CalendarScreen";
import NavigationHeader from "../../../components/NavigationHeader";
import { useTranslation } from "react-i18next";
import { useMetadata } from "../../../hooks/useMetadata";
import ChangeCourseScreen from "../../../screens/ChangeCourseScreen";
import Icon from "../../../components/Icon";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/navigation.types";

const CalendarStack = createStackNavigator();

const CalendarNavigator = () => {
  const { colors } = useMetadata();
  const { t } = useTranslation("navigation");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const goToChangeCourseScreen = () => {
    navigation.navigate("ChangeCourseScreen");
  };

  return (
    <CalendarStack.Navigator screenOptions={headerConfig()}>
      <CalendarStack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          headerTitle: () => <NavigationHeader title={t("lectures")} />,
          headerRight: () => (
            <View style={{ marginRight: 20 }}>
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
          gestureEnabled: true,
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
