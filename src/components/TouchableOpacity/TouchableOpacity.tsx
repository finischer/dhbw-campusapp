import { TouchableOpacity as TsOpacity } from "react-native";
import React from "react";
import { ITouchableOpacityProps } from "./touchableOpacity.types";

const ACTIVE_OPACITY = 0.7;

const TouchableOpacity = ({ children, ...props }: ITouchableOpacityProps) => {
  return (
    <TsOpacity {...props} activeOpacity={ACTIVE_OPACITY}>
      {children}
    </TsOpacity>
  );
};

export default TouchableOpacity;
