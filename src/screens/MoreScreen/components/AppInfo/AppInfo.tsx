import React from "react";
import { View } from "react-native";
import RegularText from "../../../../components/RegularText";
import { appInfoStyles } from "./appInfo.styles";
import { expo } from '../../../../../app.json';


const AppInfo = () => {
  return (
    <View style={appInfoStyles.container}>
      <RegularText style={appInfoStyles.text}>
        Made by Niklas Fischer
      </RegularText>
      <RegularText style={appInfoStyles.text}>Version {expo.version}</RegularText>
    </View>
  );
};

export default AppInfo;
