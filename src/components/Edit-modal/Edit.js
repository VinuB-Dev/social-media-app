import "./Edit.css";
import { useState, useEffect } from "react";
import { updateUserInfoAsync } from "../../features/Profile/Profile.service";
import { useDispatch } from "react-redux";

export default function Edit({ user }) {
  const [modal, showModal] = useState(0);
  const [userData, setUserData] = useState({
    tag: user.tag,
    about: user.about,
    profileImg: user.profileImg
  });
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    let response = dispatch(updateUserInfoAsync(userData.tag, userData.about));
    if (response?.success) {
    } else {
      console.log("failed");
    }
  };

  function onChangeHandler(e) {
    setUserData({
      ...userData,
      [e.currentTarget.id]: JSON.parse(JSON.stringify(e.currentTarget.value))
    });
  }

  return (
    <div>
      <div
        class="modalBtnClick"
        onClick={() => {
          showModal(!modal);
        }}
      >
        Edit
      </div>
      <div
        class="modalOverlay"
        style={{ display: modal ? "block" : "none" }}
      ></div>
      <div
        className="modal-desktop"
        style={{ display: modal ? "block" : "none" }}
      >
        <div>
          <div className="close-btn-edit" onClick={() => showModal(!modal)}>
            &times;
          </div>
          <div
            className="auth-container"
            style={{ color: "black", fontSize: "15px" }}
          >
            <form className="auth-form" onSubmit={submit}>
              <h3>Edit Profile</h3>
              <label>Tag</label>
              <input
                id="tag"
                value={userData.tag}
                type="text"
                required
                placeholder="Change Tag"
                autoComplete="off"
                onChange={onChangeHandler}
              />
              <label>Bio</label>
              <input
                id="about"
                value={userData.about}
                type="text"
                required
                placeholder="Change Bio"
                autoComplete="off"
                onChange={onChangeHandler}
              />
              <button type="submit" className="link_btn">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
