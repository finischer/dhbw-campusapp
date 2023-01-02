import { View, StyleSheet } from "react-native";
import React from "react";
import { IconNames, IRegularRowItemProps } from "./regularRowItem.types";
import RegularText from "../RegularText";
import { regularRowItemStyles } from "./regularRowItem.styles";
import { useMetadata } from "../../hooks/useMetadata";
import TouchableOpacity from "../TouchableOpacity";
import Icon from "../Icon";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { darkModeColors, lightModeColors } from "../../constants/colors";

const ROW_ITEM_GAP = 10;

const RegularRowItem = ({
  children,
  leftIconSource = undefined,
  rightIconSource = undefined,
  leftIcon = undefined,
  rightIcon = undefined,
  selected = false,
  onClick = undefined,
  disabled = false,
  marginTop = ROW_ITEM_GAP,
  marginBottom = 0,
}: IRegularRowItemProps) => {
  const { colors, theme } = useMetadata();

  const textAndIconColor = selected ? colors.lightText : colors.secondary;
  const selectedRightIconSource = selected ? "feather" : rightIconSource;
  const selectedRightIconName: IconNames | undefined = selected
    ? "check"
    : rightIcon;

  const localRegularRowItemStyles = StyleSheet.create({
    container: {
      // backgroundColor: selected ? colors.accent : colors.primaryDarker,
      marginTop,
      marginBottom,
    },
    text: {
      // color: textAndIconColor,
    },
  });

  const progess = useDerivedValue(() => {
    return withTiming(theme === "dark" ? 1 : 0);
  });

  const rStyles = useAnimatedStyle(() => {
    const color = interpolateColor(
      progess.value,
      [0, 1],
      [lightModeColors.secondary, darkModeColors.secondary]
    );

    const backgroundColor = interpolateColor(
      progess.value,
      [0, 1],
      [lightModeColors.primaryDarker, darkModeColors.primaryDarker]
    );

    return {
      color: selected ? colors.lightText : color,
      backgroundColor: selected ? colors.accent : backgroundColor,
    };
  });

  return (
    <TouchableOpacity disabled={disabled} onPress={onClick}>
      <Animated.View
        style={[
          regularRowItemStyles.container,
          localRegularRowItemStyles.container,
          rStyles,
        ]}
      >
        <View style={regularRowItemStyles.leftContainer}>
          {leftIconSource && leftIcon && (
            <View style={regularRowItemStyles.leftIconContainer}>
              <Icon
                source={leftIconSource}
                name={leftIcon}
                size={20}
                color={textAndIconColor}
              />
            </View>
          )}
          <RegularText
            style={[regularRowItemStyles.text, localRegularRowItemStyles.text]}
          >
            {children}
          </RegularText>
        </View>
        {selectedRightIconSource && selectedRightIconName && (
          <View style={regularRowItemStyles.rightIconContainer}>
            <Icon
              source={selectedRightIconSource}
              name={selectedRightIconName}
              size={20}
              color={textAndIconColor}
            />
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default RegularRowItem;
