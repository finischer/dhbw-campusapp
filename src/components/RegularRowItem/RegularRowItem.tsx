import { View, StyleSheet } from "react-native";
import React from "react";
import { IRegularRowItemProps } from "./regularRowItem.types";
import RegularText from "../RegularText";
import { regularRowItemStyles } from "./regularRowItem.styles";
import { useMetadata } from "../../hooks/useMetadata";
import FeatherIcon from "../FeatherIcon";
import TouchableOpacity from "../TouchableOpacity";
import { IColors } from "../../constants/colors/colors.types";

const ROW_ITEM_GAP = 10;

const RegularRowItem = ({
  children,
  leftIcon = undefined,
  rightIcon = undefined,
  selected = false,
  onClick = undefined,
  disabled = false,
  marginTop = ROW_ITEM_GAP,
  marginBottom = 0,
}: IRegularRowItemProps) => {
  const { colors } = useMetadata();

  const textAndIconColor = selected ? colors.lightText : colors.secondary;

  const localRegularRowItemStyles = StyleSheet.create({
    container: {
      backgroundColor: selected ? colors.accent : colors.primaryDarker,
      marginTop,
      marginBottom,
    },
    text: {
      color: textAndIconColor,
    },
  });

  return (
    <TouchableOpacity disabled={disabled} onPress={onClick}>
      <View
        style={[
          regularRowItemStyles.container,
          localRegularRowItemStyles.container,
        ]}
      >
        <View style={regularRowItemStyles.leftContainer}>
          {leftIcon && (
            <View style={regularRowItemStyles.leftIconContainer}>
              <FeatherIcon name={leftIcon} size={20} color={textAndIconColor} />
            </View>
          )}
          <RegularText
            style={[regularRowItemStyles.text, localRegularRowItemStyles.text]}
          >
            {children}
          </RegularText>
        </View>
        {rightIcon && (
          <View style={regularRowItemStyles.rightIconContainer}>
            <FeatherIcon name={rightIcon} size={20} color={textAndIconColor} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RegularRowItem;
