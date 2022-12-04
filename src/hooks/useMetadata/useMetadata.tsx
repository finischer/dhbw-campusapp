import { useState } from "react";
import { darkModeColors, lightModeColors } from "../../constants/colors";

const useMetadata = () => {
  const [theme, setTheme] = useState<IThemeTypes>("light");

  const colors: IColors = theme === "light" ? lightModeColors : darkModeColors;

  return { theme, colors };
};

export default useMetadata;
