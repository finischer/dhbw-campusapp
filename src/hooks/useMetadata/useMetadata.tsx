import React, { useState } from "react";
import { IThemeTypes } from "./types/IThemeTypes";

const useMetadata = () => {
  const [theme, setTheme] = useState<IThemeTypes>("light");

  return { theme };
};

export default useMetadata;
