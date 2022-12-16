import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { IMenuListProps } from "./menuList.types";
import MenuItem from "../MenuItem";
import { IMenuType } from "../../../../api/html_scraper/restaurant/types/IMenuType";
import { menuListStyles } from "./menuListStyles.styles";
import RegularText from "../../../../components/RegularText";

const MenuList: React.FC<IMenuListProps> = ({ menus }) => {
  if (menus.length === 0) {
    return <RegularText>Kein Angebot für heute verfügbar</RegularText>;
  }

  return (
    <View style={menuListStyles.container}>
      {menus.map((menu: IMenuType) => (
        <MenuItem menu={menu} />
      ))}
    </View>
  );
};

export default MenuList;
