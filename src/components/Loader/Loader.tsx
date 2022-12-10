import { View, Text } from "react-native";
import React from "react";
import { ILoaderProps } from "./loader.types";
import RegularText from "../RegularText";

// TODO: Add Loader and style it

const Loader = ({ text, size = "medium" }: ILoaderProps) => {
  return <RegularText>{text}</RegularText>;
};

export default Loader;
