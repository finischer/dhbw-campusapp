import moment from "moment";
import { ISubjectTypes } from "../../../../api/html_scraper/dualis/types/ISubjectTypes";

export type ISubjectListProps = {
  subjects: ISubjectTypes[];
  requestTime: moment.Moment | undefined;
  onRefresh?(): any | Promise<any> | undefined;
};

export type ISubjectListRenderItemProps = {
  item: ISubjectTypes;
  index: number;
};
