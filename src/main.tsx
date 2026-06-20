import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/colors.css";
import App from "./App.tsx";
import { ExerciseProvider } from "./shared/contexts/exerciseContext/context/ExerciseContext.tsx";
import { LanguageProvider } from "./shared/contexts/languageContext/context/ContextProvider";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { ThemeProvider } from "./shared/contexts/themeContext/context/ContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <ExerciseProvider>
            <App />
          </ExerciseProvider>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
