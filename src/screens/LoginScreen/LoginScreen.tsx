import { View, KeyboardAvoidingView } from "react-native";
import Button from "../../components/Button/Button";
import GlobalBody from "../../components/GlobalBody";
import Input from "../../components/Input";
import RegularText from "../../components/RegularText";
import typography from "../../constants/typography";
import useDualis from "../../hooks/useDualis";
import { HEADER_HEIGHT } from "../../infrastructure/navigation/Navigation/config";
import { loginScreenStyles } from "./loginScreen.styles";
import { ILoginScreenProps } from "./loginScreen.types";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const LoginScreen = ({ setAccessGranted }: ILoginScreenProps) => {
  const { login } = useDualis();
  const { t } = useTranslation("loginscreen");

  const handleLogin = async (username: string = "", password: string = "") => {
    setAccessGranted(true);
    // TODO: uncomment after dualis website works
    // const successful: boolean = await login(
    //   "s190628@student.dhbw-mannheim.de",
    //   "2Fja9z5p4"
    // );

    // if (!successful) {
    //   const pushAction = StackActions.push("DualisHomeScreen");
    //   setAccessGranted(true);
    //   // navigation.navigate("DualisHomeScreen");
    // }

    // setAccessGranted(false);
  };

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
          <Input
            label={t("email")}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input label={t("password")} secureTextEntry={true} />
        </View>

        <View style={loginScreenStyles.loginButton}>
          <Button variant="contained" onClick={handleLogin}>
            {t("login")}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </GlobalBody>
  );
};

export default LoginScreen;
