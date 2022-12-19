import { View, Animated, LayoutAnimation } from "react-native";
import React, { useRef, useState } from "react";
import { ALLERGENES, LABELS, OTHERS } from "./labels";
import RegularText from "../../../../components/RegularText";
import { ILabelTypes } from "./additivesList.types";
import { additivesListStyles } from "./additivesList.styles";
import { useTranslation } from "react-i18next";
import FeatherIcon from "../../../../components/FeatherIcon";
import GlobalBody from "../../../../components/GlobalBody";
import TouchableOpacity from "../../../../components/TouchableOpacity";
import { toggleAnimation } from "../../../../constants/animations";
import { Feather } from "@expo/vector-icons";

const AdditivesList = () => {
  const { t } = useTranslation("restaurantScreen");
  const [isOpen, setIsOpen] = useState(false);
  const animationRef = useRef(new Animated.Value(0)).current;

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

    Animated.timing(animationRef, animationConfig).start();
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
          <Animated.View style={{ transform: [{ rotateZ: chevronTransform }] }}>
            <FeatherIcon name="chevron-down" clickable={false} />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <Animated.View style={[additivesListStyles.container]}>
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
