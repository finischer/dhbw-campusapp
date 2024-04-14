import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { AllRestaurantNames } from "../../api/html_scraper/restaurant/types/RestaurantTypes";
import Modal from "../../components/Modal";
import RegularRowItem from "../../components/RegularRowItem";
import { useMetadata } from "../../hooks/useMetadata";
import { useRestaurant } from "../../hooks/useRestaurant/useRestaurant";
import { DHBW_NAME } from "../../utilities/mappings";
import { changeRestaurantStyles } from "./changeRestaurantScreen.styles";

const ChangeRestaurantScreen = () => {
  const { t } = useTranslation("navigation");
  const { dhbwLocation } = useMetadata();
  const { getAllRestaurants, changeRestaurant, formattedRestaurantName } = useRestaurant();
  const allRestaurants = getAllRestaurants();

  const restaurantList = Object.entries(allRestaurants);

  const modalTitle = t("changeRestaurant");

  const handleChangeRestaurant = (restaurant: AllRestaurantNames) => {
    changeRestaurant(restaurant);
  };

  return (
    <Modal
      title={modalTitle}
      subTitle={DHBW_NAME[dhbwLocation]}
    >
      <ScrollView style={changeRestaurantStyles.container}>
        {restaurantList.map((restaurant: [string, string], index: number) => {
          const [restaurantKey, restaurantName]: [string, string] = restaurant;
          const isSelected = restaurantName === formattedRestaurantName;

          return (
            <RegularRowItem
              onClick={() => handleChangeRestaurant(restaurantKey as AllRestaurantNames)}
              key={index}
              selected={isSelected}
            >
              {restaurantName}
            </RegularRowItem>
          );
        })}
      </ScrollView>
    </Modal>
  );
};

export default ChangeRestaurantScreen;
