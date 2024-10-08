import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { IChipProps } from "./chip.types";
import RegularText from "../RegularText";
import { chipStyles } from "./chip.styles";
import { useMetadata } from "../../hooks/useMetadata";
import { FeatherIconName } from "../../services/expo-vector-icons/expo-vector-icons.types";
import Icon from "../Icon";

const Chip = ({
  label,
  onClick,
  disabled = false,
  selected = false,
}: IChipProps) => {
  const { colors } = useMetadata();

  const iconName: FeatherIconName = selected ? "check" : "x-circle";
  const iconColor = disabled ? colors.secondary : colors.lightText;

  const localChipStyles = StyleSheet.create({
    container: {
      backgroundColor: selected ? colors.accent : colors.primaryDarker,
      opacity: disabled ? 0.2 : 1,
    },
    labelText: {
      color: selected ? colors.lightText : colors.secondary,
    },
  });

  const handleClick = () => {
    if (disabled) return;
    onClick();
  };

  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={[chipStyles.container, localChipStyles.container]}>
        <RegularText style={[chipStyles.labelText, localChipStyles.labelText]}>
          {label}
        </RegularText>
        {(selected || disabled) && (
          <View style={{ marginLeft: 5 }}>
            <Icon
              source="feather"
              name={iconName}
              size={14}
              color={iconColor}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Chip;
