import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { selectAuth, logout } from "../Auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../components/Modal/Modal";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div class="navbar">
      <ul>
        <li>
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            <FontAwesomeIcon className="blue" icon={faHome} />
            <span class="icon-text">Home</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              navigate("/profile");
            }}
          >
            <FontAwesomeIcon className="blue" icon={faUser} />
            <span class="icon-text">Profile</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              navigate("/explore");
            }}
          >
            <FontAwesomeIcon className="blue" icon={faHashtag} />
            <span class="icon-text">Explore</span>
          </div>
        </li>
        <Modal />
        <li>
          <div onClick={logoutHandler} class="logout-btn">
            <span class="icon-text">Logout</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
