import styles from "./search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectConnection } from "../Explore/ExploreSlice";
import { getUsers } from "../Explore/Explore.service";
import { useNavigate } from "react-router-dom";
import { selectFeed } from "../Feed/feedSlice";

export default function Search() {
  const [select, setSelect] = useState(0);
  const [search, setSearch] = useState("");
  const feed = useSelector(selectFeed);
  const feedUser = useSelector((state) => state.feed.user);
  const connection = useSelector(selectConnection);
  const searchStatus = useSelector((state) => state.connection.status);
  const users = useSelector((state) => state.connection.users);
  const dispatch = useDispatch();
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    dispatch(getUsers());
  }, [select, dispatch]);

  const filterItems = (arr, query) => {
    return arr.filter(
      (el) => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  };
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.search}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Search Users"
          value={search}
          onChange={searchHandler}
        />
        <button
          className={styles.searchBtn}
          onClick={() => {
            setSelect(!select);
          }}
        >
          <FontAwesomeIcon className="small-icon" icon={faSearch} />
        </button>
      </div>
      <div className={styles.page}>
        <div
          className={styles.searchBox}
          style={{ display: select ? "block" : "none" }}
        >
          {filterItems(users, search).map((user) => {
            return (
              <div className="sugg-bar">
                <div>
                  <img className="profile-img" src={user.profileImg} alt="" />
                </div>
                <div
                  onClick={() => {
                    if (user._id === feedUser._id) {
                      navigate("/profile");
                    } else {
                      navigate("/profile/" + user._id);
                    }
                  }}
                  className="user-details"
                >
                  <div className="username">{user.name}</div>
                  <div className="status">@{user.tag}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
