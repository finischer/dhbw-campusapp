import { View, Text } from "react-native";
import Button from "../../components/Button/Button";

const LoginScreen = () => {
  return (
    <View>
      <Button variant="text">LoginScreen</Button>
      <Button variant="outlined">LoginScreen</Button>
      <Button variant="contained">LoginScreen</Button>
    </View>
  );
};

export default LoginScreen;
