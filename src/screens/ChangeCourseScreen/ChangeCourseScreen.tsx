import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";
import { useQuery } from "react-query";
import { ICourse } from "../../api/lectures/lectures.types";
import ErrorView from "../../components/ErrorView";
import GlobalBody from "../../components/GlobalBody";
import Loader from "../../components/Loader/Loader";
import Modal from "../../components/Modal";
import { IModalFunctions } from "../../components/Modal/modal.types";
import RegularText from "../../components/RegularText";
import Searchbar from "../../components/Searchbar";
import { SPACING } from "../../constants/layout";
import { useLectures } from "../../hooks/useLectures";
import { changeCourseScreenStyles } from "./changeCourseScreen.styles";
import CourseRow from "./components/CourseRow";

const ChangeCourseScreen = () => {
  const { t } = useTranslation();
  const { getCourses, course } = useLectures();
  const [searchString, setSearchString] = useState<string>("");

  const modalRef = useRef<IModalFunctions | null>(null);

  const modalTitle = t("calendarScreen:selectCourse");

  const fetchCourses = async () => {
    const { data: courseList, requestTime } = await getCourses();
    return { courseList, requestTime };
  };

  const {
    isLoading,
    isError,
    data,
    refetch: refetchCourses,
  } = useQuery("lectures-courses", fetchCourses);

  const transformString = (str: string) => {
    return str.toLowerCase().trim().replace(/\s/g, "");
  };

  const filterCourses = (courses: ICourse[]) => {
    const filteredData = courses.filter((course: ICourse) => {
      const transformedCourseName = transformString(course.courseName);
      const transformedSearchString = transformString(searchString);
      const isSearchStringInCourseName = transformedCourseName.includes(
        transformedSearchString
      );
      if (isSearchStringInCourseName) return course;
    });

    return filteredData;
  };

  if (isLoading) {
    return (
      <Modal
        subTitle={course ? course.courseName : undefined}
        ref={modalRef}
        title={modalTitle}
      >
        <GlobalBody centered noPadding>
          <Loader text={t("calendarScreen:loadingCourses")} />
        </GlobalBody>
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal
        subTitle={course ? course.courseName : undefined}
        ref={modalRef}
        title={modalTitle}
      >
        <ErrorView centered onRetry={refetchCourses}>
          {t("common:errorOccured")}
        </ErrorView>
      </Modal>
    );
  }

  return (
    <Modal
      subTitle={course ? course.courseName : undefined}
      ref={modalRef}
      title={modalTitle}
    >
      {/* Searchbar View */}
      <View style={changeCourseScreenStyles.searchbarContainer}>
        <Searchbar
          searchString={searchString}
          onSearch={(text: string) => setSearchString(text)}
        />
      </View>

      {/* CourseList View */}
      <FlatList
        data={filterCourses(data?.courseList as ICourse[])}
        onScrollBeginDrag={() => modalRef.current?.disappearCloseButton()}
        onScrollEndDrag={() => modalRef.current?.appearCloseButton()}
        contentContainerStyle={{ paddingBottom: SPACING.md }}
        ListEmptyComponent={
          <View style={changeCourseScreenStyles.noCoursesFoundContainer}>
            <RegularText style={changeCourseScreenStyles.noCoursesFoundText}>
              {t("calendarScreen:noMatchesFor", {
                searchString,
              })}
            </RegularText>
          </View>
        }
        renderItem={({ item: itemCourse }: { item: ICourse }) => (
          <CourseRow course={itemCourse} />
        )}
        keyExtractor={(course: ICourse, index: number) => index.toString()} // TODO: check for duplicates
      />
    </Modal>
  );
};

export default ChangeCourseScreen;
