import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import Button from "../../components/Button/Button";
import GlobalBody from "../../components/GlobalBody";
import Input from "../../components/Input";
import RegularText from "../../components/RegularText";
import typography from "../../constants/typography";
import { HEADER_HEIGHT } from "../../infrastructure/navigation/Navigation/config";
import { loginScreenStyles } from "./loginScreen.styles";

const LoginScreen = () => {
  return (
    <GlobalBody style={loginScreenStyles.wrapperView}>
      <KeyboardAvoidingView
        behavior="padding"
        style={loginScreenStyles.contentView}
        keyboardVerticalOffset={HEADER_HEIGHT + 200}
      >
        <View style={loginScreenStyles.title}>
          <RegularText weight="bold" size={typography.h1}>
            Dualis
          </RegularText>
        </View>

        <View style={loginScreenStyles.inputFields}>
          <Input label="Email" keyboardType="email-address" />
          <Input label="Passwort" secureTextEntry={true} />
        </View>

        <View style={loginScreenStyles.loginButton}>
          <Button variant="contained">Anmelden</Button>
        </View>
      </KeyboardAvoidingView>
    </GlobalBody>
  );
};

export default LoginScreen;
