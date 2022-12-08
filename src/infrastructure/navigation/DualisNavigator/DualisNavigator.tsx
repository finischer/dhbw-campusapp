import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { headerConfig } from "../Navigation/config";
import LoginScreen from "../../../screens/LoginScreen";
import DualisScreen from "../../../screens/DualisScreen";
import LogoutButton from "../../../components/LogoutButton";

const DualisStack = createStackNavigator();

const DualisNavigator = () => {
  const [accessGranted, setAccessGranted] = useState<boolean>(false);
  const navigationHeaderConfig = headerConfig();

  const handleLogout = () => {
    setAccessGranted(false);
  };

  if (!accessGranted)
    return <LoginScreen setAccessGranted={setAccessGranted} />;

  return (
    <DualisStack.Navigator screenOptions={navigationHeaderConfig}>
      <DualisStack.Screen
        name="DualisHomeScreen"
        options={{
          headerTitle: "Dualis",
          headerBackTitleVisible: false,
          gestureEnabled: false,
          headerLeft: () => null,
          headerRight: () => <LogoutButton onClick={handleLogout} />,
        }}
      >
        {() => <DualisScreen setAccessGranted={setAccessGranted} />}
      </DualisStack.Screen>
    </DualisStack.Navigator>
  );
};

export default DualisNavigator;
