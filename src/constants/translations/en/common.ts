import { DEVICE } from "../../device/device";
import { version as appVersion } from "../../../../package.json";

export default {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
  timeFormat: "hh:mm a",
  dateFormat: "MM/DD/YYYY",
  lastUpdated: "Last updated",
  back: "Back",
  german: "German",
  english: "English",
  emailSubjectBugFound: "[DHBW CampusApp] Bug found",
  emailBodyBugFound: `Smartphone information:\nManufacturer: ${DEVICE.brand}\n Model: ${DEVICE.modelName}\nSystem Version: ${DEVICE.version}\nApp Version: ${appVersion}\nDescription of the Bug:\n`,
  errorOccured: "An error occured",
  refreshButtonText: "Try again",
  alertUrlError: "Link cannot be opened",
  cancel: "Cancel",
};
