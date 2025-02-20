import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./App.css";
import Routers from "./routes/Routers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store, { persistor } from "./stateManagement/store";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ToastContainer />
          <Routers />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
