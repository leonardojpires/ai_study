import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import { AuthProvider } from "./hooks/auth/AuthProvider";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}