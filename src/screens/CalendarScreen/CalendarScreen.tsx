import React from "react";
import GlobalBody from "../../components/GlobalBody";
import RegularText from "../../components/RegularText";

const CalendarScreen = () => {
  return (
    <GlobalBody centered>
      <RegularText style={{ textAlign: "center" }}>
        Du musst zuerst einen Kurs auswählen, um den Vorlesungsplan zu sehen
      </RegularText>
    </GlobalBody>
  );
};

export default CalendarScreen;
