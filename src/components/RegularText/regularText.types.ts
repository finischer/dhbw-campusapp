import { TextInputProps, TextStyle } from "react-native";

export type IRegularTextVariants = "light" | "dark" | undefined;

type ConditionalLink =
  | {
      isLink?: true;
      url: string;
    }
  | {
      isLink?: false;
      url?: string | undefined;
    };

export type IRegularTextTypes = Partial<TextInputProps> &
  ConditionalLink & {
    variant?: IRegularTextVariants;
    accentColor?: boolean;
    weight?: TextStyle["fontWeight"];
    size?: TextStyle["fontSize"];
    style?: TextStyle | TextStyle[] | {};
    underline?: boolean;
    isLink?: boolean;
    children: React.ReactNode;
  };
