import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentTweetsAsync,
  getOthersProfileAsync,
  updateUserInfoAsync
} from "./Profile.service";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    tweets: [],
    otherTweets: [],
    user: {},
    followers: [],
    following: [],
    status: "idle"
  },
  reducers: {
    resetFeed: (state) => {
      return state.initialState;
    }
  },
  extraReducers: {
    [getCurrentTweetsAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getCurrentTweetsAsync.fulfilled]: (state, action) => {
      state.tweets = action.payload.tweets;
      state.user = action.payload.user;
      state.followers = action.payload.followers?.followers;
      state.following = action.payload.following?.following;
      state.status = "success";
    },
    [getOthersProfileAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getOthersProfileAsync.fulfilled]: (state, action) => {
      state.otherTweets = action.payload.tweets;
      state.user = action.payload.user;
      state.followers = action.payload.followers?.followers;
      state.following = action.payload.following?.following;
      state.status = "success";
    },
    [updateUserInfoAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateUserInfoAsync.fulfilled]: (state, action) => {
      state.status = "success";
    }
  }
});

export const { resetProfile } = profileSlice.actions;

export const selectProfile = (state) => state.profile;

export default profileSlice.reducer;
