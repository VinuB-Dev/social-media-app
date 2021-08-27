import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAuthToken } from '../../utils'

export const getCurrentTweetsAsync = createAsyncThunk(
  'feed/getTweets',
  async () => {
    const response = await axios.get(
      'https://Twitter.bravesoldier.repl.co/tweet/current',
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    )
    return response.data
  }
)

export const getOthersProfileAsync = createAsyncThunk(
  'feed/getOthersProfile',
  async ({ userId }) => {
    const response = await axios.get(
      'https://Twitter.bravesoldier.repl.co/tweet/' + userId,
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    )
    return response.data
  }
)

export const updateUserInfoAsync = createAsyncThunk(
  'feed/updateUserProfile',
  async ({ tag, about, profileImg }) => {
    const response = await axios.post(
      'https://Twitter.bravesoldier.repl.co/user/updateUserInfo/',
      {
        tag: tag,
        profileImg: profileImg,
        about: about,
      },
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    )
    return response.data
  }
)
