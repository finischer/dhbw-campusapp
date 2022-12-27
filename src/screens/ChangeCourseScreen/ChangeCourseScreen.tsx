import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";
import { useQuery } from "react-query";
import { ICourse } from "../../api/lectures/lectures.types";
import GlobalBody from "../../components/GlobalBody";
import Loader from "../../components/Loader/Loader";
import Modal from "../../components/Modal";
import RegularRowItem from "../../components/RegularRowItem";
import { useLectures } from "../../hooks/useLectures";

const ChangeCourseScreen = () => {
  const { t } = useTranslation("calendarScreen");
  const { getCourses, changeCourse, course } = useLectures();

  const modalTitle = t("selectCourse");

  const fetchCourses = async () => {
    const { data: courseList, requestTime } = await getCourses();
    return { courseList, requestTime };
  };

  const { isLoading, data } = useQuery("lectures-courses", fetchCourses);

  if (isLoading) {
    return (
      <GlobalBody centered>
        <Loader text={t("loadingCourses")} />
      </GlobalBody>
    );
  }

  return (
    <Modal title={modalTitle}>
      {/* CourseList View */}
      <FlatList
        data={data?.courseList as ICourse[]}
        renderItem={({
          item: itemCourse,
          index,
        }: {
          item: ICourse;
          index: number;
        }) => {
          const isSelected =
            course !== undefined
              ? itemCourse.courseId === course.courseId
              : false;
          return (
            <View>
              <RegularRowItem
                onClick={() => changeCourse(itemCourse)}
                selected={isSelected}
              >
                {itemCourse.courseName}
              </RegularRowItem>
            </View>
          );
        }}
        keyExtractor={(course: ICourse, index: number) => index.toString()} // TODO: check for duplicated
      />
    </Modal>
  );
};

export default ChangeCourseScreen;
