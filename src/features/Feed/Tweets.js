import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons'

import { useEffect, useState } from 'react'
import {
  postTweetAsync,
  getFeedAsync,
  likeButtonPressed,
  incrementLike,
  decrementLike,
  postReplyAsync,
  replyAdded,
} from './feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectFeed } from '../Feed/feedSlice'
import { Loader } from '../../components/Loader/Loader'

import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons'
import './Tweets.css'
export default function Tweets() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const feed = useSelector(selectFeed)
  const feedStatus = useSelector((state) => state.feed.status)
  const feedTweets = useSelector((state) => state.feed.tweets)
  const feedUser = useSelector((state) => state.feed.user)
  const [reply, setReply] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (feedStatus === 'idle' || feedStatus === 'loading')
      dispatch(getFeedAsync())
  }, [feedStatus])

  function textHandler(e) {
    const fileList = e.target.value
    setText(fileList)
  }

  function replyHandler(e) {
    const fileList = e.target.value
    setComment(fileList)
  }

  function likedHandler(likedBy) {
    return likedBy.includes(feedUser._id)
  }

  async function handleClick(text) {
    if (text.length > 0) {
      await dispatch(postTweetAsync({ text }))
    }
  }

  async function handleReply(id, text) {
    if (text.length > 0) {
      await dispatch(postReplyAsync({ id, text }))
      dispatch(replyAdded({ tweetId: id, comment: text, user: feedUser }))
      setComment('')
    }
  }

  return (
    <div className='centre-box' style={{ marginBottom: '10rem' }}>
      <div className='container-home'>
        <div className='text-home'>Home</div>
      </div>
      {feedStatus === 'loading' && <Loader />}
      {feedStatus === 'success' && (
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
              />
            </div>
            <div class='post-btn-wrapper'>
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
          {feedTweets?.map(
            ({ _id, user, content, contentImg, likedBy, comments }, i) => {
              return (
                <div className='tweet' key={_id}>
                  <div className='tweet-container'>
                    <div className='happenning-btn'>
                      <img
                        className='profile-btn'
                        src={user.profileImg}
                        alt=''
                      />
                    </div>
                    <div className='tweet-text'>
                      <span className='bold'>{user.name} </span>
                      <span className='diff-color'>@{user.tag}</span>
                      <br />
                      <div className='less-font'>{content}</div>
                      {contentImg && (
                        <div>
                          <img src={contentImg} className='img-small' alt='' />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='icons-container'>
                    <ul>
                      <li>
                        <FontAwesomeIcon
                          className='small-icon'
                          icon={likedHandler(likedBy) ? fullHeart : faHeart}
                          onClick={() => {
                            if (likedHandler(likedBy)) {
                              dispatch(
                                likeButtonPressed({
                                  tweetId: _id,
                                  userId: feedUser._id,
                                  state: false,
                                })
                              )
                              dispatch(decrementLike(_id))
                            } else {
                              dispatch(
                                likeButtonPressed({
                                  tweetId: _id,
                                  userId: feedUser._id,
                                  state: true,
                                })
                              )
                              dispatch(incrementLike(_id))
                            }
                          }}
                        />
                        {likedBy.length}
                      </li>
                      <li>
                        <FontAwesomeIcon
                          className='small-icon'
                          icon={faComment}
                          onClick={() => {
                            reply.includes(_id)
                              ? setReply(reply.filter((id) => id !== _id))
                              : setReply([...reply, _id])
                          }}
                        />
                        {comments.length}
                      </li>
                    </ul>
                    {reply.includes(_id) ? (
                      <div>
                        <input
                          type='text'
                          placeholder='Reply'
                          className='reply-txt'
                          onChange={replyHandler}
                          value={comment}
                        />
                        <button
                          className='reply-btn'
                          onClick={() => {
                            handleReply(_id, comment)
                          }}
                        >
                          reply
                        </button>
                        <div>
                          {comments?.map((comment) => {
                            return (
                              <div className='tweet-container full-border'>
                                <div className='happenning-btn'>
                                  <img
                                    className='comment-btn'
                                    src={comment.user.profileImg}
                                    alt=''
                                  />
                                </div>
                                <div className='reply-text font-s'>
                                  <span className='bold'>
                                    {comment.user.name}{' '}
                                  </span>
                                  <span className='diff-color'>
                                    @{comment.user.tag}
                                  </span>
                                  <br />
                                  <div className='less-font'>
                                    {comment.comment}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              )
            }
          )}
        </div>
      )}
    </div>
  )
}
