import React, { useState, useEffect } from "react";

const useDarkmode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // get current mode in settings (saved in localStorage)
    // if setting == system
    // if system-mode == dark
    // darkMode = true
    // else
    // darkMode = false
    // else
    // setting-mode == dark
    // darkMode = true
    // else
    // darkMode = false
  }, []);

  return { darkMode };
};

export default useDarkmode;
