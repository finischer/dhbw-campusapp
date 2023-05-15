import { type DialogButtonProps } from "react-native-dialog/lib/Button";

export interface IAlertProps {
  title: string;
  description?: string | null;
  buttons?: DialogButtonProps[];
}

export interface IAlertFunctions {
  openAlert(): void;
  closeAlert(): void;
}
