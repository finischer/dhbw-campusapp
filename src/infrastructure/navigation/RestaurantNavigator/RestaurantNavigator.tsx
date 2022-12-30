import React, { useEffect, useState } from "react";
import { DeviceEventEmitter } from "react-native";
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from "@react-navigation/stack";
import RestaurantScreen from "../../../screens/RestaurantScreen";
import { headerConfig } from "../Navigation/config";
import { useRestaurant } from "../../../hooks/useRestaurant/useRestaurant";
import NavigationHeader from "../../../components/NavigationHeader";
import { useTranslation } from "react-i18next";
import ChangeRestaurantScreen from "../../../screens/ChangeRestaurantScreen/ChangeRestaurantScreen";
import { useMetadata } from "../../../hooks/useMetadata";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/navigation.types";
import { View } from "react-native";
import Icon from "../../../components/Icon";
import { GLOBAL_PADDING_HORIZONTAL } from "../../../constants/layout";

const RestaurantStack = createStackNavigator();

const RestaurantNavigator = () => {
  const { t } = useTranslation("navigation");
  const { colors } = useMetadata();
  const { formattedRestaurantName } = useRestaurant();
  const [showSubTitle, setShowSubTitle] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const handleShowSubTitle = (newState: boolean) => {
      setShowSubTitle(newState);
    };

    DeviceEventEmitter.addListener("handleShowSubTitle", handleShowSubTitle);

    return () => {
      DeviceEventEmitter.removeAllListeners("handleShowSubTitle");
    };
  }, []);

  const goToChangeRestaurantScreen = () => {
    navigation.navigate("ChangeRestaurantScreen");
  };

  return (
    <RestaurantStack.Navigator screenOptions={headerConfig()}>
      <RestaurantStack.Group>
        <RestaurantStack.Screen
          name="RestaurantScreen"
          component={RestaurantScreen}
          options={{
            headerTitle: () => (
              <NavigationHeader
                title={t("cafeteria")}
                subTitle={formattedRestaurantName}
                showSubTitle={showSubTitle}
              />
            ),
            headerRight: () => (
              <View style={{ marginRight: GLOBAL_PADDING_HORIZONTAL }}>
                <Icon
                  source="feather"
                  name="edit"
                  onClick={goToChangeRestaurantScreen}
                  color={colors.lightText}
                />
              </View>
            ),
          }}
        />
      </RestaurantStack.Group>
      <RestaurantStack.Group
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
        <RestaurantStack.Screen
          name="ChangeRestaurantScreen"
          component={ChangeRestaurantScreen}
        />
      </RestaurantStack.Group>
    </RestaurantStack.Navigator>
  );
};

export default RestaurantNavigator;
