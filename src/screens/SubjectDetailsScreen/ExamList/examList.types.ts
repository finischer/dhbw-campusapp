import { FlatListProps } from "react-native";
import { IExamTypes } from "../../../api/html_scraper/dualis/types/IExamTypes";

export type IExamListProps = Partial<FlatListProps<IExamTypes>> & {
  exams: IExamTypes[];
};

export type IExamListRenderItemProps = {
  item: IExamTypes;
  index: number;
};
