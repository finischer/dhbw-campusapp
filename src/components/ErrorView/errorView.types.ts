type ConditionalRenderButtons =
  | {
      showSecondaryButton?: true;
      onClickSecondaryButton(): any;
      secondaryButtonText: string;
    }
  | {
      showSecondaryButton?: false;
      onClickSecondaryButton?(): undefined;
      secondaryButtonText?: undefined;
    }
  | {
      showSecondaryButton?: undefined;
      onClickSecondaryButton?(): undefined;
      secondaryButtonText?: undefined;
    };

export type IErrorViewProps = {
  children: React.ReactNode | React.ReactNode[];
  centered?: boolean;
  onRetry?(): any | undefined;
  CustomButton?: React.FC | undefined;
  error?: Error | undefined;
} & ConditionalRenderButtons;
