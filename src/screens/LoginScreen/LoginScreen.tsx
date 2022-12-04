import { View, SafeAreaView, KeyboardAvoidingView } from "react-native";
import Button from "../../components/Button/Button";
import GlobalBody from "../../components/GlobalBody";
import Input from "../../components/Input";
import RegularText from "../../components/RegularText";
import typography from "../../constants/typography";
import { loginScreenStyles } from "./loginScreen.styles";

const LoginScreen = () => {
  return (
    <GlobalBody style={loginScreenStyles.wrapperView}>
      <View style={loginScreenStyles.contentView}>
        <View style={loginScreenStyles.title}>
          <RegularText weight="bold" size={typography.h1}>
            Dualis
          </RegularText>
        </View>

        <View style={loginScreenStyles.inputFields}>
          <Input label="Email" keyboardType="email-address" />
          <Input label="Passwort" secureTextEntry={true} />
        </View>
      </View>
    </GlobalBody>
  );
};

export default LoginScreen;
