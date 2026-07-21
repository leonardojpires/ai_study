import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import { ToastProvider } from "./components/ToastProvider";
import { AuthProvider } from "./hooks/auth/AuthProvider";

export function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
