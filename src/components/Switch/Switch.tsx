import React from "react";
import { Switch as RNSwitch } from "react-native";
import { useMetadata } from "../../hooks/useMetadata";
import { ISwitchProps } from "./switch.types";

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
