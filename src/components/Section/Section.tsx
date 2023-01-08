import { View, Text } from "react-native";
import React from "react";
import { ISectionProps } from "./section.types";
import RegularText from "../RegularText";
import typography from "../../constants/typography";
import { sectionStyles } from "./section.styles";

const Section: React.FC<ISectionProps> = ({ title = undefined, children }) => {
  return (
    <View style={sectionStyles.wrapperContainer}>
      {title && (
        <View style={sectionStyles.titleContainer}>
          <RegularText weight="bold" size={typography.body}>
            {title}
          </RegularText>
        </View>
      )}
      <View>{children}</View>
    </View>
  );
};

export default Section;
