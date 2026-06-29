export type Theme = "blue" | "green" | "purple" | "orange" | "red" | "pink";

export type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
