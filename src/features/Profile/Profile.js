import ComponentContainer from '../../components/component_container/component_container'
import './Profile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentTweetsAsync } from './Profile.service'
import { useEffect, useState } from 'react'
import Edit from '../../components/Edit-modal/Edit'
import { selectProfile } from './ProfileSlice'
import { selectConnection } from '../Explore/ExploreSlice'
import { getConnectionAsync } from '../Explore/Explore.service'
import { Loader } from '../../components/Loader/Loader'

export default function Profile() {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(0)
  const profile = useSelector(selectProfile)
  const profileStatus = useSelector((state) => state.profile.status)
  const profileTweets = useSelector((state) => state.profile.tweets)
  const profileUser = useSelector((state) => state.profile.user)
  const connection = useSelector(selectConnection)
  const connectionStatus = useSelector((state) => state.connection.status)
  const Followers = useSelector((state) => state.connection.Followers)
  const Following = useSelector((state) => state.connection.Following)
  const [reply, setReply] = useState([])

  useEffect(() => {
    if (profileStatus === 'idle' || profileStatus === 'done')
      dispatch(getCurrentTweetsAsync())
    if (connectionStatus === 'idle' || connectionStatus === 'loading')
      dispatch(getConnectionAsync())
  }, [dispatch, profileStatus, connectionStatus, Followers, Following])

  return (
    <div class='profile'>
      {profileStatus === 'loading' && <Loader />}
      {profileStatus === 'success' && (
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
          {profileTweets
            ?.slice(0)
            .reverse()
            .map(({ content, contentImg, likedBy, comments }) => {
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
                        <FontAwesomeIcon className='icon' icon={faHeart} />
                        {likedBy.length}
                      </li>
                      <li>
                        <FontAwesomeIcon className='icon' icon={faComment} />
                        {comments.length}
                      </li>
                    </ul>
                  </div>
                </div>
              )
            })}
        </ComponentContainer>
      )}
    </div>
  )
}
