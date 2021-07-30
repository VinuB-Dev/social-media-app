import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import connectionReducer from "../features/Explore/ExploreSlice";
import feedReducer from "../features/Feed/feedSlice";
import profileReducer from "../features/Profile/ProfileSlice";

const combinedReducer = combineReducers({
  auth: authReducer,
  connection: connectionReducer,
  feed: feedReducer,
  profile: profileReducer
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer
});

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     connection: connectionReducer,
//     feed: feedReducer,
//     profile: profileReducer
//   }
// });
