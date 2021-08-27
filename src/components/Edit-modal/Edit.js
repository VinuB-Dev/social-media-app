import './Edit.css'
import { useState, useEffect } from 'react'
import { updateUserInfoAsync } from '../../features/Profile/Profile.service'
import { useDispatch, useSelector } from 'react-redux'
import { selectProfile } from '../../features/Profile/ProfileSlice'

export default function Edit({ user }) {
  const profile = useSelector(selectProfile)
  const profileUser = useSelector((state) => state.profile.user)
  const [modal, showModal] = useState(0)
  const [userData, setUserData] = useState({
    tag: profileUser.tag,
    about: profileUser.about,
    profileImg: profileUser.profileImg,
  })
  const dispatch = useDispatch()

  const submit = async (e) => {
    e.preventDefault()
    dispatch(updateUserInfoAsync(userData))
    showModal(!modal)
  }

  function onChangeHandler(e) {
    setUserData({
      ...userData,
      [e.currentTarget.id]: JSON.parse(JSON.stringify(e.currentTarget.value)),
    })
  }

  function uploadImage(e) {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onloadend = () => {
      setUserData({
        ...userData,
        profileImg: reader.result,
      })
    }
  }

  return (
    <div>
      <div
        class='modalBtnClick'
        onClick={() => {
          showModal(!modal)
        }}
      >
        Edit
      </div>
      <div
        class='modalOverlay'
        style={{ display: modal ? 'block' : 'none' }}
        onClick={() => {
          showModal(!modal)
        }}
      ></div>
      <div
        className='modal-desktop'
        style={{ display: modal ? 'block' : 'none' }}
      >
        <div>
          <div className='close-btn-edit' onClick={() => showModal(!modal)}>
            &times;
          </div>
          <div
            className='auth-container'
            style={{ color: 'black', fontSize: '15px' }}
          >
            <form className='auth-form' onSubmit={submit}>
              <h3>Edit Profile</h3>
              <label>Tag</label>
              <input
                id='tag'
                value={userData.tag}
                type='text'
                required
                placeholder='Change Tag'
                autoComplete='off'
                onChange={onChangeHandler}
              />
              <label>Bio</label>
              <input
                id='about'
                value={userData.about}
                type='text'
                required
                placeholder='Change Bio'
                autoComplete='off'
                onChange={onChangeHandler}
              />
              <label for='profileImg' class='upload-button'>
                Change profile image
              </label>
              <input id='profileImg' type='file' onChange={uploadImage} />
              <button type='submit' className='link_btn'>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
