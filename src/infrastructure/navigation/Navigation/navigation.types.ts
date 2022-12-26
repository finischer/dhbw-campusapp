import { ISubjectTypes } from "./../../../api/html_scraper/dualis/types/ISubjectTypes";
import { FeatherIconName } from "../../../services/expo-vector-icons/expo-vector-icons.types";

export type INavigationIcons = {
  [key: string]: FeatherIconName;
};

export type RootStackParamList = {
  SubjectDetailsScreen?: ISubjectTypes | undefined;
  DualisScreen?: undefined;
  LoginScreen?: undefined;
  CalendarScreen?: undefined;
  CanteenScreen?: undefined;
  MoreScreen?: undefined;
  ChangeRestaurantScreen?: undefined;
  ChangeCourseScreen?: undefined;
};
