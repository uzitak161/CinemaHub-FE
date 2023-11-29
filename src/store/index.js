import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../Login/reducer";
const store = configureStore({
  reducer: {
    accountReducer,
  },
});
export default store;
