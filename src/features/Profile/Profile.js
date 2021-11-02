import ComponentContainer from '../../components/component_container/component_container'
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentTweetsAsync } from './Profile.service'
import { useEffect, useState } from 'react'
import Edit from '../../components/Edit-modal/Edit'
import { selectProfile } from './ProfileSlice'
import { selectConnection } from '../Explore/ExploreSlice'
import { getConnectionAsync } from '../Explore/Explore.service'
import { Loader } from '../../components/Loader/Loader'
import TweetContainer from '../../components/TweetContainer/TweetContainer'
import { selectFeed } from '../Feed/feedSlice'

export default function Profile() {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(0)
  const profile = useSelector(selectProfile)
  const profileStatus = useSelector((state) => state.profile.status)
  const profileUser = useSelector((state) => state.profile.user)
  const connection = useSelector(selectConnection)
  const feed = useSelector(selectFeed)
  const feedStatus = useSelector((state) => state.feed.status)
  const profileTweets = useSelector((state) => state.feed.tweets).filter(
    (tweet) => tweet.user._id === profileUser._id
  )
  const connectionStatus = useSelector((state) => state.connection.status)
  const Followers = useSelector((state) => state.connection.Followers)
  const Following = useSelector((state) => state.connection.Following)
  useEffect(() => {
    if (
      profileStatus === 'idle' ||
      profileStatus === 'done' ||
      feedStatus === 'idle' ||
      feedStatus === 'loading'
    )
      dispatch(getCurrentTweetsAsync())
    if (connectionStatus === 'idle' || connectionStatus === 'loading')
      dispatch(getConnectionAsync())
  }, [dispatch, profileStatus, connectionStatus, Followers, Following])

  return (
    <div className='profile'>
      {profileStatus === 'loading' && <Loader />}
      {profileStatus === 'success' && (
        <ComponentContainer>
          <div className='profile-page'>
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
              disabled
              className='edit-profile'
              onClick={() => setModal(!modal)}
            >
              <Edit user={profileUser} />
            </div>

            <br />
          </div>
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
            {profileUser.about ? (
              <div className='about'>
                <span className='heading'>Bio</span>
                <div className='about-text'>{profileUser.about}</div>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='about'>
            <div className='heading'>Your Posts</div>
          </div>
          {console.log(profileTweets)}
          {profileTweets
            ?.slice(0)
            .map(({ _id, user, content, contentImg, likedBy, comments }) => {
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
            })}
        </ComponentContainer>
      )}
    </div>
  )
}
