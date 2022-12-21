import React from "react";
import { Feather } from "@expo/vector-icons";
import { IFeatherIconProps } from "./featherIcon.types";
import TouchableOpacity from "../TouchableOpacity";
import { useMetadata } from "../../hooks/useMetadata";

// TODO: Use also other icon sources because all neccessary Icons are not included in Feather Library.
// For example animal icons are not included in this library

const FeatherIcon = ({
  name,
  size = 24,
  color = undefined,
  activeOpacity = undefined,
  onClick = undefined,
  clickable = true,
}: IFeatherIconProps) => {
  const { colors } = useMetadata();

  const iconColor = color || colors.secondary;

  if (!clickable) {
    return <Feather name={name} size={size} color={iconColor} />;
  }

  return (
    <TouchableOpacity onPress={onClick}>
      <Feather name={name} size={size} color={iconColor} />
    </TouchableOpacity>
  );
};

export default FeatherIcon;
