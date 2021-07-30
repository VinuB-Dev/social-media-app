import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthToken } from "../../utils";

export const getCurrentTweetsAsync = createAsyncThunk(
  "feed/getTweets",
  async () => {
    const response = await axios.get(
      "https://Twitter.bravesoldier.repl.co/tweet/current",
      {
        headers: {
          Authorization: getAuthToken()
        }
      }
    );

    console.log(response.data);
    return response.data;
  }
);

export const getOthersProfileAsync = createAsyncThunk(
  "feed/getOtherTweets",
  async ({ userId }) => {
    const response = await axios.get(
      "https://Twitter.bravesoldier.repl.co/tweet/" + userId,
      {
        headers: {
          Authorization: getAuthToken()
        }
      }
    );
    return response.data;
  }
);

export const updateUserInfoAsync = createAsyncThunk(
  "feed/getOtherTweets",
  async (tag, about) => {
    const response = await axios.get(
      "https://Twitter.bravesoldier.repl.co/user/updateUserInfo/",
      {
        tag: tag,
        about: about
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
