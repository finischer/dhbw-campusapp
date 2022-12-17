import { View } from "react-native";
import React from "react";
import { INavigationHeaderProps } from "./NavigationHeader.types";
import RegularText from "../RegularText";
import typography from "../../constants/typography";

const NavigationHeader = ({ title, subTitle = "" }: INavigationHeaderProps) => {
  return (
    <View style={{ alignItems: "center" }}>
      <RegularText variant="light" weight="bold">
        {title}
      </RegularText>
      {subTitle && (
        <RegularText variant="light" style={{ fontSize: typography.small }}>
          {subTitle}
        </RegularText>
      )}
    </View>
  );
};

export default NavigationHeader;
