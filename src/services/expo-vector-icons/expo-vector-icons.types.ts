import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export type FeatherIconName = React.ComponentProps<typeof Feather>["name"];
export type FontAwesomeIconName = React.ComponentProps<
  typeof FontAwesome
>["name"];
export type FontAwesome5IconName = React.ComponentProps<
  typeof FontAwesome5
>["name"];

export type IoniconsIconName = React.ComponentProps<typeof Ionicons>["name"];
export type MaterialCommunityIconName = React.ComponentProps<
  typeof MaterialCommunityIcons
>["name"];
