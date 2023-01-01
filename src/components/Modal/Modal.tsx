import {
  View,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState, useImperativeHandle } from "react";
import { IModalFunctions, IModalProps } from "./modal.types";
import { modalStyles } from "./modal.styles";
import RegularText from "../RegularText";
import GlobalBody from "../GlobalBody";
import CloseButton from "../CloseButton";
import { useIsFocused } from "@react-navigation/native";
import { useMetadata } from "../../hooks/useMetadata";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import Searchbar from "../Searchbar";

const THRESHOLD_SHOW_CLOSE_BUTTON_MILLIESCONDS = 600;

const Modal = React.forwardRef<IModalFunctions, IModalProps>(
  ({ title, subTitle, children, withCloseButton = true }, ref) => {
    const { theme } = useMetadata();
    const [statusBarStyle, setStatusBarStyle] = useState<
      "light-content" | "dark-content"
    >("light-content");
    const isFocused = useIsFocused();

    const [showCloseButton, setShowCloseButton] = useState(withCloseButton);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
      undefined
    );

    useEffect(() => {
      if (isFocused && theme === "light") {
        setTimeout(() => {
          setStatusBarStyle("dark-content");
        }, 300);
      } else if (theme === "dark") {
        setTimeout(() => {
          setStatusBarStyle("light-content");
        });
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
          <SafeAreaView style={{ flex: 1 }}>
            {/* Header View */}
            <View style={modalStyles.headerContainer}>
              <RegularText style={modalStyles.titleText}>{title}</RegularText>
              <RegularText style={modalStyles.subTitleText}>
                {subTitle}
              </RegularText>
            </View>

            {/* Content View */}
            <View style={modalStyles.bodyContainer}>{children}</View>

            {/* Close Button */}
            {showCloseButton && (
              <Animated.View
                entering={FadeInDown}
                exiting={FadeOutDown}
                style={modalStyles.closeButtonContainer}
              >
                <CloseButton />
              </Animated.View>
            )}
          </SafeAreaView>
        </GlobalBody>
      </>
    );
  }
);

export default Modal;
