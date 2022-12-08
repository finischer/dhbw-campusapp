import React from "react";
import GlobalBody from "../../components/GlobalBody";
import RegularText from "../../components/RegularText";
import { IDualisScreenProps } from "./dualisScreen.types";

const DualisScreen = ({ setAccessGranted }: IDualisScreenProps) => {
  return (
    <GlobalBody>
      <RegularText>DualisScreen</RegularText>
    </GlobalBody>
  );
};

export default DualisScreen;
