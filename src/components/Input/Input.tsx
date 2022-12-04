import { View, TextInput } from "react-native";
import React, { useState } from "react";
import { IInputProps } from "./input.types";
import { inputStyles } from "./input.styles";
import RegularText from "../RegularText";

const Input: React.FC<IInputProps> = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View>
      <RegularText>{label}</RegularText>
      <TextInput
        {...props}
        style={inputStyles.inputView}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

export default Input;
