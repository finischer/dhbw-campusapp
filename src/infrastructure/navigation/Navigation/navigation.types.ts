import { StackNavigationProp } from "@react-navigation/stack";
import { LectureType } from "../../../api/lectures/lectures.types";
import { FeatherIconName } from "../../../services/expo-vector-icons/expo-vector-icons.types";
import { ISubjectTypes } from "./../../../api/html_scraper/dualis/types/ISubjectTypes";

export type INavigationIcons = {
  [key: string]: FeatherIconName;
};

export enum ActionTriggers {
  "Notification" = "Notification",
  "Calendar" = "Calendar",
}

type LectureInformationScreenProps = {
  oldLecture: LectureType | null;
  newLecture: LectureType;
  keyChanges: (keyof LectureType)[];
  trigger: string;
};

type CalendarScreenParams = {
  refetchData: boolean;
};

export type ParamList = {
  LectureDetails: LectureInformationScreenProps;
};

export type RootStackParamList = {
  SubjectDetailsScreen?: ISubjectTypes | undefined;
  DualisScreen?: undefined;
  LoginScreen?: undefined;
  CalendarScreen?: CalendarScreenParams | undefined;
  CanteenScreen?: undefined;
  MoreScreen?: undefined;
  ChangeRestaurantScreen?: undefined;
  ChangeLanguageScreen?: undefined;
  ChangeCourseScreen?: undefined;
  LegalNoticeScreen?: undefined;
  SelectLocationScreen?: undefined;
  LicensesScreen?: undefined;
  NotificationSettingsScreen?: undefined;
  LectureInformationScreen?: LectureInformationScreenProps | undefined;
  CampusplanScreen?: undefined;
};

export type RouteName = keyof RootStackParamList;

export type NavigationProps = StackNavigationProp<RootStackParamList>;
