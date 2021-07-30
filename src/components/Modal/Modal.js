import styles from "./Modal.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { postTweetAsync, getFeedAsync } from "../../features/Feed/feed.service";
import { useDispatch } from "react-redux";

export default function Modal() {
  const [modal, showModal] = useState(0);
  const [picture, showPicture] = useState();
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const [tweet1, setTweet] = useState(0);
  useEffect(() => {
    setTweet(0);
  }, [tweet1]);

  const [current_user, setUser] = useState({});

  async function handleClick(text, picture1) {
    setTweet(1);
    if (text.length > 0) {
      const tweet = {
        content: text,
        contentImg: picture1,
        user: current_user,
        likes: 0
      };
      const response = await dispatch(postTweetAsync({ text, picture1 }));
      console.log(response);
    }
  }

  function textHandler(e) {
    const fileList = e.target.value;
    setText(fileList);
    console.log(text);
  }

  return (
    <div>
      <div
        class={styles.modalBtnClick}
        onClick={() => {
          showModal(!modal);
        }}
      >
        Post
      </div>
      <div
        class={styles.modalOverlay}
        style={{ display: modal ? "block" : "none" }}
      ></div>
      <div
        className={styles.modalDesktop}
        style={{ display: modal ? "block" : "none" }}
      >
        <div class={styles.modalMain}>
          <div class={styles.happenningBtn}>
            <img
              class={styles.profileBtn}
              src={current_user["profileImg"]}
              alt=""
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="What's happenning"
              class={styles.primaryTxtModal}
              onChange={textHandler}
            />
            <div className={styles.closeBtn} onClick={() => showModal(!modal)}>
              &times;
            </div>
          </div>
          <div></div>
          <div class="icons-list">
            <div class="button-list">
              <ul>
                <li>
                  <button
                    class={styles.modalBtn}
                    onClick={() => {
                      handleClick(text, picture);
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
  );
}
