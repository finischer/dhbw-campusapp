import { View } from "react-native";
import React from "react";
import { menuIconStyles } from "./menuIcon.styles";
import { IconToSourceTypes, IMenuIconProps } from "./menuIcon.types";
import Icon from "../../../../components/Icon";

const ICON_TO_SOURCES: IconToSourceTypes = {
  fish: {
    iconSource: "fa5",
    iconName: "fish",
  },
  carrot: {
    iconSource: "fa5",
    iconName: "carrot",
  },
  leaf: {
    iconSource: "fa5",
    iconName: "leaf",
  },
  cow: {
    iconSource: "mci",
    iconName: "cow",
  },
  sheep: {
    iconSource: "mci",
    iconName: "sheep",
  },
  pig: {
    iconSource: "mci",
    iconName: "pig",
  },
  chicken: {
    iconSource: "mci",
    iconName: "food-drumstick",
  },
};

const MenuIcon: React.FC<IMenuIconProps> = ({ name }) => {
  const { iconSource, iconName } = ICON_TO_SOURCES[name];

  return (
    <View style={menuIconStyles.container}>
      <Icon source={iconSource} name={iconName} />
    </View>
  );
};

export default MenuIcon;
