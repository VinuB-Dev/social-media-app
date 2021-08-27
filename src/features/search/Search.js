import styles from './search.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectConnection } from '../Explore/ExploreSlice'
import { getUsers } from '../Explore/Explore.service'
import { useNavigate } from 'react-router-dom'
import { selectFeed } from '../Feed/feedSlice'

export default function Search() {
  const [select, setSelect] = useState(0)
  const [search, setSearch] = useState('')
  const feed = useSelector(selectFeed)
  const feedUser = useSelector((state) => state.feed.user)
  const connection = useSelector(selectConnection)
  const searchStatus = useSelector((state) => state.connection.status)
  const users = useSelector((state) => state.connection.users)
  const dispatch = useDispatch()
  const searchHandler = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    dispatch(getUsers())
    console.log(users)
  }, [select, dispatch])

  const filterItems = (arr, query) => {
    return query
      ? arr.filter(
          (el) => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        )
      : []
  }
  const navigate = useNavigate()
  return (
    <div>
      <div className={styles.search}>
        <input
          className={styles.inputField}
          type='text'
          placeholder='Search Users'
          value={search}
          onChange={searchHandler}
          onFocus={() => {
            setSelect(1)
          }}
        />
        <button
          className={styles.searchBtn}
          onClick={() => {
            setSelect(!select)
          }}
        >
          <FontAwesomeIcon className='small-icon' icon={faSearch} />
        </button>
      </div>
      {filterItems(users, search).length !== 0 ? (
        <div className={styles.page}>
          <div
            className={styles.searchBox}
            style={{
              display: select && search ? 'block' : 'none',
            }}
          >
            {filterItems(users, search)
              ?.slice(0, 4)
              .map((user) => {
                return (
                  <div
                    className={styles.searchBar}
                    onClick={() => {
                      if (user._id === feedUser._id) {
                        navigate('/profile')
                      } else {
                        navigate('/profile/' + user._id)
                      }
                      setSelect(!select)
                      setSearch('')
                    }}
                  >
                    <div>
                      <img
                        className='profile-img'
                        src={user.profileImg}
                        alt=''
                      />
                    </div>
                    <div className='user-details'>
                      <div className='username'>{user.name}</div>
                      <div className='status'>@{user.tag}</div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      ) : (
        <div className={styles.page}>
          <div
            className={styles.searchBox}
            style={{
              display: select && search ? 'block' : 'none',
            }}
          >
            <div className={styles.notFoundBar}>
              <div>No users found</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
