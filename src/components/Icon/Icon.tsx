import React from "react";
import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import TouchableOpacity from "../TouchableOpacity";
import { useMetadata } from "../../hooks/useMetadata";
import { IconSources, IIconProps } from "./icon.types";

const Icon = ({
  name,
  source,
  size = 24,
  color = undefined,
  activeOpacity = undefined,
  onClick = undefined,
  clickable = true,
}: IIconProps) => {
  const { colors } = useMetadata();

  const iconColor = color || colors.secondary;

  const getIcon = () => {
    switch (source) {
      case "fa5":
        return <FontAwesome5 name={name} size={size} color={iconColor} />;
      case "fa":
        return <FontAwesome name={name} size={size} color={iconColor} />;
      case "feather":
        return <Feather name={name} size={size} color={iconColor} />;
    }
  };

  if (!clickable) {
    getIcon();
  }

  return <TouchableOpacity onPress={onClick}>{getIcon()}</TouchableOpacity>;
};

export default Icon;
