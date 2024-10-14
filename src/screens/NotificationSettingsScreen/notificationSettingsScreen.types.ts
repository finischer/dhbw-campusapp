export enum NotificationServices {
  "Dualis" = "dualis",
  "Lectures" = "lectures",
}

export type NotificationSettings = {
  [key in NotificationServices]: boolean;
};
