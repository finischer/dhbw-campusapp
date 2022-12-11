import { View, Text } from "react-native";
import React from "react";
import { useMetadata } from "../../../../hooks/useMetadata";

const ItemSeparator = () => {
  const { colors } = useMetadata();
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary,
        opacity: 0.3,
      }}
    />
  );
};

export default ItemSeparator;
