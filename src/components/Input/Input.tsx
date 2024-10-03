import { View, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { IInputProps } from "./input.types";
import { inputStyles } from "./input.styles";
import RegularText from "../RegularText";
import { useMetadata } from "../../hooks/useMetadata";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

const Input = React.forwardRef<any, IInputProps>(
  (
    {
      label,
      value,
      rightIcon = undefined,
      leftIcon = undefined,
      noBorder = false,
      floatingLabel = true,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const { colors } = useMetadata();
    const borderColor = colors.secondary;
    const textColor = colors.secondary;

    const handleFocus = () => {
      setIsFocused(true);
    };
    const handleBlur = () => {
      setIsFocused(false);
    };

    const progess = useDerivedValue(() => {
      return withTiming(isFocused || value !== "" ? 1 : 0, { duration: 200 });
    });

    // Animated Styles
    const localAnimatedInputStyles = useAnimatedStyle(() => {
      const opacity = interpolate(progess.value, [0, 1], [0.4, 1]);
      const top = interpolate(progess.value, [0, 1], [18, 0]);

      return {
        opacity,
        top,
      };
    });

    const localInputStyles = StyleSheet.create({
      inputField: {
        borderBottomWidth: noBorder ? 0 : 1,
        borderColor,
        color: textColor,
      },
    });

    const FloatingLabel = () => (
      <Animated.Text style={localAnimatedInputStyles}>
        <RegularText>{label}</RegularText>
      </Animated.Text>
    );

    return (
      <View style={[inputStyles.inputContainer]}>
        {floatingLabel && <FloatingLabel />}
        {leftIcon && <View style={inputStyles.leftIconContainer}>{leftIcon}</View>}
        <TextInput
          {...props}
          ref={ref}
          style={[inputStyles.inputField, localInputStyles.inputField]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          placeholder={!floatingLabel ? label : ""}
          placeholderTextColor={colors.secondaryDarker}
          selectionColor={colors.accent}
        />
        {rightIcon && <View style={inputStyles.rightIconContainer}>{rightIcon}</View>}
      </View>
    );
  }
);

Input.displayName = "InputComponent";

export default Input;
