import ComponentContainer from '../../components/component_container/component_container'
import './Profile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { getOthersProfileAsync } from './Profile.service'
import { followAsync, unfollowAsync } from '../Explore/Explore.service'
import { selectConnection } from '../Explore/ExploreSlice'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { selectProfile } from './ProfileSlice'
export default function OtherProfile() {
  const dispatch = useDispatch()
  const [data, setData] = useState({
    Following: [],
    Followers: [],
  })
  const profile = useSelector(selectProfile)
  const profileStatus = useSelector((state) => state.profile.status)
  const profileUser = useSelector((state) => state.profile.user)
  const Followers = useSelector((state) => state.profile.followers)
  const Following = useSelector((state) => state.profile.following)
  const profileTweets = useSelector((state) => state.profile.otherTweets)
  const connection = useSelector(selectConnection)
  const UserFollowing = useSelector((state) => state.connection.Following)
  const userId = useParams()

  useEffect(() => {
    dispatch(getOthersProfileAsync(userId))
    setData({
      Following: Followers,
      Followers: Following,
    })
  }, [userId])

  function isFollowing(user) {
    return Object.values(UserFollowing ? UserFollowing : '').reduce(
      (acc, following) => {
        return acc || following._id === user._id ? true : false
      },
      false
    )
  }
  return (
    <div class='profile'>
      {console.log(profileUser)}
      <ComponentContainer>
        <div class='profile-page'>
          <div className='background-overlay'>
            <img
              className='profile-img-large'
              src={profileUser.profileImg}
              alt=''
            />
          </div>
          <div className='mr-t'>
            <span className='bold'>{profileUser.name} </span>
            <span className='diff-color'>@{profileUser.tag}</span>
          </div>
          <div
            className='follow-profile'
            onClick={() => {
              if (!isFollowing(profileUser)) {
                dispatch(followAsync(profileUser._id))
              } else {
                dispatch(unfollowAsync(profileUser._id))
              }
            }}
          >
            {isFollowing(profileUser) ? 'Unfollow' : '+Follow'}
          </div>
          <br />

          <div className='about'>
            <div className='dashboard-flex'>
              <div>
                <div>Followers</div>
                <div>{Followers?.length}</div>
              </div>
              <div>
                <div>Following</div>
                <div>{Following?.length}</div>
              </div>
              <div>
                <div>Posts</div>
                <div>{profileTweets?.length}</div>
              </div>
            </div>
            <br />
            <div className='about'>
              <span className='heading'>Bio</span>
              <div className='about-text'>{profileUser.about}</div>
            </div>
          </div>
        </div>
        <div className='about'>
          <div className='heading'>{profileUser.name}'s posts</div>
        </div>
        {profileTweets.map(({ content, contentImg, likes }) => {
          return (
            <div class='tweet'>
              <div class='tweet-container'>
                <div class='happenning-btn'>
                  <img
                    class='profile-btn'
                    src={profileUser.profileImg}
                    alt=''
                  />
                </div>
                <div class='tweet-text'>
                  <span class='bold'>{profileUser.name} </span>
                  <span class='diff-color'>@{profileUser.tag}</span>
                  <br />
                  <div class='less-font'>{content}</div>
                  {contentImg && (
                    <div>
                      <img src={contentImg} class='img-small' alt='' />
                    </div>
                  )}
                </div>
              </div>
              <div class='icons-container'>
                <ul>
                  <li>
                    <FontAwesomeIcon className='small-icon' icon={faHeart} />
                    {likes}
                  </li>
                </ul>
              </div>
            </div>
          )
        })}
      </ComponentContainer>
    </div>
  )
}
