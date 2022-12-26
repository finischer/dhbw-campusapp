import { Icon } from "@expo/vector-icons/build/createIconSet";
import moment from "moment";
import React from "react";
import { FlatList, ScrollView } from "react-native";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import { useQuery } from "react-query";
import { ICourse } from "../../api/lectures/lectures.types";
import GlobalBody from "../../components/GlobalBody";
import Loader from "../../components/Loader/Loader";
import Modal from "../../components/Modal";
import RegularRowItem from "../../components/RegularRowItem";
import RegularText from "../../components/RegularText";
import { useLectures } from "../../hooks/useLectures";

const ChangeCourseScreen = () => {
  const { getCourses, changeCourseByCourseId, courseId } = useLectures();

  const fetchCourses = async () => {
    const { data: courseList, requestTime } = await getCourses();
    return { courseList, requestTime };
  };

  const { isLoading, data } = useQuery("lectures-courses", fetchCourses);

  if (isLoading) {
    return (
      <GlobalBody centered>
        <Loader text="Kurse werden geladen ..." />
      </GlobalBody>
    );
  }

  if (data?.courseList === undefined) {
    return (
      <GlobalBody centered>
        <RegularText>Error</RegularText>
      </GlobalBody>
    );
  }

  return (
    <Modal title="Kurs auswählen">
      {/* CourseList View */}
      <FlatList
        data={data.courseList as ICourse[]}
        renderItem={({ item: course }: { item: ICourse }) => {
          const isSelected =
            courseId !== undefined ? courseId === course.courseId : false;
          return (
            <RegularRowItem
              onClick={() => changeCourseByCourseId(course.courseId)}
              selected={isSelected}
            >
              {course.courseName}
            </RegularRowItem>
          );
        }}
        keyExtractor={(course: ICourse, index: number) => index.toString()} // TODO: check for duplicated
      />
    </Modal>
  );
};

export default ChangeCourseScreen;
