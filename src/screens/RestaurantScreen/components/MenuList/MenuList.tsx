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
import moment from "moment";
import { CARD_WIDTH } from "../MenuItem/menuItem.styles";
import { useTranslation } from "react-i18next";
import GlobalBody from "../../../../components/GlobalBody";
import { GLOBAL_PADDING_HORIZONTAL } from "../../../../constants/layout";

const SPACING = 10;
const SIDECARD_LENGTH = 30;

const MenuList: React.FC<IMenuListProps> = ({ menus, date }) => {
  const { t } = useTranslation();

  const dayName = moment(date).format("dddd").toLowerCase();

  const localMenuListStyles = StyleSheet.create({
    container: {},
  });

  return (
    <Animated.View
      style={[menuListStyles.container, localMenuListStyles.container]}
    >
      <Animated.View style={menuListStyles.dateContainer}>
        <RegularText style={menuListStyles.dateText}>
          {t(`common:${dayName}`)}, {moment(date).format("DD.MM.YYYY")}
        </RegularText>
      </Animated.View>
      {menus.length === 0 ? (
        <View style={menuListStyles.noOfferTodayContainer}>
          <RegularText>{t("restaurantScreen:noOfferThisDay")}</RegularText>
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
