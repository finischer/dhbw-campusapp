import { ReactElement } from "react";
import { IRegularRowItemProps } from "../RegularRowItem/regularRowItem.types";

export interface SettingSectionProps {
  title: string;
  children:
    | ReactElement<IRegularRowItemProps>
    | Array<ReactElement<IRegularRowItemProps>>;
  contentGap?: boolean; // gap between title and content
}
