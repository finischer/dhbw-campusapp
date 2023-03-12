import React from "react";
import { View } from "react-native";
import RegularText from "../../../../components/RegularText";
import { APP_VERSION } from "../../../../_app_config";
import { appInfoStyles } from "./appInfo.styles";

const AppInfo = () => {
  return (
    <View style={appInfoStyles.container}>
      <RegularText style={appInfoStyles.text}>
        Made by Niklas Fischer
      </RegularText>
      <RegularText style={appInfoStyles.text}>Version {APP_VERSION}</RegularText>
    </View>
  );
};

export default AppInfo;
