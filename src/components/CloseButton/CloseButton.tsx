import { View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import TouchableOpacity from "../TouchableOpacity";
import { useMetadata } from "../../hooks/useMetadata";
import { closeButtonStyles } from "./closeButton.styles";
import { ICloseButtonProps } from "./closeButton.types";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../infrastructure/navigation/Navigation/navigation.types";
import { StackNavigationProp } from "@react-navigation/stack";

const CloseButton: React.FC<ICloseButtonProps> = ({
  onClick = () => null,
  iconName = "x",
  handleCloseManually = false,
}) => {
  const { colors } = useMetadata();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleCloseClick = () => {
    onClick();
    if (handleCloseManually) return;
    navigation.pop();
  };

  return (
    <TouchableOpacity onPress={handleCloseClick}>
      <View style={[closeButtonStyles.container, { backgroundColor: colors.accent }]}>
        <Feather
          name={iconName}
          color={colors.lightText}
          size={28}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CloseButton;
