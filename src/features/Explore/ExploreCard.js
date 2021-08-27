import {
  getConnectionAsync,
  followAsync,
  unfollowAsync,
} from './Explore.service'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectConnection } from './ExploreSlice'
import { Loader } from '../../components/Loader/Loader'

export default function ExploreCard({ card_type }) {
  const dispatch = useDispatch()
  const connection = useSelector(selectConnection)
  const connectionStatus = useSelector((state) => state.connection.status)
  const Followers = useSelector((state) => state.connection.Followers)
  const Following = useSelector((state) => state.connection.Following)
  const [data, setData] = useState({
    Following: [],
    Followers: [],
  })
  const [change, setChange] = useState(0)

  useEffect(() => {
    if (connectionStatus === 'idle' || connectionStatus === 'loading') {
      dispatch(getConnectionAsync())
    }
    setData({
      Following: Following,
      Followers: Followers,
    })
  }, [connectionStatus, dispatch, change])

  function isFollowing(user) {
    return Object.values(Following).reduce((acc, following) => {
      return acc || following._id === user._id ? true : false
    }, false)
  }

  return (
    <div class='flex-menu-wrapped'>
      {connectionStatus === 'loading' && <Loader />}
      {connectionStatus === 'success' && (
        <div class='cards'>
          {data[card_type] === undefined ? (
            <div>Search and follow users</div>
          ) : (
            data[card_type]?.map((user) => {
              const { _id, profileImg, name, tag } = user
              return (
                <div key={_id} class='user-button'>
                  <div className='user-sugg-bar'>
                    <div>
                      <img className='profile-img' src={profileImg} alt='' />
                    </div>
                    <Link to={'/profile/' + _id} className='user-details'>
                      <div className='username'>{name}</div>
                      <div className='status'>@{tag}</div>
                    </Link>
                    <button
                      className='follow-btn'
                      onClick={() => {
                        if (!isFollowing(user)) {
                          dispatch(followAsync(_id))
                          setData({
                            ...data,
                            Following: data.Following.concat(user),
                          })
                          setChange(!change)
                        } else {
                          dispatch(unfollowAsync(_id))
                          setData({
                            ...data,
                            Following: data.Following.filter(
                              (item) => item._id !== user._id
                            ),
                          })
                          setChange(!change)
                        }
                      }}
                    >
                      {isFollowing(user) ? 'Unfollow' : '+ Follow'}
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
