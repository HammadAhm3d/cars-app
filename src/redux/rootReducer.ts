import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import carsReducer from "./slices/cars";

const rootReducer = combineReducers({
  auth: authReducer,
  cars: carsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
