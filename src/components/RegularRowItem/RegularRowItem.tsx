import React from "react";
import { StyleSheet, View } from "react-native";
import typography from "../../constants/typography";
import { useMetadata } from "../../hooks/useMetadata";
import Icon from "../Icon";
import RegularText from "../RegularText";
import TouchableOpacity from "../TouchableOpacity";
import { regularRowItemStyles } from "./regularRowItem.styles";
import { IconNames, IRegularRowItemProps } from "./regularRowItem.types";
import { SPACING } from "../../constants/layout";

const DEFAULT_ROW_GAP = SPACING.m

const RegularRowItem = ({
  children,
  leftIconSource = undefined,
  rightIconSource = undefined,
  leftIcon = undefined,
  rightIcon = undefined,
  selected = false,
  onClick = undefined,
  disabled = false,
  marginTop = DEFAULT_ROW_GAP,
  marginBottom = 0,
  subtitle = undefined
}: IRegularRowItemProps) => {
  const { colors } = useMetadata();
  const activeOpacity = onClick ? 0.7 : 1

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
    <TouchableOpacity activeOpacity={activeOpacity} disabled={disabled} onPress={onClick}>
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

          <View style={{
            flex: 0.94
          }}>

            <RegularText
              style={[regularRowItemStyles.text, localRegularRowItemStyles.text]}
              numberOfLines={subtitle ? 1 : 2}
            >
              {children}
            </RegularText>
            {subtitle &&
              <RegularText size={typography.small} style={{ color: colors.secondaryDarker }}>
                {subtitle}
              </RegularText>
            }
          </View>
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
