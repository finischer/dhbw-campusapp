import React from "react";
import { View } from "react-native";
import RegularText from "../../../../components/RegularText";
import { appInfoStyles } from "./appInfo.styles";
import { version as appVersion } from '../../../../../package.json';


const AppInfo = () => {
  return (
    <View style={appInfoStyles.container}>
      <RegularText style={appInfoStyles.text}>
        Made by Niklas Fischer
      </RegularText>
      <RegularText style={appInfoStyles.text}>Version {appVersion}</RegularText>
    </View>
  );
};

export default AppInfo;
