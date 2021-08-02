import './signup.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { RiLoginBoxFill } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { signupAsync } from './auth.service'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '../Auth/authSlice'
import { Loader } from '../../components/Loader/Loader'
export default function Login() {
  let from = ''
  const navigate = useNavigate()
  const { state } = useLocation()
  from = state?.from
  const auth = useSelector(selectAuth)
  const authStatus = useSelector((state) => state.auth.status)
  const error1 = useSelector((state) => state.auth.error)

  const [userData, setUserData] = useState({
    name: '',
    tag: '',
    email: '',
    password: '',
    'confirm password': '',
  })

  const [confirmpasswordValid, updateConfirmPasswordValid] = useState(true)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    setError(!confirmpasswordValid)
  }, [confirmpasswordValid])

  const submit = async (e) => {
    e.preventDefault()
    updateConfirmPasswordValid(
      userData['confirm password'] === userData['password']
    )
    if (!error) {
      const response = await dispatch(
        signupAsync({
          name: userData['name'],
          tag: userData['tag'],
          email: userData['email'],
          password: userData['password'],
        })
      )
      if (response.payload?.success) {
        navigate('/')
      } else {
        console.log(response.error)
      }
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
        <div
          className='auth-container'
          style={{ color: 'black', fontSize: '15px' }}
        >
          <form className='auth-form' onSubmit={submit}>
            <div style={{ margin: 'auto', color: 'red', marginBottom: '1rem' }}>
              {authStatus === 'failed'
                ? error1 === 'Request failed with status code 409'
                  ? 'User already Exists'
                  : ''
                : ''}
            </div>
            <h3>Signup</h3>
            <h3
              style={{
                display: confirmpasswordValid ? 'none' : 'block',
                color: 'red',
              }}
            >
              Password dont match
            </h3>
            <label>Name</label>
            <input
              id='name'
              value={userData.name}
              type='text'
              required
              placeholder='Enter Name'
              autoComplete='off'
              onChange={onChangeHandler}
            />
            <label>Tag</label>
            <input
              id='tag'
              value={userData.tag}
              type='text'
              required
              placeholder='Enter your tag'
              autoComplete='off'
              onChange={onChangeHandler}
            />
            <label>Email</label>
            <input
              id='email'
              value={userData.email}
              type='email'
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
            <label>Confirm Password</label>
            <input
              id='confirm password'
              value={userData['confirm password']}
              type='password'
              required
              placeholder='Enter Password'
              onChange={onChangeHandler}
            />
            <button type='submit' className='link_btn'>
              <RiLoginBoxFill />
              Signup
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
