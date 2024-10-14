import { DEVICE } from "../../device/device";
import { version as appVersion } from "../../../../package.json";

export default {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
  timeFormat: "HH:mm [hora]",
  dateFormat: "DD.MM.YYYY",
  lastUpdated: "Última actualización",
  back: "Volver",
  german: "Alemán",
  english: "Inglés",
  emailSubjectBugFound: "[DHBW CampusApp] Se encontró un error",
  emailBodyBugFound: `Información del smartphone:\nFabricante: ${DEVICE.brand}\nModelo: ${DEVICE.modelName}\nVersión del sistema: ${DEVICE.version}\nVersión de la app: ${appVersion}\nDescripción del error:\n`,
  errorOccured: "Ocurrió un error",
  refreshButtonText: "Intentar de nuevo",
  alertUrlError: "No se puede abrir el enlace",
  cancel: "Cancelar",
  hint: "Aviso",
  before: "Antes",
  current: "Actual",
  maintenanceHintDesign: "Todavía se está trabajando en el diseño 🛠️",
  lecture: "Clase",
  startDate: "Fecha de inicio",
  startTime: "Hora de inicio",
  endDate: "Fecha de finalización",
  endTime: "Hora de finalización",
  location: "Ubicación",
  openingHours: "Horario de apertura",
  adress: "Dirección",
  light: "Claro",
  dark: "Oscuro",
  system: "Sistema",
  thisIsNotAValidUrl: "Esta URL no es válida",
  openSettings: "Abrir ajustes",
};
