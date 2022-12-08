import { View, Text } from "react-native";
import React from "react";
import { ILoaderProps } from "./loader.types";

const Loader = ({ text, size = "medium" }: ILoaderProps) => {
  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
};

export default Loader;
