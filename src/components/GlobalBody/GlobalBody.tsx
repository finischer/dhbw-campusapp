import { View, Text } from "react-native";
import React from "react";
import { GlobalBodyTypes } from "./globalBody.types";
import { globalBodyStyles } from "./globalBody.styles";
import useMetadata from "../../hooks/useMetadata";

const GlobalBody: React.FC<GlobalBodyTypes> = ({ children }) => {
  const { colors } = useMetadata();

  return (
    <View style={[globalBodyStyles, { backgroundColor: colors.primary }]}>
      {children}
    </View>
  );
};

export default GlobalBody;
