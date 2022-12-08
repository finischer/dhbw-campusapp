import { TouchableOpacityProps } from "react-native";

export type ITouchableOpacityProps = Partial<TouchableOpacityProps> & {
  children: React.ReactNode;
};
