import { useState } from "react";
import { darkModeColors, lightModeColors } from "../../constants/colors";
import { IColors } from "../../constants/colors/colors.types";

const useMetadata = () => {
  const [theme, setTheme] = useState<IThemeTypes>("dark");

  const colors: IColors = theme === "light" ? lightModeColors : darkModeColors;

  return { theme, colors };
};

export default useMetadata;
