import { ScrollView } from "react-native";
import React from "react";
import Modal from "../../components/Modal";
import { changeRestaurantStyles } from "./changeRestaurantScreen.styles";
import { useRestaurant } from "../../hooks/useRestaurant/useRestaurant";
import { RestaurantsMapTypes } from "../../hooks/useRestaurant/useRestaurant.types";
import RegularRowItem from "../../components/RegularRowItem";
import { RestaurantOptions } from "../../api/html_scraper/restaurant/types/RestaurantTypes";
import { useTranslation } from "react-i18next";

const ChangeRestaurantScreen = () => {
  const { t } = useTranslation("navigation");
  const { getAllRestaurants, changeRestaurant, formattedRestaurantName } =
    useRestaurant();
  const restaurantsObject: RestaurantsMapTypes = getAllRestaurants();
  const restaurantList = Object.entries(restaurantsObject);

  const modalTitle = t("changeRestaurant");

  const handleChangeRestaurant = (restaurant: RestaurantOptions) => {
    changeRestaurant(restaurant);
  };

  return (
    <Modal title={modalTitle} subTitle="Mannheim">
      <ScrollView style={changeRestaurantStyles.container}>
        {restaurantList.map((restaurant: [string, string], index: number) => {
          const [restaurantKey, restaurantName]: [string, string] = restaurant;
          const isSelected = restaurantName === formattedRestaurantName;

          return (
            <RegularRowItem
              onClick={() =>
                handleChangeRestaurant(restaurantKey as RestaurantOptions)
              }
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
