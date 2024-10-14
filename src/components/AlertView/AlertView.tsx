import React, { FC, ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import Icon from "../Icon";
import { useMetadata } from "../../hooks/useMetadata";
import RegularText from "../RegularText";
import { SIZES, SPACING } from "../../constants/layout";

interface InfoAlertProps {
  children: ReactNode;
}

const AlertView: FC<InfoAlertProps> = ({ children }) => {
  const { colors } = useMetadata();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      padding: SPACING.md,
      borderRadius: SIZES.borderRadius,
      backgroundColor: colors.infoDark,
    },
    icon: {
      marginRight: SPACING.md,
    },
    text: {
      flex: 1,
      fontSize: SIZES.sm,
      color: colors.infoMain,
    },
  });

  return (
    <View style={styles.container}>
      <Icon
        source="feather"
        name="info"
        size={24}
        style={styles.icon}
        color={colors.infoMain}
      />
      <RegularText
        weight="500"
        style={styles.text}
      >
        {children}
      </RegularText>
    </View>
  );
};

export default AlertView;
