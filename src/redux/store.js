import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./session/sessionSlice";
import userDataSlice from "./user/userDataSlice";
import dashboardSlice from "./dashboard/dashboardSlice";
import workstationsListSlice from "./workstationsListSlice/workstationsListSlice";

const rootReducer = combineReducers({
  session: sessionSlice,
  userData: userDataSlice,
  dashboard: dashboardSlice,
  workstationsList: workstationsListSlice
});

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
};
