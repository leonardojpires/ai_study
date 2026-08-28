import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import { ToastProvider } from "./components/ToastProvider";
import { AuthProvider } from "./hooks/auth/AuthProvider";
import { ThemeProvider } from "./hooks/theme/ThemeProvider";

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
