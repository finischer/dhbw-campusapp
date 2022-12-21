import { View, Text } from "react-native";
import React from "react";
import { appInfoStyles } from "./appInfo.styles";
import RegularText from "../../../../components/RegularText";

const AppInfo = () => {
  return (
    <View style={appInfoStyles.container}>
      <RegularText style={appInfoStyles.text}>
        Made by Niklas Fischer
      </RegularText>
      <RegularText style={appInfoStyles.text}>Version 1.0.0</RegularText>
    </View>
  );
};

export default AppInfo;
