import "./RecommendationBar.css";
import { getRecomendationAsync, followAsync } from "../Explore/Explore.service";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectAuth } from "../Auth/authSlice";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

export default function RecommendationBar() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      if (auth.isLoggedIn) {
        const response = await dispatch(getRecomendationAsync());
        setData(response.payload.suggestions);
      } else {
        setData([]);
      }
    })();
  }, [auth.isLoggedIn]);

  return (
    <div className="last-box">
      <div className="recobar">
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          Suggestions
        </div>
        {data.map((user) => {
          return (
            <div className="sugg-bar">
              <div>
                <img className="profile-img" src={user.profileImg} alt="" />
              </div>
              <div
                onClick={() => {
                  navigate("/profile/" + user._id);
                }}
                className="user-details"
              >
                <div className="username">{user.name}</div>
                <div className="status">@{user.tag}</div>
              </div>
              <button
                className="follow-btn"
                onClick={async () => {
                  const response = await dispatch(followAsync(user._id));
                  setData(data.filter((item) => item._id !== user._id));
                  console.log(response);
                }}
              >
                + Follow
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
