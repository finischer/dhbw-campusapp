import { View, KeyboardAvoidingView } from "react-native";
import { useState, useEffect } from "react";
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
import { useMetadata } from "../../hooks/useMetadata";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import useSecureStorage from "../../hooks/useSecureStorage";
import useAsyncStorage from "../../hooks/useAsyncStorage";
import { AsyncStorageEntries } from "../../hooks/useAsyncStorage/useAsyncStorage.types";
import Icon from "../../components/Icon";

const LoginScreen = ({ setAccessGranted }: ILoginScreenProps) => {
  const { isIOS, colors } = useMetadata();
  const {
    saveValueInSecureStorage,
    getValueFromSecureStorage,
    removeValueFromSecureStorage,
  } = useSecureStorage();
  const { getDataFromAsyncStorage, storeDataInAsyncStorage } =
    useAsyncStorage();
  const [formState, setFormState] = useState<ILoginFormStateTypes>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(false);
  const { login } = useDualis();
  const { t } = useTranslation("loginScreen");

  const stayLoggedInText = t("stayLoggedIn");
  const [isError, setIsError] = useState(false);
  const { isFetching, refetch: handleLogin } = useQuery(
    ["dualis-login"],
    () => loginToDualis(formState.email, formState.password),
    { enabled: false }
  );

  useEffect(() => {
    const initializeCredentials = async () => {
      const email = await getValueFromSecureStorage("email");
      const password = await getValueFromSecureStorage("password");

      // Show if email and password are in Secure Store
      if (email && password) {
        // Behavior when user opens the app
        setStayLoggedIn(true);
        setFormState({
          email,
          password,
        });

        // Check whether user has permission to login
        const accessGranted = await getDataFromAsyncStorage("accessGranted");

        // Access is false when user pressed the login button
        // In that case, app should of course not login automatically
        if (accessGranted) {
          handleLogin();
        } else {
          // If user pressed the logout button, checkbox will be unchecked
          setStayLoggedIn(false);
        }
      }
    };

    initializeCredentials();
  }, []);

  const loginToDualis = async (email: string, password: string) => {
    setIsError(false);
    const successful: boolean = await login(email, password);

    if (successful) {
      setIsError(false);
      setAccessGranted(true);
      storeDataInAsyncStorage("accessGranted", true);

      // When checkbox is checked, save email and password in Secure Store
      // to login automatically when user will open the app next time
      if (stayLoggedIn) {
        saveValueInSecureStorage("email", email);
        saveValueInSecureStorage("password", password);
      } else {
        // Remove email and password if checkbox is not checked by the user
        await removeValueFromSecureStorage("email");
        await removeValueFromSecureStorage("password");
      }
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

  const toggleStayLoggedIn = async () => {
    setStayLoggedIn((oldState) => !oldState);
  };

  return (
    <GlobalBody style={loginScreenStyles.wrapperView}>
      <KeyboardAvoidingView
        behavior="position"
        style={loginScreenStyles.contentView}
        keyboardVerticalOffset={isIOS ? HEADER_HEIGHT + 50 : 0}
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
              <Icon
                source="feather"
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

        {/* StayLoggedIn Checkbox View */}
        <View style={loginScreenStyles.stayLoggedInContainer}>
          <BouncyCheckbox
            isChecked={stayLoggedIn}
            disableBuiltInState={true}
            fillColor={colors.accent}
            text={stayLoggedInText}
            textStyle={[
              loginScreenStyles.stayLoggedInButtonText,
              { color: colors.secondary },
            ]}
            onPress={toggleStayLoggedIn}
          />
        </View>

        {/* Login Button */}
        <View style={loginScreenStyles.loginButton}>
          {isFetching ? (
            <View style={loginScreenStyles.loaderContainer}>
              <Loader text={t("loaderText")} />
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
