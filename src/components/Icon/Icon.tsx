import React from "react";
import { Feather, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import TouchableOpacity from "../TouchableOpacity";
import { useMetadata } from "../../hooks/useMetadata";
import { IIconProps } from "./icon.types";
import { StyleSheet, View } from "react-native";

const Icon = ({
  name,
  source,
  size = 24,
  color = undefined,
  activeOpacity = 0.7,
  onClick = undefined,
  clickable = true,
  style = StyleSheet.create({}),
}: IIconProps) => {
  const { colors } = useMetadata();

  const iconColor = color || colors.secondary;

  const getIcon = () => {
    switch (source) {
      case "fa5":
        return (
          <FontAwesome5
            name={name}
            size={size}
            color={iconColor}
          />
        );
      case "fa":
        return (
          <FontAwesome
            name={name}
            size={size}
            color={iconColor}
          />
        );
      case "feather":
        return (
          <Feather
            name={name}
            size={size}
            color={iconColor}
          />
        );
      case "ionicons":
        return (
          <Ionicons
            name={name}
            size={size}
            color={iconColor}
          />
        );
      case "mci":
        return (
          <MaterialCommunityIcons
            name={name}
            size={size}
            color={iconColor}
          />
        );
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={!clickable ? 1 : activeOpacity}
      onPress={onClick}
    >
      <View style={style}>{getIcon()}</View>
    </TouchableOpacity>
  );
};

export default Icon;
