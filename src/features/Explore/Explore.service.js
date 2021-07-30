import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthToken } from "../../utils";

export const getConnectionAsync = createAsyncThunk(
  "connection/getUserSuggestions",
  async () => {
    const response = await axios.get(
      "https://twitter.bravesoldier.repl.co/connection",
      {
        headers: {
          Authorization: getAuthToken()
        }
      }
    );
    return response.data;
  }
);

export const getUsers = createAsyncThunk("connection/getUsers", async () => {
  const response = await axios.get(
    "https://twitter.bravesoldier.repl.co/connection/users",
    {
      headers: {
        Authorization: getAuthToken()
      }
    }
  );
  return response.data.users;
});

export const followAsync = createAsyncThunk("connection/follow", async (id) => {
  const response = await axios.post(
    "https://twitter.bravesoldier.repl.co/connection/follow",
    {
      userId: id
    },
    {
      headers: {
        Authorization: getAuthToken()
      }
    }
  );
  return response.data;
});

export const unfollowAsync = createAsyncThunk(
  "connection/unfollow",
  async (id) => {
    const response = await axios.post(
      "https://twitter.bravesoldier.repl.co/connection/unfollow",
      {
        userId: id
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
