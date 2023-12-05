import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Login/reducer";
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default store;
