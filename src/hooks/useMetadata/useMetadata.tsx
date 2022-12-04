import { useState } from "react";
import { darkModeColors, lightModeColors } from "../../styles/colors";
import { IColors } from "../../styles/colors.types";
import { IThemeTypes } from "./types/IThemeTypes";

const useMetadata = () => {
  const [theme, setTheme] = useState<IThemeTypes>("light");

  const colors: IColors = theme === "light" ? lightModeColors : darkModeColors;

  return { theme, colors };
};

export default useMetadata;
