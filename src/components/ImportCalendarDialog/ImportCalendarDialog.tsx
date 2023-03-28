import React, { useImperativeHandle, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import Dialog from "react-native-dialog";
import { useLectures } from "../../hooks/useLectures";
import {
  IImportCalendarDialogFunctions,
  IImportCalendarDialogProps,
} from "./importCalendarDialog.types";
import { useMetadata } from "../../hooks/useMetadata";

const ImportCalendarDialog = React.forwardRef<
  IImportCalendarDialogFunctions,
  IImportCalendarDialogProps
>(({ }, ref) => {
  const { t } = useTranslation();
  const { colors } = useMetadata();
  const { changeCourseByUrl } = useLectures();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");

  // add local functions, so that you can use these functions in other components
  useImperativeHandle(ref, () => ({
    openDialog: () => {
      openDialog();
    },
  }));

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const handleImportCalendar = () => {
    changeCourseByUrl(inputText);
    closeDialog();
  };

  return (
    <Dialog.Container
      onBackdropPress={closeDialog}
      contentStyle={{
        backgroundColor: colors.primary
      }}
      visible={showDialog}

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
        style={{
          color: colors.secondary,
        }}
        selectionColor={colors.accent}
        onChangeText={(newText: string) => setInputText(newText)}
      />
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
});

export default ImportCalendarDialog;
