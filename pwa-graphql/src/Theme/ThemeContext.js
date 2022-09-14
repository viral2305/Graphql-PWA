import { createContext } from "react";

export const themes = {
  isDarkTheme: false
};

export const ThemeContext = createContext({
  theme: themes.isDarkTheme,
  changeTheme: () => {},
});

