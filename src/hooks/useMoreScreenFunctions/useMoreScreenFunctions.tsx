import { useTranslation } from "react-i18next";
import useAlert from "../useAlert";
import { useLectures } from "../useLectures";

export const useMoreScreenFunctions = () => {
  const { t } = useTranslation();
  const { changeCourseByUrl, icalUrl } = useLectures();
  const { prompt } = useAlert();

  const importCalendar = () => {
    const promptMessage = t("moreScreen:importCalendarPromptMessage");
    const buttonText = t("moreScreen:importCalendar");

    prompt(
      "iCal Link",
      promptMessage,
      buttonText,
      (newLink: string) => changeCourseByUrl(newLink),
      undefined,
      icalUrl
    );
  };

  return { importCalendar };
};
