import { View, StyleSheet } from "react-native";
import React from "react";
import { IconNames, IRegularRowItemProps } from "./regularRowItem.types";
import RegularText from "../RegularText";
import { regularRowItemStyles } from "./regularRowItem.styles";
import { useMetadata } from "../../hooks/useMetadata";
import TouchableOpacity from "../TouchableOpacity";
import Icon from "../Icon";

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
  const { colors } = useMetadata();

  const textAndIconColor = selected ? colors.lightText : colors.secondary;
  const selectedRightIconSource = selected ? "feather" : rightIconSource;
  const selectedRightIconName: IconNames | undefined = selected
    ? "check"
    : rightIcon;

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

  const LocalLeftIconView = ({ children }: { children: React.ReactNode }) => (
    <View style={regularRowItemStyles.leftIconContainer}>{children}</View>
  );

  return (
    <TouchableOpacity disabled={disabled} onPress={onClick}>
      <View
        style={[
          regularRowItemStyles.container,
          localRegularRowItemStyles.container,
        ]}
      >
        <View style={regularRowItemStyles.leftContainer}>
          {typeof leftIcon === "function" && (
            <LocalLeftIconView>{leftIcon()}</LocalLeftIconView>
          )}
          {leftIconSource && leftIcon && (
            <LocalLeftIconView>
              <Icon
                source={leftIconSource}
                name={leftIcon}
                size={20}
                color={textAndIconColor}
              />
            </LocalLeftIconView>
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
      </View>
    </TouchableOpacity>
  );
};

export default RegularRowItem;
