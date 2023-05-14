import { DEVICE } from "../../device/device";
import { version as appVersion } from "../../../../package.json";

export default {
  monday: "Montag",
  tuesday: "Dienstag",
  wednesday: "Mittwoch",
  thursday: "Donnerstag",
  friday: "Freitag",
  saturday: "Samstag",
  sunday: "Sonntag",
  timeFormat: "HH:mm [Uhr]",
  dateFormat: "DD.MM.YYYY",
  lastUpdated: "Zuletzt aktualisiert am",
  back: "Zurück",
  german: "Deutsch",
  english: "Englisch",
  emailSubjectBugFound: "[DHBW CampusApp] Bug gefunden",
  emailBodyBugFound: `Informationen zum Smartphone:\nHersteller: ${DEVICE.brand}\n Modell: ${DEVICE.modelName}\nSystem Version: ${DEVICE.version}\nApp Version: ${appVersion}\nBeschreibung des Bugs:\n`,
  errorOccured: "Es ist ein Fehler aufgetreten",
  refreshButtonText: "Nochmal versuchen",
  alertUrlError: "Link kann nicht geöffnet werden",
  cancel: "Zurück",
  hint: "Hinweis",
  before: "Vorher",
  current: "Aktuell",
  maintenanceHintDesign: "Am Design wird noch gearbeitet 🛠️",
};
