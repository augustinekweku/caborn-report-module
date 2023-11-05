"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import reportModuleReducer from "./report-module-reducer";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistAuthStoreConfig = {
  key: "auth",
  storage,
};

const persistReportModuleStoreConfig = {
  key: "reportModule",
  storage,
};

const rootReducer = combineReducers({
  reportModule: persistReducer(
    persistReportModuleStoreConfig,
    reportModuleReducer
  ),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
