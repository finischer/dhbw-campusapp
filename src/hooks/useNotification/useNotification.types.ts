type NotificationMessage = {
  title: string | null;
  subtitle?: string | null;
  body: string | null;
  data?: Record<string, any>;
  sound?: "default" | "defaultCritical" | "custom" | null;
};
