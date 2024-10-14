export type IModalCloseButtonVariants = "close" | "confirm";

export type IModalProps = {
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
  withCloseButton?: boolean;
  onClose?: () => void;
  handleCloseManually?: boolean;
  closeButtonVariant?: IModalCloseButtonVariants;
};

export interface IModalFunctions {
  disappearCloseButton(): void;
  appearCloseButton(): void;
}
