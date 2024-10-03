import React, { useImperativeHandle, useState } from "react";
import { StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";
import { useMetadata } from "../../hooks/useMetadata";
import { alertStyles } from "./alert.styles";
import { IAlertFunctions, IAlertProps } from "./alert.types";

const Alert = React.forwardRef<IAlertFunctions, IAlertProps>(({ title, description, buttons = [] }, ref) => {
  const [visible, setVisible] = useState(false);

  const { colors } = useMetadata();

  useImperativeHandle(ref, () => ({
    openAlert: () => {
      openAlert();
    },
    closeAlert: () => {
      closeAlert();
    },
  }));

  const localAlertStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
    },
    text: {
      color: colors.secondary,
    },
  });

  const buttonElements = buttons.map((b, index) => (
    <Dialog.Button
      key={index}
      {...b}
      label={b.label}
      onPress={b.onPress}
    />
  ));

  const closeAlert = () => {
    setVisible(false);
  };

  const openAlert = () => {
    setVisible(true);
  };

  return (
    <Dialog.Container
      blurStyle={{ backgroundColor: "green" }}
      onBackdropPress={closeAlert}
      visible={visible}
      contentStyle={[alertStyles.container, localAlertStyles.container]}
      blurComponentIOS={<View />} // prevents weird bug, where backgroundColor is not registered on iOS
    >
      <Dialog.Title style={localAlertStyles.text}>{title}</Dialog.Title>
      <Dialog.Description style={localAlertStyles.text}>{description}</Dialog.Description>
      {buttonElements}
    </Dialog.Container>
  );
});

Alert.displayName = "AlertComponent";

export default Alert;
