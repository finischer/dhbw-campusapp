import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View } from "react-native";
import Button from "./src/components/Button/Button";
import { NavigationContainer } from "@react-navigation/native";
import useDualis from "./src/hooks/useDualis";
import { ISemesterTypes } from "./src/api/html_scraper/dualis/types/ISemesterTypes";
import { IErrorTypes } from "./src/api/types/IErrorTypes";
import { ISemesterOptionsTypes } from "./src/api/html_scraper/dualis/types/ISemesterOptionsTypes";

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

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        <Button
          variant="outlined"
          onClick={() =>
            handleLogin("s190628@student.dhbw-mannheim.de", "Fja9z5p4")
          }
        >
          Login Dualis
        </Button>
        <Button variant="outlined" onClick={logout}>
          Logout Dualis
        </Button>
        <Button variant="outlined" onClick={showGrades}>
          Get Units
        </Button>
        <Button variant="outlined" onClick={showSemesters}>
          Show semesters
        </Button>
        <Text>Arguments: {args} </Text>
        <Text>Cookies: {cookies} </Text>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
