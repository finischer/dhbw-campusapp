import { View, TextInput } from "react-native";
import React, { useState } from "react";
import { IInputProps } from "./input.types";
import { inputStyles } from "./input.styles";
import RegularText from "../RegularText";
import useMetadata from "../../hooks/useMetadata";

const Input: React.FC<IInputProps> = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { colors } = useMetadata();
  const borderColor = colors.secondary;
  const textColor = colors.secondary;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View>
      <RegularText>{label}</RegularText>
      <TextInput
        {...props}
        style={[inputStyles.inputView, { borderColor, color: textColor }]}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

export default Input;
