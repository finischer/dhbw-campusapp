import { View, ActivityIndicator } from "react-native";
import React from "react";
import { ILoaderProps } from "./loader.types";
import RegularText from "../RegularText";
import { useMetadata } from "../../hooks/useMetadata";
import { loaderStyles } from "./loader.styles";

// TODO: Add Loader and style it

const Loader = ({ text, size = "small" }: ILoaderProps) => {
  const { colors } = useMetadata();

  return (
    <View style={loaderStyles.container}>
      <ActivityIndicator size={size} color={colors.accent} />
      <RegularText style={{ marginTop: 10 }}>{text}</RegularText>
    </View>
  );
};

export default Loader;
