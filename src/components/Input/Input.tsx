import { View, TextInput } from "react-native";
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

const Input: React.FC<IInputProps> = ({
  label,
  value,
  rightIcon,
  ...props
}) => {
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
  const localInputStyles = useAnimatedStyle(() => {
    const opacity = interpolate(progess.value, [0, 1], [0.4, 1]);
    const top = interpolate(progess.value, [0, 1], [18, 0]);
    return {
      opacity,
      top,
    };
  });

  return (
    <View style={inputStyles.inputContainer}>
      <Animated.Text style={localInputStyles}>
        <RegularText>{label}</RegularText>
      </Animated.Text>
      <TextInput
        {...props}
        style={[inputStyles.inputField, { borderColor, color: textColor }]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
      />
      <View style={inputStyles.rightIconContainer}>{rightIcon}</View>
    </View>
  );
};

export default Input;
