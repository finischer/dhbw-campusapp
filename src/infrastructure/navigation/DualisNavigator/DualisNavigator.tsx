import React, { useState } from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import LoginScreen from "../../../screens/LoginScreen";
import DualisScreen from "../../../screens/DualisScreen";
import LogoutButton from "../../../components/LogoutButton";
import SubjectDetailsScreen from "../../../screens/SubjectDetailsScreen";
import { useMetadata } from "../../../hooks/useMetadata";
import NavigationHeader from "../../../components/NavigationHeader";
import useAsyncStorage from "../../../hooks/useAsyncStorage";
import { useDualis } from "../../../hooks/useDualis";
import { useHeaderConfig } from "../../../hooks/useHeaderConfig";

const DualisStack = createStackNavigator();

const SCREEN_TITLE = "Dualis";

const DualisNavigator = () => {
  const { storeDataInAsyncStorage } = useAsyncStorage();
  const [accessGranted, setAccessGranted] = useState<boolean>(false);
  const navigationHeaderConfig = useHeaderConfig();
  const { colors } = useMetadata();
  const { logout: logoutFromDualis } = useDualis();

  const handleLogout = () => {
    logoutFromDualis();
    storeDataInAsyncStorage("accessGranted", false);
    setAccessGranted(false);
  };

  if (!accessGranted)
    return (
      <DualisStack.Navigator screenOptions={navigationHeaderConfig}>
        <DualisStack.Screen
          name="LoginScreen"
          options={{
            headerTitle: () => <NavigationHeader title={SCREEN_TITLE} />,
            animationTypeForReplace: "pop",
          }}
        >
          {() => <LoginScreen setAccessGranted={setAccessGranted} />}
        </DualisStack.Screen>
      </DualisStack.Navigator>
    );

  return (
    <DualisStack.Navigator screenOptions={navigationHeaderConfig}>
      <DualisStack.Group>
        <DualisStack.Screen
          name="DualisHomeScreen"
          component={DualisScreen}
          options={{
            headerTitle: () => <NavigationHeader title={SCREEN_TITLE} />,
            headerBackTitleVisible: false,
            gestureEnabled: false,
            headerLeft: () => null,
            headerRight: () => <LogoutButton onClick={handleLogout} />,
          }}
        />
      </DualisStack.Group>
      <DualisStack.Group
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
        <DualisStack.Screen
          name="SubjectDetailsScreen"
          component={SubjectDetailsScreen}
        />
      </DualisStack.Group>
    </DualisStack.Navigator>
  );
};

export default DualisNavigator;
