import React from "react";
import { TouchableOpacity as TsOpacity } from "react-native";
import { ITouchableOpacityProps } from "./touchableOpacity.types";

const ACTIVE_OPACITY = 0.7;
const DISABLED_OPACITY = 0.3;

const TouchableOpacity = ({
  children,
  disabled = false,
  activeOpacity = ACTIVE_OPACITY,
  ...props
}: ITouchableOpacityProps) => {
  return (
    <TsOpacity
      activeOpacity={activeOpacity}
      disabled={disabled}
      style={{
        opacity: disabled ? DISABLED_OPACITY : 1,
      }}
      {...props}
    >
      {children}
    </TsOpacity>
  );
};

export default TouchableOpacity;
