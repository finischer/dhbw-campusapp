import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/infrastructure/navigation/Navigation";
import { useFonts } from "@expo-google-fonts/source-sans-pro";
import "./src/services/i18next/i18next.config";

export default function App() {
  const [fontsLoaded] = useFonts({
    SourceSansProRegular: require("./src/assets/fonts/SourceSansPro-Regular.ttf"),
    SourceSansProBold: require("./src/assets/fonts/SourceSansPro-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Schriften werden geladen ...</Text>
      </View>
    );
  }

  return <Navigation />;
}

// const { login, logout, getAllGrades, getSemesterInformation, args, cookies } =
//     useDualis();

//   const handleLogin = async (username: string, password: string) => {
//     const authenticated: boolean = await login(username, password);

//     if (!authenticated) return Alert.alert("Login fehlgeschlagen!");

//     Alert.alert("Login war erfolgreich!");
//   };

//   const showGrades = async () => {
//     const grades: ISemesterTypes[] | IErrorTypes | undefined =
//       await getAllGrades();

//     if (!grades) {
//       Alert.alert(
//         "Es ist ein Fehler aufgetreten",
//         "Noten konnte nicht abgerufen werden!"
//       );
//     }
//   };

//   const showSemesters = async () => {
//     const semesters: ISemesterOptionsTypes | undefined =
//       await getSemesterInformation();

//     if (!semesters)
//       Alert.alert(
//         "Es ist ein Fehler aufgetreten!",
//         "Semesterinformationen konnten nicht abgerufen werden"
//       );
//   };
