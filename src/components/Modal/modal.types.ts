export type IModalProps = {
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
  withCloseButton?: boolean;
};

export interface IModalFunctions {
  disappearCloseButton(): void;
  appearCloseButton(): void;
}
