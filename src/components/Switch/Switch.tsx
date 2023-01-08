import { View, Text, Switch as RNSwitch } from "react-native";
import React from "react";
import { ISwitchProps } from "./switch.types";
import { useMetadata } from "../../hooks/useMetadata";

const Switch: React.FC<ISwitchProps> = ({ onChange, value, ...props }) => {
  const { colors } = useMetadata();

  return (
    <RNSwitch
      onChange={onChange}
      value={value}
      thumbColor={colors.lightText}
      trackColor={{
        false: colors.primaryDarker,
        true: colors.accent,
      }}
      {...props}
    />
  );
};

export default Switch;
