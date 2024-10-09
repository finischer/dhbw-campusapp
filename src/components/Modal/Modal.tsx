import { View, StatusBar, SafeAreaView, useColorScheme } from "react-native";
import React, { useEffect, useState, useImperativeHandle } from "react";
import { IModalFunctions, IModalProps } from "./modal.types";
import { modalStyles } from "./modal.styles";
import RegularText from "../RegularText";
import GlobalBody from "../GlobalBody";
import CloseButton from "../CloseButton";
import { useIsFocused } from "@react-navigation/native";
import { useMetadata } from "../../hooks/useMetadata";
import Animated, { FadeInDown, FadeInUp, FadeOutDown, FadeOutUp, Layout } from "react-native-reanimated";
import { SPACING } from "../../constants/layout";
import { FeatherIconName } from "../../services/expo-vector-icons/expo-vector-icons.types";

const THRESHOLD_SHOW_CLOSE_BUTTON_MILLIESCONDS = 600;

const Modal = React.forwardRef<IModalFunctions, IModalProps>(
  ({ title, subTitle, closeButtonVariant = "close", children, withCloseButton = true }, ref) => {
    const { theme } = useMetadata();
    const deviceColorScheme = useColorScheme();
    const [statusBarStyle, setStatusBarStyle] = useState<"light-content" | "dark-content">("light-content");
    const isFocused = useIsFocused();

    const [showCloseButton, setShowCloseButton] = useState(withCloseButton);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(undefined);

    const closeBtnIconName: FeatherIconName = closeButtonVariant === "close" ? "x" : "check";

    useEffect(() => {
      if (isFocused && theme === "light") {
        setTimeout(() => {
          setStatusBarStyle("dark-content");
        }, 300);
      } else if (theme === "dark") {
        setStatusBarStyle("light-content");
      } else {
        // otherwise theme is system
        if (deviceColorScheme === "dark") {
          setStatusBarStyle("light-content");
        } else {
          setTimeout(() => {
            setStatusBarStyle("dark-content");
          }, 300);
        }
      }
    }, [isFocused, theme]);

    // add local functions, so that you can use these functions in other components
    useImperativeHandle(ref, () => ({
      appearCloseButton: () => {
        appearCloseButton();
      },
      disappearCloseButton: () => {
        disappearCloseButton();
      },
    }));

    const appearCloseButton = () => {
      const timeoutId = setTimeout(() => {
        setShowCloseButton(true);
      }, THRESHOLD_SHOW_CLOSE_BUTTON_MILLIESCONDS);

      setTimeoutId(timeoutId);
    };

    const disappearCloseButton = () => {
      clearTimeout(timeoutId);
      setTimeoutId(undefined);
      setShowCloseButton(false);
    };

    return (
      <>
        {isFocused && <StatusBar barStyle={statusBarStyle} />}
        <GlobalBody style={modalStyles.wrapperContainer}>
          <SafeAreaView style={{ flex: 1, paddingVertical: SPACING.xl }}>
            <View style={{ flex: 1 }}>
              {/* Header View */}
              <View style={modalStyles.headerContainer}>
                <RegularText style={modalStyles.titleText}>{title}</RegularText>
                {subTitle && (
                  <Animated.View
                    entering={FadeInUp}
                    exiting={FadeOutUp}
                  >
                    <RegularText style={modalStyles.subTitleText}>{subTitle}</RegularText>
                  </Animated.View>
                )}
              </View>

              {/* Content View */}
              <Animated.View
                style={modalStyles.bodyContainer}
                layout={Layout}
              >
                {children}
              </Animated.View>

              {/* Close Button */}
              {showCloseButton && (
                <Animated.View
                  entering={FadeInDown}
                  exiting={FadeOutDown}
                  style={modalStyles.closeButtonContainer}
                >
                  <CloseButton iconName={closeBtnIconName} />
                </Animated.View>
              )}
            </View>
          </SafeAreaView>
        </GlobalBody>
      </>
    );
  }
);

Modal.displayName = "ModalComponent";

export default Modal;
