import { View, StyleSheet } from "react-native";
import React from "react";

import RegularText from "../RegularText";
import { subsectionStyles } from "./subsection.styles";
import { SPACING } from "../../constants/layout";
import { ISubsectionProps } from "./subsection.types";

const Subsection: React.FC<ISubsectionProps> = ({ title = undefined, children, withMarginTop = true }) => {
  const localSubsectionStyles = StyleSheet.create({
    wrapperContainer: {
      marginTop: withMarginTop ? SPACING.m : 0,
    },
  });

  return (
    <View style={[subsectionStyles.wrapperContainer, localSubsectionStyles.wrapperContainer]}>
      {title && (
        <View style={subsectionStyles.titleContainer}>
          <RegularText underline>{title}</RegularText>
        </View>
      )}
      <View>{children}</View>
    </View>
  );
};

export default Subsection;
