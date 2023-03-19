import { ReactElement } from "react";
import { IRegularRowItemProps } from "../RegularRowItem/regularRowItem.types";

export type SettingSectionProps = {
  title: string;
  children:
    | ReactElement<IRegularRowItemProps>
    | Array<ReactElement<IRegularRowItemProps>>;
};
