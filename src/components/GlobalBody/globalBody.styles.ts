import { Dimensions } from "react-native";
import {
  HEADER_HEIGHT,
  TAB_BAR_HEIGHT,
} from "../../infrastructure/navigation/Navigation/config";

export const globalBodyStyles = {
  paddingVertical: 10,
  paddingHorizontal: 20,
  height: Dimensions.get("window").height - HEADER_HEIGHT - TAB_BAR_HEIGHT,
};
