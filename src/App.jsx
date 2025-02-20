import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./App.css";
import Routers from "./routes/Routers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import { Provider } from "react-redux";
// import store from "./stateManagement/Store";

const App = () => {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <ToastContainer />
      <Routers />
    </BrowserRouter>
    // </Provider>
  );
};

export default App;
