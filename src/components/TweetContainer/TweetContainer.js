import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons'
import { useState, useEffect } from 'react'

import {
  likeButtonPressed,
  incrementLike,
  decrementLike,
  selectFeed,
  postReplyAsync,
  replyAdded,
  getFeedAsync,
} from '../../features/Feed/feedSlice'

import { getCurrentTweetsAsync } from '../../features/Profile/Profile.service'
import { useDispatch, useSelector } from 'react-redux'
import { selectProfile } from '../../features/Profile/ProfileSlice'

export default function TweetContainer({
  _id,
  user,
  content,
  contentImg,
  likedBy,
  comments,
}) {
  const [reply, setReply] = useState([])
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const feed = useSelector(selectFeed)
  const feedUser = useSelector((state) => state.feed.user)
  const feedStatus = useSelector((state) => state.feed.status)

  function replyHandler(e) {
    const fileList = e.target.value
    setComment(fileList)
  }

  function likedHandler(likedBy) {
    return likedBy.includes(feedUser._id)
  }

  async function handleReply(id, text) {
    if (text.length > 0) {
      await dispatch(postReplyAsync({ id, text }))
      dispatch(replyAdded({ tweetId: id, comment: text, user: feedUser }))
      setComment('')
    }
  }
  return (
    <div className='tweet' key={_id}>
      <div className='tweet-container'>
        <div className='happenning-btn'>
          <img className='profile-btn' src={user.profileImg} alt='' />
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
              id={_id}
              autofocus
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
                  <div className='tweet-container' key={comment._id}>
                    <div className='happenning-btn'>
                      <img
                        className='comment-btn'
                        src={comment.user.profileImg}
                        alt=''
                      />
                    </div>
                    <div className='reply-text font-s'>
                      <span className='bold'>{comment.user.name} </span>
                      <span className='diff-color'>@{comment.user.tag}</span>
                      <br />
                      <div className='less-font'>{comment.comment}</div>
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
