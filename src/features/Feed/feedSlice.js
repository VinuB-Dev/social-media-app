import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAuthToken } from '../../utils'

export const getFeedAsync = createAsyncThunk('feed/getFeed', async () => {
  const response = await axios.get(
    'https://Twitter.bravesoldier.repl.co/tweet/',
    {
      headers: {
        Authorization: getAuthToken(),
      },
    }
  )
  return response.data
})

export const postTweetAsync = createAsyncThunk(
  'feed/postTweet',
  async ({ text, picture1 }) => {
    const response = await axios.post(
      'https://Twitter.bravesoldier.repl.co/tweet/postTweet',
      {
        content: text,
        image: picture1,
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

export const incrementLike = createAsyncThunk('feed/addlike', async (_id) => {
  const response = await axios.post(
    'https://Twitter.bravesoldier.repl.co/tweet/addlike',
    {
      tweetId: _id,
    },
    {
      headers: {
        Authorization: getAuthToken(),
      },
    }
  )
  return response.data, _id
})

export const decrementLike = createAsyncThunk(
  'feed/removelike',
  async (_id) => {
    const response = await axios.post(
      'https://Twitter.bravesoldier.repl.co/tweet/removelike',
      {
        tweetId: _id,
      },
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    )
    return response.data, _id
  }
)

export const postReplyAsync = createAsyncThunk(
  'feed/addComment',
  async ({ id, text }) => {
    const response = await axios.post(
      'https://Twitter.bravesoldier.repl.co/tweet/addComment',
      {
        tweetId: id,
        comment: text,
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

export const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    tweets: [],
    user: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    likeButtonPressed: (state, action) => {
      const tweetIndex = state.tweets.findIndex(
        (tweet) => tweet._id === action.payload.tweetId
      )
      action.payload.state
        ? state.tweets[tweetIndex].likedBy.push(action.payload.userId)
        : state.tweets[tweetIndex].likedBy.pop(action.payload.userId)
    },
    replyAdded: (state, action) => {
      const tweetIndex = state.tweets.findIndex(
        (tweet) => tweet._id === action.payload.tweetId
      )
      state.tweets[tweetIndex].comments.push({
        _id: '1',
        comment: action.payload.comment,
        user: action.payload.user,
      })
    },
  },
  extraReducers: {
    [getFeedAsync.pending]: (state) => {
      state.status = 'loading'
    },
    [getFeedAsync.fulfilled]: (state, action) => {
      state.tweets = action.payload.tweets
      state.user = action.payload.user
      state.status = 'success'
    },
    [getFeedAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [postTweetAsync.pending]: (state) => {
      state.status = 'loading'
    },
    [postTweetAsync.fulfilled]: (state, action) => {
      state.status = 'success'
    },
    [postTweetAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [incrementLike.fulfilled]: (state, action) => {
      state.status = 'success'
    },
    [incrementLike.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [decrementLike.fulfilled]: (state, action) => {
      state.status = 'success'
    },
    [decrementLike.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [postReplyAsync.fulfilled]: (state, action) => {
      state.status = 'success'
    },
    [postReplyAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})
export const { likeButtonPressed, replyAdded } = feedSlice.actions
export const selectFeed = (state) => state.feed.value

export default feedSlice.reducer
