import { TouchableOpacity as TsOpacity } from "react-native";
import React from "react";
import { ITouchableOpacityProps } from "./touchableOpacity.types";

const ACTIVE_OPACITY = 0.7;
const DISABLED_OPACITY = 0.3;

const TouchableOpacity = ({
  children,
  disabled = false,
  ...props
}: ITouchableOpacityProps) => {
  return (
    <TsOpacity
      activeOpacity={ACTIVE_OPACITY}
      disabled={disabled}
      {...props}
      style={{
        opacity: disabled ? DISABLED_OPACITY : 1,
      }}
    >
      {children}
    </TsOpacity>
  );
};

export default TouchableOpacity;
