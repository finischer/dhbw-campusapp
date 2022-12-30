import { View } from "react-native";
import React from "react";
import RegularText from "../../../../components/RegularText";
import Searchbar from "../../../../components/Searchbar";
import { listHeaderStyles } from "./scheduleHeader.styles";
import typography from "../../../../constants/typography";
import { useLectures } from "../../../../hooks/useLectures";
import { IScheduleHeaderProps } from "./scheduleHeader.types";

const ScheduleHeader: React.FC<IScheduleHeaderProps> = ({
  searchString,
  onSearch,
}) => {
  const { course } = useLectures();

  return (
    <View style={listHeaderStyles.container}>
      <View>
        <RegularText size={typography.h2} weight="bold">
          {course?.courseName}
        </RegularText>
      </View>

      {/* Searchbar View */}
      <View style={listHeaderStyles.searchbarContainer}>
        <Searchbar onSearch={onSearch} searchString={searchString} />
      </View>
    </View>
  );
};

export default ScheduleHeader;
