import { View, Animated as RNAnimated, LayoutAnimation } from "react-native";
import React, { useRef, useState } from "react";
import { ALLERGENES, LABELS, OTHERS } from "./labels";
import RegularText from "../../../../components/RegularText";
import { ILabelTypes } from "./additivesList.types";
import { additivesListStyles } from "./additivesList.styles";
import { useTranslation } from "react-i18next";
import GlobalBody from "../../../../components/GlobalBody";
import TouchableOpacity from "../../../../components/TouchableOpacity";
import { toggleAnimation } from "../../../../constants/animations";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import Icon from "../../../../components/Icon";

const AdditivesList = () => {
  const { t } = useTranslation("restaurantScreen");
  const [isOpen, setIsOpen] = useState(false);
  const animationRef = useRef(new RNAnimated.Value(0)).current;

  const Item = ({ label, sub }: ILabelTypes) => (
    <View style={additivesListStyles.itemContainer}>
      <RegularText style={additivesListStyles.subText}>{sub}</RegularText>
      <RegularText style={additivesListStyles.labelText}>{label}</RegularText>
    </View>
  );

  const toggleOpen = () => {
    const animationConfig = {
      duration: 300,
      toValue: isOpen ? 0 : 1,
      useNativeDriver: true,
    };

    RNAnimated.timing(animationRef, animationConfig).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setIsOpen((oldState) => !oldState);
  };

  const chevronTransform = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <GlobalBody>
      <TouchableOpacity onPress={toggleOpen}>
        <View style={additivesListStyles.togglerContainer}>
          <RegularText>{t("additivesSubjectToLabeling")}</RegularText>
          <RNAnimated.View
            style={{ transform: [{ rotateZ: chevronTransform }] }}
          >
            <Icon source="feather" name="chevron-down" clickable={false} />
          </RNAnimated.View>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          style={[additivesListStyles.container]}
        >
          {/* Labels */}
          <RegularText>{t("attributes").toUpperCase()}:</RegularText>
          {LABELS.map(({ label, sub }: ILabelTypes, index: number) => (
            <Item key={index} label={label} sub={sub} />
          ))}

          {/* Allergens */}
          <RegularText>{t("allergens").toUpperCase()}:</RegularText>
          {ALLERGENES.map(({ label, sub }: ILabelTypes, index: number) => (
            <Item key={index} label={label} sub={sub} />
          ))}

          {/* Other */}
          <RegularText>{t("others").toUpperCase()}:</RegularText>
          {OTHERS.map(({ label, sub }: ILabelTypes, index: number) => (
            <Item key={index} label={label} sub={sub} />
          ))}
        </Animated.View>
      )}
    </GlobalBody>
  );
};

export default AdditivesList;
