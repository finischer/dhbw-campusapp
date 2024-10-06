import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated as RNAnimated, LayoutAnimation, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import GlobalBody from "../../../../components/GlobalBody";
import Icon from "../../../../components/Icon";
import RegularText from "../../../../components/RegularText";
import TouchableOpacity from "../../../../components/TouchableOpacity";
import { toggleAnimation } from "../../../../constants/animations";
import { additivesListStyles } from "./additivesList.styles";
import { IAdditivesListProps, ILabelTypes } from "./additivesList.types";

const AdditivesList: React.FC<IAdditivesListProps> = ({ additivesDict }) => {
  const { t } = useTranslation("restaurantScreen");
  const [isOpen, setIsOpen] = useState(false);
  const animationRef = useRef(new RNAnimated.Value(0)).current;

  const Item = ({ label, name }: ILabelTypes) => (
    <View style={additivesListStyles.itemContainer}>
      <RegularText style={additivesListStyles.subText}>{label}</RegularText>
      <RegularText style={additivesListStyles.nameText}>{name}</RegularText>
    </View>
  );

  const additivesListElements = Object.keys(additivesDict).map((key, index) => (
    <View
      style={additivesListStyles.additivesListSectionContainer}
      key={index}
    >
      <RegularText>{key.toUpperCase()}:</RegularText>
      {additivesDict[key].map(({ label, name }: ILabelTypes, index: number) => (
        <Item
          key={index}
          label={label}
          name={name}
        />
      ))}
    </View>
  ));

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
          <RNAnimated.View style={{ transform: [{ rotateZ: chevronTransform }] }}>
            <Icon
              source="feather"
              name="chevron-down"
              clickable={true}
              onClick={toggleOpen}
            />
          </RNAnimated.View>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          style={[additivesListStyles.container]}
        >
          {additivesListElements}
        </Animated.View>
      )}
    </GlobalBody>
  );
};

export default AdditivesList;
