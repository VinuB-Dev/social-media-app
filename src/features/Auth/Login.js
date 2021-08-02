import './login.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { RiLoginBoxFill } from 'react-icons/ri'
import { useState } from 'react'
import { loginAsync } from './auth.service'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '../Auth/authSlice'
import { Loader } from '../../components/Loader/Loader'
export default function Login() {
  let from = ''
  const navigate = useNavigate()
  const { state } = useLocation()
  from = state?.from
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })
  const dispatch = useDispatch()
  const auth = useSelector(selectAuth)
  const authStatus = useSelector((state) => state.auth.status)
  const error = useSelector((state) => state.auth.error)

  const submit = async (e) => {
    e.preventDefault()
    const response = await dispatch(
      loginAsync({
        email: userData['email'],
        password: userData['password'],
      })
    )
    if (response.payload?.success) {
      navigate(from || '/')
    }
  }

  function onChangeHandler(e) {
    setUserData({
      ...userData,
      [e.target.id]: JSON.parse(JSON.stringify(e.target.value)),
    })
  }

  return (
    <div>
      {authStatus === 'loading' && <Loader />}
      {(authStatus === 'idle' || authStatus === 'failed') && (
        <div className='auth-container'>
          <form
            className='auth-form'
            onSubmit={submit}
            style={{ color: 'black', fontSize: '15px' }}
          >
            <div style={{ margin: 'auto', color: 'red', marginBottom: '1rem' }}>
              {authStatus === 'failed'
                ? error === 'Request failed with status code 401'
                  ? 'Username or Password Wrong'
                  : 'Please Signup'
                : ''}
            </div>
            <h3>Login</h3>
            <label>Email</label>
            <input
              id='email'
              type='email'
              value={userData.email}
              required
              placeholder='Enter Email'
              autoComplete='off'
              onChange={onChangeHandler}
            />
            <label>Password</label>
            <input
              id='password'
              value={userData.password}
              type='password'
              required
              placeholder='Enter Password'
              onChange={onChangeHandler}
            />
            <button type='submit' className='link_btn'>
              <RiLoginBoxFill />
              {authStatus === 'loading' ? 'loading' : 'Login'}
            </button>
            <div className='signup'>
              Not a user?{' '}
              <Link to='/signup' className='primary_link'>
                Signup
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
