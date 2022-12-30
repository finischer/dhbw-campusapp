import { ModalProps } from "react-native";

export type IModalProps = {
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
};

export interface IModalFunctions {
  disappearCloseButton(): void;
  appearCloseButton(): void;
}
