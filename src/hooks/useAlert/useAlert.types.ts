export type IAlertButton = {
  text: string;
  onPress(): void;
  style: "default" | "cancel" | "destructive";
};
