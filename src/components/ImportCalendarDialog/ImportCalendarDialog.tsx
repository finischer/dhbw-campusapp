import React, { useEffect, useImperativeHandle, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import Dialog from "react-native-dialog";
import { useLectures } from "../../hooks/useLectures";
import { IImportCalendarDialogFunctions, IImportCalendarDialogProps } from "./importCalendarDialog.types";
import { useMetadata } from "../../hooks/useMetadata";
import useAsyncStorage from "../../hooks/useAsyncStorage";
import { isValidUrl } from "../../utilities/validationHelpers";
import RegularText from "../RegularText";
import { SIZES, SPACING } from "../../constants/layout";

const INPUT_PLACEHOLDER = "https://myicallink.com";

const ImportCalendarDialog = React.forwardRef<IImportCalendarDialogFunctions, IImportCalendarDialogProps>(
  (_, ref) => {
    const { t } = useTranslation();
    const { colors, isIOS } = useMetadata();
    const { changeCourseByUrl } = useLectures();
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState("");
    const { getDataFromAsyncStorage } = useAsyncStorage();

    const placeholderTextColor = colors.secondaryDarker;

    // add local functions, so that you can use these functions in other components
    useImperativeHandle(ref, () => ({
      openDialog: () => {
        openDialog();
      },
    }));

    const openDialog = async () => {
      setErrorMsg("");
      const icalUrl = await getDataFromAsyncStorage("icalUrl");
      setInputText(icalUrl);

      setShowDialog(true);
    };

    const closeDialog = () => {
      setShowDialog(false);
    };

    const handleImportCalendar = () => {
      setErrorMsg("");
      if (!isValidUrl(inputText)) {
        const msg = t("common:thisIsNotAValidUrl");
        setErrorMsg(msg);
        return;
      }

      changeCourseByUrl(inputText);
      closeDialog();
    };

    return (
      <Dialog.Container
        onBackdropPress={closeDialog}
        contentStyle={{
          backgroundColor: colors.primary,
        }}
        visible={showDialog}
        blurComponentIOS={<View />} // prevents weird bug, where backgroundColor is not registered on iOS
      >
        <Dialog.Title
          style={{
            color: colors.secondary,
          }}
        >
          iCal Link
        </Dialog.Title>
        <Dialog.Description
          style={{
            color: colors.secondary,
          }}
        >
          {t("moreScreen:importCalendarPromptMessage")}
        </Dialog.Description>
        <Dialog.Input
          wrapperStyle={{
            backgroundColor: isIOS ? colors.primaryDarker : "",
            borderWidth: errorMsg ? 1 : undefined,
            borderColor: colors.error,
          }}
          style={{
            color: colors.secondary,
          }}
          value={inputText}
          selectionColor={colors.accent}
          onChangeText={(newText: string) => setInputText(newText)}
          placeholder={INPUT_PLACEHOLDER}
          placeholderTextColor={placeholderTextColor}
        />
        {errorMsg && (
          <RegularText
            accentColor
            size={SIZES.sm}
            style={{
              marginHorizontal: "auto",
              marginBottom: SPACING.md,
            }}
          >
            {errorMsg}
          </RegularText>
        )}
        <Dialog.Button
          style={{
            color: colors.accent,
          }}
          onPress={closeDialog}
          label={t("common:cancel")}
        />
        <Dialog.Button
          style={{
            color: colors.secondary,
          }}
          onPress={handleImportCalendar}
          label={t("moreScreen:importCalendar")}
        />
      </Dialog.Container>
    );
  }
);

ImportCalendarDialog.displayName = "ImportCalendarDialogComponent";

export default ImportCalendarDialog;
