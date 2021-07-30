import { createSlice } from "@reduxjs/toolkit";
import { signupAsync, loginAsync } from "./auth.service";
import { loggedIn } from "../../utils";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    loggedIn: loggedIn(),
    error: null
  },
  reducers: {
    logout: (state) => {
      removeToken();
      state.loggedIn = false;
      state.status = "idle";
    }
  },
  extraReducers: {
    [signupAsync.pending]: (state) => {
      state.status = "loading";
    },
    [signupAsync.fulfilled]: (state, action) => {
      const { token } = action.payload.token;
      if (token) {
        addTokenToStorage(token);
        state.loggedIn = true;
        state.status = "success";
      }
    },
    [signupAsync.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [loginAsync.pending]: (state) => {
      state.status = "loading";
    },
    [loginAsync.fulfilled]: (state, action) => {
      const token = action.payload.token;
      if (token) {
        addTokenToStorage(token);
        state.loggedIn = true;
        state.status = "success";
      }
    },
    [loginAsync.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    }
  }
});

export const { logout } = authSlice.actions;

export const selectAuth = (state) => state.auth;

const addTokenToStorage = (token) => {
  localStorage.setItem("twitter", JSON.stringify({ token: token }));
};

const removeToken = () => {
  localStorage.removeItem("twitter");
};

export default authSlice.reducer;
