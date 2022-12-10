import React from "react";
import { Feather } from "@expo/vector-icons";
import { IFeatherIconProps } from "./featherIcon.types";
import TouchableOpacity from "../TouchableOpacity";
import useMetadata from "../../hooks/useMetadata";

const FeatherIcon = ({
  name,
  size = 24,
  color = undefined,
  activeOpacity = undefined,
  onClick = undefined,
}: IFeatherIconProps) => {
  const { colors } = useMetadata();

  const iconColor = color || colors.secondary;

  return (
    <TouchableOpacity onPress={onClick}>
      <Feather name={name} size={size} color={iconColor} />
    </TouchableOpacity>
  );
};

export default FeatherIcon;
