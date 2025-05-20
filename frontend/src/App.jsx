import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routers/AppRoutes";
// import { ConfigProvider } from "antd";
const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
