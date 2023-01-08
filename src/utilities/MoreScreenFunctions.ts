import { useTranslation } from "react-i18next";
import useAlert from "../hooks/useAlert";
import { useLectures } from "../hooks/useLectures";

export const moreScreenFunctions = () => {
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
