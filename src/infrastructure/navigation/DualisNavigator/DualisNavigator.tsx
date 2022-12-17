import React, { useState } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { headerConfig } from "../Navigation/config";
import LoginScreen from "../../../screens/LoginScreen";
import DualisScreen from "../../../screens/DualisScreen";
import LogoutButton from "../../../components/LogoutButton";
import SubjectDetailsScreen from "../../../screens/SubjectDetailsScreen";
import { useMetadata } from "../../../hooks/useMetadata";
import NavigationHeader from "../../../components/NavigationHeader";

const DualisStack = createStackNavigator();

const SCREEN_TITLE = "Dualis";

const DualisNavigator = ({ route, navigation }: any) => {
  const [accessGranted, setAccessGranted] = useState<boolean>(false);
  const navigationHeaderConfig = headerConfig();
  const { colors } = useMetadata();

  const handleLogout = () => {
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
    <DualisStack.Navigator
      screenOptions={navigationHeaderConfig}
      defaultScreenOptions={{
        freezeOnBlur: false,
      }}
    >
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
          ...TransitionPresets.ModalPresentationIOS,
          // cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerShown: false,
          gestureEnabled: true,
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
