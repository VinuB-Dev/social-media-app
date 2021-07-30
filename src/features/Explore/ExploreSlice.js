import { createSlice } from "@reduxjs/toolkit";
import {
  getConnectionAsync,
  getUsers,
  followAsync,
  unfollowAsync
} from "./Explore.service";

export const connectionSlice = createSlice({
  name: "connection",
  initialState: {
    Followers: [],
    Following: [],
    users: [],
    status: "idle"
  },
  reducers: {
    resetConnection: (state) => {
      return state.initialState;
    }
  },
  extraReducers: {
    [getConnectionAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getConnectionAsync.fulfilled]: (state, action) => {
      state.Followers = action.payload.followers?.followers;
      state.Following = action.payload.following?.following;
      state.status = "success";
    },
    [followAsync.pending]: (state) => {
      state.status = "loading";
    },
    [followAsync.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "success";
      }
    },
    [unfollowAsync.pending]: (state) => {
      state.status = "loading";
    },
    [unfollowAsync.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [getUsers.pending]: (state) => {
      state.status = "loading";
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.status = "idle";
    }
  }
});

export const { resetConnection } = connectionSlice.actions;

export const selectConnection = (state) => state.connection;

export default connectionSlice.reducer;
