import { View, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import Button from "../../components/Button/Button";
import GlobalBody from "../../components/GlobalBody";
import Input from "../../components/Input";
import RegularText from "../../components/RegularText";
import typography from "../../constants/typography";
import { useDualis } from "../../hooks/useDualis";
import { HEADER_HEIGHT } from "../../infrastructure/navigation/Navigation/config";
import { loginScreenStyles } from "./loginScreen.styles";
import { ILoginFormStateTypes, ILoginScreenProps } from "./loginScreen.types";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import Loader from "../../components/Loader/Loader";
import FeatherIcon from "../../components/FeatherIcon";
import { useMetadata } from "../../hooks/useMetadata";

const LoginScreen = ({ setAccessGranted }: ILoginScreenProps) => {
  const { isIOS } = useMetadata();
  const [formState, setFormState] = useState<ILoginFormStateTypes>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useDualis();
  const { t } = useTranslation("loginscreen");

  const [isError, setIsError] = useState(false);
  const { isFetching, refetch: handleLogin } = useQuery(
    ["dualis-login"],
    () => loginToDualis(formState.email, formState.password),
    { enabled: false }
  );

  const loginToDualis = async (email: string, password: string) => {
    setIsError(false);
    const successful: boolean = await login(email, password);

    if (successful) {
      setIsError(false);
      setAccessGranted(true);
      return;
    }

    setIsError(true);
    setAccessGranted(false);
  };

  const handleFormChange = (
    formStateKey: keyof ILoginFormStateTypes,
    newText: string
  ) => {
    setFormState((oldFormState: ILoginFormStateTypes) => ({
      ...oldFormState,
      [formStateKey]: newText,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((oldState) => !oldState);
  };

  return (
    <GlobalBody style={loginScreenStyles.wrapperView}>
      <KeyboardAvoidingView
        behavior="position"
        style={loginScreenStyles.contentView}
        keyboardVerticalOffset={isIOS ? HEADER_HEIGHT + 250 : 0}
      >
        {/* LoginScreen Title */}
        <View style={loginScreenStyles.title} testID="loginScreen-title">
          <RegularText weight="bold" size={typography.h1}>
            Dualis
          </RegularText>
        </View>

        {/* Input Fields */}
        <View style={loginScreenStyles.inputFields}>
          <Input
            label={t("email")}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text: string) => handleFormChange("email", text)}
            value={formState.email}
          />

          <Input
            label={t("password")}
            secureTextEntry={!showPassword}
            onChangeText={(text: string) => handleFormChange("password", text)}
            rightIcon={
              <FeatherIcon
                name={showPassword ? "eye-off" : "eye"}
                size={30}
                onClick={toggleShowPassword}
              />
            }
            value={formState.password}
          />
        </View>

        {/* Login Error */}
        <View style={loginScreenStyles.errorContainer}>
          {isError && (
            <RegularText accentColor weight="bold">
              {t("loginFailed")}
            </RegularText>
          )}
        </View>

        {/* Login Button */}
        <View style={loginScreenStyles.loginButton}>
          {isFetching ? (
            <View style={loginScreenStyles.loaderContainer}>
              <Loader text="Du wirst angemeldet ..." />
            </View>
          ) : (
            <Button
              variant="contained"
              onClick={handleLogin}
              disabled={!formState.email || !formState.password}
            >
              {t("login")}
            </Button>
          )}
        </View>
      </KeyboardAvoidingView>
    </GlobalBody>
  );
};

export default LoginScreen;
