import styles from './Modal.module.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { postTweetAsync, getFeedAsync } from '../../features/Feed/feed.service'
import { useDispatch } from 'react-redux'

export default function Modal() {
  const [modal, showModal] = useState(0)
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const [current_user, setUser] = useState({})

  async function handleClick(text) {
    if (text.length > 0) {
      const response = await dispatch(postTweetAsync({ text }))
    }
  }

  function textHandler(e) {
    const fileList = e.target.value
    setText(fileList)
  }

  return (
    <div>
      <div
        className={styles.modalBtnClick}
        onClick={() => {
          showModal(!modal)
        }}
      >
        Post
      </div>
      <div
        className={styles.modalOverlay}
        style={{ display: modal ? 'block' : 'none' }}
        onClick={() => showModal(!modal)}
      ></div>
      <div
        className={styles.modalDesktop}
        style={{ display: modal ? 'block' : 'none' }}
      >
        <div className={styles.modalMain}>
          <div className={styles.happenningBtn}>
            <img
              className={styles.profileBtn}
              src={current_user['profileImg']}
              alt=''
            />
          </div>
          <div>
            <input
              type='text'
              placeholder="What's happenning"
              className={styles.primaryTxtModal}
              onChange={textHandler}
            />
            <div className={styles.closeBtn} onClick={() => showModal(!modal)}>
              &times;
            </div>
          </div>
          <div></div>
          <div className='icons-list'>
            <div className='button-list'>
              <ul>
                <li>
                  <button
                    className={styles.modalBtn}
                    onClick={() => {
                      handleClick(text)
                      showModal(!modal)
                    }}
                  >
                    Post
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
