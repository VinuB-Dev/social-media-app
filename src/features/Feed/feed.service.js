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
  async ({ text }) => {
    const response = await axios.post(
      "https://Twitter.bravesoldier.repl.co/tweet/postTweet",
      {
        content: text
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
