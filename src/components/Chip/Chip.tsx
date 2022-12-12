import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { IChipProps } from "./chip.types";
import RegularText from "../RegularText";
import { chipStyles } from "./chip.styles";
import { useMetadata } from "../../hooks/useMetadata";
import FeatherIcon from "../FeatherIcon";
import { IFeatherIconProps } from "../FeatherIcon/featherIcon.types";
import { FeatherIconName } from "../../services/expo-vector-icons/expo-vector-icons.types";
import { Feather } from "@expo/vector-icons";

const Chip = ({
  label,
  onClick,
  disabled = false,
  selected = false,
}: IChipProps) => {
  const { colors } = useMetadata();

  const iconName: FeatherIconName = selected ? "check" : "x-circle";

  const localChipStyles = StyleSheet.create({
    container: {
      backgroundColor: selected ? colors.accent : colors.primaryDarker,
      opacity: disabled ? 0.2 : 1,
    },
    labelText: {
      color: selected ? colors.lightText : colors.secondary,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={[chipStyles.container, localChipStyles.container]}>
        <RegularText style={[chipStyles.labelText, localChipStyles.labelText]}>
          {label}
        </RegularText>
        {(selected || disabled) && (
          <View style={{ marginLeft: 5 }}>
            <Feather name={iconName} size={14} color={colors.lightText} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Chip;
