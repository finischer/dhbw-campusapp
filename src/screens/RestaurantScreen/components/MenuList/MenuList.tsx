import { StyleSheet, View } from "react-native";
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
import moment from "moment";
import { CARD_WIDTH } from "../MenuItem/menuItem.styles";

const SPACING = WINDOW_WIDTH * 0.02;
const SIDECARD_LENGTH = (WINDOW_WIDTH * 0.18) / 2;

const MenuList: React.FC<IMenuListProps> = ({
  menus,
  date,
  index,
  scrollX = 0,
  lengthOfOffers,
}) => {
  const size = useSharedValue(0.8);

  const inputRange = [
    (index - 1) * CARD_WIDTH,
    index * CARD_WIDTH,
    (index + 1) * CARD_WIDTH,
  ];

  size.value = interpolate(
    scrollX,
    inputRange,
    [0.9, 1, 0.9],
    Extrapolate.CLAMP
  );

  const opacity = useSharedValue(1);
  const opacityInputRange = [
    (index - 1) * CARD_WIDTH,
    index * CARD_WIDTH,
    (index + 1) * CARD_WIDTH,
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
      marginLeft: index == 0 ? SIDECARD_LENGTH : SPACING,
      marginRight: index == lengthOfOffers - 1 ? SIDECARD_LENGTH : SPACING,
    },
  });

  return (
    <Animated.View
      style={[
        menuListStyles.container,
        animatedMenuListStyle,
        localMenuListStyles.container,
      ]}
    >
      <View style={menuListStyles.dateContainer}>
        <RegularText style={menuListStyles.dateText}>
          {moment(date).format("DD.MM.YYYY")}
        </RegularText>
      </View>
      {menus.length === 0 ? (
        <View style={menuListStyles.noOfferTodayContainer}>
          <RegularText>Für heute kein Angebot</RegularText>
        </View>
      ) : (
        menus.map((menu: IMenuType, index: number) => (
          <MenuItem key={index} menu={menu} />
        ))
      )}
    </Animated.View>
  );
};

export default MenuList;
