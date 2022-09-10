import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import UIReducer from "@/redux/ui-slice";
import FormReducer from "@/redux/form-slice";
import LayoutReducer from "@/redux/layout-slice";
import UserReducer from "@/redux/user-slice";

const reducers = combineReducers({
  UI: UIReducer,
  form: FormReducer,
  layout: LayoutReducer,
  user: UserReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["UI"],
};

const RootReducer = persistReducer(persistConfig, reducers);

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
