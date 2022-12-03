import { Alert, StyleSheet, View } from "react-native";
import useDualis from "./src/hooks/useDualis";
import { ISemesterTypes } from "./src/api/html_scraper/dualis/types/ISemesterTypes";
import { IErrorTypes } from "./src/api/types/IErrorTypes";
import { ISemesterOptionsTypes } from "./src/api/html_scraper/dualis/types/ISemesterOptionsTypes";
import Navigation from "./src/infrastructure/navigation/Navigation";

export default function App() {
  const { login, logout, getAllGrades, getSemesterInformation, args, cookies } =
    useDualis();

  const handleLogin = async (username: string, password: string) => {
    const authenticated: boolean = await login(username, password);

    if (!authenticated) return Alert.alert("Login fehlgeschlagen!");

    Alert.alert("Login war erfolgreich!");
  };

  const showGrades = async () => {
    const grades: ISemesterTypes[] | IErrorTypes | undefined =
      await getAllGrades();

    if (!grades) {
      Alert.alert(
        "Es ist ein Fehler aufgetreten",
        "Noten konnte nicht abgerufen werden!"
      );
    }
  };

  const showSemesters = async () => {
    const semesters: ISemesterOptionsTypes | undefined =
      await getSemesterInformation();

    if (!semesters)
      Alert.alert(
        "Es ist ein Fehler aufgetreten!",
        "Semesterinformationen konnten nicht abgerufen werden"
      );
  };

  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    backgroundColor: "lightblue",
  },
  navigation: {},
});
