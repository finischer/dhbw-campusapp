import { View, Text } from "react-native";
import React from "react";
import RegularRowItem from "../../../../components/RegularRowItem";
import { useLectures } from "../../../../hooks/useLectures";
import { ICourseRowProps } from "./courseRow.types";

const CourseRow: React.FC<ICourseRowProps> = ({ course }) => {
  const { changeCourse, course: selectedCourse } = useLectures();

  const isSelected =
    selectedCourse !== undefined
      ? course.courseId === selectedCourse.courseId
      : false;

  return (
    <View>
      <RegularRowItem
        onClick={() => changeCourse(course)}
        selected={isSelected}
      >
        {course.courseName}
      </RegularRowItem>
    </View>
  );
};

export default CourseRow;
