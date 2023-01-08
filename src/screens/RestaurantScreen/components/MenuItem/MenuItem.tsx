import { View, StyleSheet } from "react-native";
import React from "react";
import RegularText from "../../../../components/RegularText";
import { menuItemStyles } from "./menuItem.styles";
import { useMetadata } from "../../../../hooks/useMetadata";
import { MenuItemProps } from "./menuItem.types";
import Animated from "react-native-reanimated";
import MenuIcon from "../MenuIcon";
import { MenuIconNames } from "../MenuIcon/menuIcon.types";
import { enteringDelayedAnimation } from "../../../../constants/animations";

const MenuItem: React.FC<MenuItemProps> = ({ menu, index }) => {
  const { colors } = useMetadata();
  const localMenuItemStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.primaryDarker,
    },
  });

  return (
    <Animated.View
      entering={enteringDelayedAnimation(index)}
      style={[menuItemStyles.container, localMenuItemStyles.container]}
    >
      <RegularText numberOfLines={1} style={menuItemStyles.menuNameText}>
        {menu.menuName}
      </RegularText>
      <RegularText style={menuItemStyles.menuDescriptionText}>
        {menu.menuDescription}
      </RegularText>
      <View style={menuItemStyles.bottomContainer}>
        <View style={menuItemStyles.iconsContainer}>
          {menu.menuIcons
            .filter(
              (icon: MenuIconNames) => icon !== "deer" && icon !== "shellfish"
            )
            .map((icon: MenuIconNames, index: number) => {
              return <MenuIcon key={index} name={icon} />;
            })}
        </View>
        <RegularText style={menuItemStyles.priceText}>
          {menu.menuPrice} / {menu.menuPriceSelection}
        </RegularText>
      </View>
    </Animated.View>
  );
};

export default MenuItem;
