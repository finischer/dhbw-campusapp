import { TouchableOpacity as TsOpacity } from "react-native";
import React from "react";
import { ITouchableOpacityProps } from "./touchableOpacity.types";

const ACTIVE_OPACITY = 0.7;

const TouchableOpacity = ({ children, ...props }: ITouchableOpacityProps) => {
  return (
    <TsOpacity activeOpacity={ACTIVE_OPACITY} {...props}>
      {children}
    </TsOpacity>
  );
};

export default TouchableOpacity;
