import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import UIReducer from "@/redux/ui-slice";
import LayoutReducer from "@/redux/layout-slice";
import FormReducer from "@/redux/form-slice";

const reducers = combineReducers({
  UI: UIReducer,
  layout: LayoutReducer,
  form: FormReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["UI"],
};

const RootReducer = persistReducer(persistConfig, reducers);

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
