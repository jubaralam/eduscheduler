import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// const store = configureStore({ reducer: userReducer });

// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
