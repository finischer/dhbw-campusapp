import { View, StyleSheet } from "react-native";
import React from "react";
import { IMenuType } from "../../../../api/html_scraper/restaurant/types/IMenuType";
import RegularText from "../../../../components/RegularText";
import { menuItemStyles } from "./menuItem.styles";
import { useMetadata } from "../../../../hooks/useMetadata";
import { MenuItemProps } from "./menuItem.types";

const MenuItem: React.FC<MenuItemProps> = ({ menu }: { menu: IMenuType }) => {
  const { colors } = useMetadata();
  const localMenuItemStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.primaryDarker,
    },
  });

  return (
    <View style={[menuItemStyles.container, localMenuItemStyles.container]}>
      <RegularText numberOfLines={1} style={menuItemStyles.menuNameText}>
        {menu.menuName}
      </RegularText>
      <RegularText style={menuItemStyles.menuDescriptionText}>
        {menu.menuDescription}
      </RegularText>
      <View style={menuItemStyles.bottomContainer}>
        <RegularText style={menuItemStyles.priceText}>
          {menu.menuPrice} / {menu.menuPriceSelection}
        </RegularText>
      </View>
    </View>
  );
};

export default MenuItem;
