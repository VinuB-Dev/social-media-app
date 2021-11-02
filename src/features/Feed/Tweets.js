import { useEffect, useState } from 'react'
import { postTweetAsync, getFeedAsync } from './feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectFeed } from '../Feed/feedSlice'
import { Loader } from '../../components/Loader/Loader'

import './Tweets.css'
import TweetContainer from '../../components/TweetContainer/TweetContainer'
export default function Tweets() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const feed = useSelector(selectFeed)
  const feedStatus = useSelector((state) => state.feed.status)
  const feedTweets = useSelector((state) => state.feed.tweets)
  const feedUser = useSelector((state) => state.feed.user)

  useEffect(() => {
    if (feedStatus === 'idle' || feedStatus === 'loading')
      dispatch(getFeedAsync())
  }, [feedStatus])

  function textHandler(e) {
    const fileList = e.target.value
    setText(fileList)
  }

  async function handleClick(text) {
    if (text.length > 0) {
      await dispatch(postTweetAsync({ text }))
      setText('')
    }
  }
  feedTweets.slice().sort((a, b) => b.createdAt - a.createdAt)

  return (
    <div className='centre-box' style={{ marginBottom: '10rem' }}>
      <div className='container-home'>
        <div className='text-home'>Home</div>
      </div>
      <div>
        <div className='happenning'>
          <div className='happenning-btn'>
            <img className='profile-btn' src={feedUser.profileImg} alt='' />
          </div>
          <div>
            <input
              type='text'
              placeholder="What's happenning"
              className='primary-txt'
              onChange={textHandler}
              value={text}
            />
          </div>
          <div className='post-btn-wrapper'>
            <button
              className='post-btn'
              onClick={() => {
                handleClick(text)
              }}
            >
              Post
            </button>
          </div>
        </div>
        <div className='blank'></div>
        {feedStatus === 'loading' && <Loader />}
        {feedStatus === 'success' && feedTweets.length !== 0 ? (
          feedTweets.map(
            ({ _id, user, content, contentImg, likedBy, comments }, i) => {
              return (
                <TweetContainer
                  _id={_id}
                  user={user}
                  content={content}
                  contentImg={contentImg}
                  likedBy={likedBy}
                  comments={comments}
                />
              )
            }
          )
        ) : feedStatus === 'success' && feedTweets.length === 0 ? (
          <div>
            <div className='no-tweets'>No posts found</div>
            <div className='no-tweets'>Just registered ? Post it !!</div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
