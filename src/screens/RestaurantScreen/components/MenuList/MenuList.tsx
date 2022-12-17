import { StyleSheet } from "react-native";
import React from "react";
import { IMenuListProps } from "./menuList.types";
import MenuItem from "../MenuItem";
import { IMenuType } from "../../../../api/html_scraper/restaurant/types/IMenuType";
import { menuListStyles } from "./menuListStyles.styles";
import RegularText from "../../../../components/RegularText";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { WINDOW_WIDTH } from "../../../../constants/device/device";
import { GLOBAL_PADDING_HORIZONTAL } from "../../../../constants/layout";

const MenuList: React.FC<IMenuListProps> = ({
  menus,
  index,
  scrollX = 0,
  lengthOfOffers,
}) => {
  const size = useSharedValue(0.8);

  const inputRange = [
    (index - 1) * WINDOW_WIDTH * 0.8,
    index * WINDOW_WIDTH * 0.8,
    (index + 1) * WINDOW_WIDTH * 0.8,
  ];

  size.value = interpolate(
    scrollX,
    inputRange,
    [0.9, 1, 0.9],
    Extrapolate.CLAMP
  );

  const opacity = useSharedValue(1);
  const opacityInputRange = [
    (index - 1) * WINDOW_WIDTH * 0.8,
    index * WINDOW_WIDTH * 0.8,
    (index + 1) * WINDOW_WIDTH * 0.8,
  ];

  opacity.value = interpolate(
    scrollX,
    opacityInputRange,
    [0.7, 1, 0.7],
    Extrapolate.CLAMP
  );

  const animatedMenuListStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: size.value }],
      opacity: opacity.value,
    };
  });

  const localMenuListStyles = StyleSheet.create({
    container: {
      marginLeft: index == 0 ? (WINDOW_WIDTH * 0.18) / 2 : WINDOW_WIDTH * 0.02,
      marginRight:
        index == lengthOfOffers - 1
          ? (WINDOW_WIDTH * 0.18) / 2
          : WINDOW_WIDTH * 0.02,
    },
  });

  if (menus.length === 0) {
    return <RegularText>Kein Angebot für heute verfügbar</RegularText>;
  }

  return (
    <Animated.View
      style={[
        menuListStyles.container,
        animatedMenuListStyle,
        localMenuListStyles.container,
      ]}
    >
      {menus.map((menu: IMenuType, index: number) => (
        <MenuItem key={index} menu={menu} />
      ))}
    </Animated.View>
  );
};

export default MenuList;
