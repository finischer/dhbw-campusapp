import { StyleSheet, View } from "react-native";
import React from "react";
import { IMenuListProps } from "./menuList.types";
import MenuItem from "../MenuItem";
import { IMenuType } from "../../../../api/html_scraper/restaurant/types/IMenuType";
import { menuListStyles } from "./menuListStyles.styles";
import RegularText from "../../../../components/RegularText";

import moment from "moment";
import { useTranslation } from "react-i18next";
import Animated from "react-native-reanimated";
import RequestTime from "../../../../components/RequestTime";
import { useMetadata } from "../../../../hooks/useMetadata";

const MenuList: React.FC<IMenuListProps> = ({ menus, date }) => {
  const { t } = useTranslation();
  const { dateFormat } = useMetadata();
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
          {t(`common:${dayName}`)}, {moment(date).format(dateFormat)}
        </RegularText>
      </Animated.View>
      {menus.length === 0 ? (
        <View style={menuListStyles.noOfferTodayContainer}>
          <RegularText style={menuListStyles.noOfferTodayText}>
            {t("restaurantScreen:noOfferThisDay")}
          </RegularText>
        </View>
      ) : (
        menus.map((menu: IMenuType, index: number) => (
          <MenuItem key={index} menu={menu} />
        ))
      )}

      {/* Request Time */}
      <RequestTime />
    </Animated.View>
  );
};

export default MenuList;
