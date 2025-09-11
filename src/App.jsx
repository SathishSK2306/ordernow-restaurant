// app.jsx
import "./App.css";
import AppRouter from "./router";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />

      <AppRouter />
    </>
  );
}

export default App;
