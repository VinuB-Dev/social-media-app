import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signupAsync = createAsyncThunk(
  "auth/signUpUser",
  async ({ name, tag, email, password }) => {
    const response = await axios.post(
      "https://Twitter.bravesoldier.repl.co/auth/signup",
      {
        name: name,
        tag: tag,
        email: email,
        password: password
      }
    );

    return response.data;
  }
);

export const loginAsync = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const response = await axios.post(
      "https://Twitter.bravesoldier.repl.co/auth/login",
      {
        email: email,
        password: password
      }
    );
    return response.data;
  }
);
