import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthToken } from "../../utils";

export const getFeedAsync = createAsyncThunk("feed/getFeed", async () => {
  const response = await axios.get(
    "https://Twitter.bravesoldier.repl.co/tweet/",
    {
      headers: {
        Authorization: getAuthToken()
      }
    }
  );
  return response.data;
});

export const postTweetAsync = createAsyncThunk(
  "feed/postTweet",
  async ({ text, picture1 }) => {
    const response = await axios.post(
      "https://Twitter.bravesoldier.repl.co/tweet/postTweet",
      {
        content: text,
        image: picture1
      },
      {
        headers: {
          Authorization: getAuthToken()
        }
      }
    );
    return response.data;
  }
);

export const incrementLike = createAsyncThunk("feed/addlike", async (_id) => {
  const response = await axios.post(
    "https://Twitter.bravesoldier.repl.co/tweet/addlike",
    {
      tweetId: _id
    },
    {
      headers: {
        Authorization: getAuthToken()
      }
    }
  );
  return response.data, _id;
});

export const decrementLike = createAsyncThunk(
  "feed/removelike",
  async (_id) => {
    const response = await axios.post(
      "https://Twitter.bravesoldier.repl.co/tweet/unlike",
      {
        tweetId: _id
      },
      {
        headers: {
          Authorization: getAuthToken()
        }
      }
    );
    return response.data, _id;
  }
);

export const feedSlice = createSlice({
  name: "feed",
  initialState: {
    tweets: [],
    user: {},
    status: "idle",
    error: null
  },
  reducers: {
    likeButtonPressed: (state, action) => {
      const tweetIndex = state.tweets.findIndex(
        (tweet) => tweet._id === action.payload
      );
      state.tweets[tweetIndex].likes += 1;
    }
  },
  extraReducers: {
    [getFeedAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getFeedAsync.fulfilled]: (state, action) => {
      state.tweets = action.payload.tweets;
      state.user = action.payload.user;
      state.status = "success";
    },
    [getFeedAsync.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [postTweetAsync.pending]: (state) => {
      state.status = "loading";
    },
    [postTweetAsync.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [postTweetAsync.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [incrementLike.pending]: (state) => {
      state.status = "loading";
    },
    [incrementLike.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [incrementLike.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    }
  }
});
export const { likeButtonPressed } = feedSlice.actions;
export const selectFeed = (state) => state.feed.value;

export default feedSlice.reducer;
