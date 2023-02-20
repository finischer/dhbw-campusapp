import React from "react";
import { StyleSheet, View } from "react-native";
import { IMenuType } from "../../../../api/html_scraper/restaurant/types/IMenuType";
import RegularText from "../../../../components/RegularText";
import MenuItem from "../MenuItem";
import { IMenuListProps } from "./menuList.types";
import { menuListStyles } from "./menuListStyles.styles";

import moment from "moment";
import { useTranslation } from "react-i18next";
import Animated from "react-native-reanimated";
import RequestTime from "../../../../components/RequestTime";
import { useMetadata } from "../../../../hooks/useMetadata";

const MenuList: React.FC<IMenuListProps> = ({ menus, date, requestTime }) => {
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
          <MenuItem key={index} menu={menu} index={index} />
        ))
      )}

      <RequestTime requestTime={requestTime} />
    </Animated.View>
  );
};

export default MenuList;
