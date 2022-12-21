import { View, StatusBar, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { IModalProps } from "./modal.types";
import { modalStyles } from "./modal.styles";
import RegularText from "../RegularText";
import GlobalBody from "../GlobalBody";
import CloseButton from "../CloseButton";
import { useIsFocused } from "@react-navigation/native";
import { useMetadata } from "../../hooks/useMetadata";

const Modal: React.FC<IModalProps> = ({ title, subTitle, children }) => {
  const { theme } = useMetadata();
  const [statusBarStyle, setStatusBarStyle] = useState<
    "light-content" | "dark-content"
  >("light-content");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && theme === "light") {
      setTimeout(() => {
        setStatusBarStyle("dark-content");
      }, 300);
    }
  }, [isFocused, theme]);

  return (
    <>
      {isFocused && <StatusBar barStyle={statusBarStyle} />}
      <GlobalBody style={modalStyles.wrapperContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Header View */}
          <View style={modalStyles.headerContainer}>
            <RegularText style={modalStyles.titleText}>{title}</RegularText>
            <RegularText style={modalStyles.subTitleText}>
              {subTitle}
            </RegularText>
          </View>

          {/* Exams View */}
          <View style={modalStyles.bodyContainer}>{children}</View>

          {/* Close Button */}
          <View style={modalStyles.closeButtonContainer}>
            <CloseButton />
          </View>
        </SafeAreaView>
      </GlobalBody>
    </>
  );
};

export default Modal;
