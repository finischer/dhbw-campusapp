import { ISwitchProps } from "../Switch/switch.types";

export type SwitchRowSettingProps = {
  title: string | null;
  onChangeSwitch: ISwitchProps["onChange"];
  switchValue: ISwitchProps["value"];
  subtitle?: string | null;
  disabled?: boolean;
};
