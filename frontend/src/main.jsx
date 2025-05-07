import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import { StateProvider } from "./context/StateContext";
import reducer, { initialState } from "./context/StateReducers.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </StrictMode>
);
