import React from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import useMetadata from "../../hooks/useMetadata";
import { ILogoutButtonProps } from "./logoutButton.types";
import TouchableOpacity from "../TouchableOpacity";

const LogoutButton = ({ onClick }: ILogoutButtonProps) => {
  const { colors } = useMetadata();

  return (
    <View style={{ marginRight: 10 }}>
      <TouchableOpacity onPress={onClick}>
        <Feather name="log-out" size={27} color={colors.lightText} />
      </TouchableOpacity>
    </View>
  );
};

export default LogoutButton;
