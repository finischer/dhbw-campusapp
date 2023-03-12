import * as Device from "expo-device";
import { Dimensions } from "react-native";
import { DeviceType } from "./device.types";

export const WINDOW_HEIGHT: number = Dimensions.get("window").height;
export const WINDOW_WIDTH: number = Dimensions.get("window").width;

export const DEVICE: DeviceType = {
  brand: Device.brand,
  version: Device.osVersion,
  modelName: Device.modelName,
};
