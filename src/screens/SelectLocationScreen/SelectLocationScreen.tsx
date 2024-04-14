import React from "react";
import GlobalBody from "../../components/GlobalBody";
import RegularRowItem from "../../components/RegularRowItem";
import { useMetadata } from "../../hooks/useMetadata";
import { DHBWLocation } from "../../hooks/useMetadata/useMetadata.types";
import { DHBW_NAME } from "../../utilities/mappings";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../infrastructure/navigation/Navigation/navigation.types";

const DHBW_LOCATIONS: DHBWLocation[] = [DHBWLocation.Mannheim, DHBWLocation.Karlsruhe];

const SelectLocationScreen = () => {
  const { changeDhbwLocation, dhbwLocation } = useMetadata();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleItemClick = (newDhbwLocation: DHBWLocation) => {
    changeDhbwLocation(newDhbwLocation);
    // navigation.goBack();
  };

  return (
    <GlobalBody>
      {DHBW_LOCATIONS.map((location: DHBWLocation) => (
        <RegularRowItem
          key={location}
          onClick={() => handleItemClick(location)}
          selected={dhbwLocation === location}
        >
          {DHBW_NAME[location]}
        </RegularRowItem>
      ))}
    </GlobalBody>
  );
};

export default SelectLocationScreen;
