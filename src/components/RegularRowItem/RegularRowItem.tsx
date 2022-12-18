import { View, StyleSheet } from "react-native";
import React from "react";
import { IRegularRowItemProps } from "./regularRowItem.types";
import RegularText from "../RegularText";
import { regularRowItemStyles } from "./regularRowItem.styles";
import { useMetadata } from "../../hooks/useMetadata";
import FeatherIcon from "../FeatherIcon";
import TouchableOpacity from "../TouchableOpacity";

const RegularRowItem = ({
  children,
  leftIcon = undefined,
  rightIcon = undefined,
  selected = false,
  disabled = false,
  marginTop = 0,
  marginBottom = 0,
}: IRegularRowItemProps) => {
  const { colors } = useMetadata();

  const localRegularRowItemStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.primaryDarker,
      marginTop,
      marginBottom,
    },
  });

  return (
    <TouchableOpacity disabled={disabled}>
      <View
        style={[
          regularRowItemStyles.container,
          localRegularRowItemStyles.container,
        ]}
      >
        <View style={regularRowItemStyles.leftContainer}>
          {leftIcon && (
            <View style={regularRowItemStyles.leftIconContainer}>
              <FeatherIcon name={leftIcon} size={20} />
            </View>
          )}
          <RegularText style={regularRowItemStyles.text}>
            {children}
          </RegularText>
        </View>
        {rightIcon && (
          <View style={regularRowItemStyles.rightIconContainer}>
            <FeatherIcon name={rightIcon} size={20} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RegularRowItem;
