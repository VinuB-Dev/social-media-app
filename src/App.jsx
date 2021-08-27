import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./features/Navbar/Navbar";
import Tweets from "./features/Feed/Tweets";
import Explore from "./features/Explore/Explore";
import Profile from "./features/Profile/Profile";
import OtherProfile from "./features/Profile/OtherProfile";
import Login from "./features/Auth/Login";
import Signup from "./features/Auth/Signup";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";
import { selectAuth } from "./features/Auth/authSlice";
import Search from "./features/search/Search";
export default function App() {
  const auth = useSelector(selectAuth);
  return (
    <div className="App">
      <div
        style={{
          display: auth.loggedIn ? "none" : "block"
        }}
        className = 'login-nav'
      >
        <div className = 'center'>Thoughtify</div>
        <div className = 'center'>A social media app to share thoughts</div>
      </div>
      <div className="full">
        <div style={{ display: auth.loggedIn ? "block" : "none" }}>
          <Navbar />
        </div>
        <div style={{ display: auth.loggedIn ? "none" : "block" }}></div>
        <Routes className="middle-box">
          <PrivateRoute path="/" element={<Tweets />} />
          <PrivateRoute path="/explore" element={<Explore />} />
          <PrivateRoute path="/profile" element={<Profile />} />
          <PrivateRoute path="/profile/:userId" element={<OtherProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <div
          className="last-box"
          style={{ display: auth.loggedIn ? "block" : "none" }}
        >
          <Search />
        </div>
      </div>
    </div>
  );
}
