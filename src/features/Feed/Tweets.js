import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart as full } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  postTweetAsync,
  getFeedAsync,
  likeButtonPressed,
  incrementLike
} from "./feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectFeed } from "../Feed/feedSlice";
import { Loader } from "../../components/Loader/Loader";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import "./Tweets.css";
export default function Tweets() {
  const [text, setText] = useState("");
  const [tweet1, setTweet] = useState(0);
  const dispatch = useDispatch();
  const [tweets, setTweets] = useState([]);
  const feed = useSelector(selectFeed);
  const feedStatus = useSelector((state) => state.feed.status);
  const feedTweets = useSelector((state) => state.feed.tweets);
  const feedUser = useSelector((state) => state.feed.user);

  useEffect(() => {
    if (feedStatus === "idle") dispatch(getFeedAsync());
    setTweets(feedTweets);
  }, [feedStatus]);

  useEffect(() => {
    setTweet(!tweet1);
  }, [tweets]);

  function textHandler(e) {
    const fileList = e.target.value;
    setText(fileList);
  }

  async function handleClick(text) {
    setTweet(1);
    if (text.length > 0) {
      await dispatch(postTweetAsync({ text }));
    }
  }

  return (
    <div className="centre-box" style={{ marginBottom: "10rem" }}>
      <div className="container-home">
        <div className="text-home">Home</div>
      </div>
      {feedStatus === "loading" && <Loader />}
      {feedStatus === "success" && (
        <div>
          <div className="happenning">
            <div className="happenning-btn">
              <img className="profile-btn" src={feedUser.profileImg} alt="" />
            </div>
            <div>
              <input
                type="text"
                placeholder="What's happenning"
                className="primary-txt"
                onChange={textHandler}
              />
            </div>
            <div class="post-btn-wrapper">
              <button
                className="post-btn"
                onClick={() => {
                  handleClick(text);
                }}
              >
                Post
              </button>
            </div>
          </div>
          <div className="blank"></div>
          {feedTweets?.map(({ _id, user, content, contentImg, likes }, i) => {
            return (
              <div className="tweet" key={_id}>
                <div className="tweet-container">
                  <div className="happenning-btn">
                    <img className="profile-btn" src={user.profileImg} alt="" />
                  </div>
                  <div className="tweet-text">
                    <span className="bold">{user.name} </span>
                    <span className="diff-color">@{user.tag}</span>
                    <br />
                    <div className="less-font">{content}</div>
                    {contentImg && (
                      <div>
                        <img src={contentImg} className="img-small" alt="" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="icons-container">
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        className="small-icon"
                        icon={faHeart}
                        onClick={() => {
                          dispatch(likeButtonPressed(_id));
                          dispatch(incrementLike(_id));
                        }}
                      />
                      {likes}
                    </li>
                    {/* <li>
                      <FontAwesomeIcon
                        className="small-icon"
                        icon={faComment}
                      />
                      127
                    </li> */}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
