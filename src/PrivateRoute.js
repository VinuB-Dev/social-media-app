import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "./features/Auth/authSlice";

export default function PrivateRoute({ path, ...props }) {
  const auth = useSelector(selectAuth);
  return auth.loggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} to="/login" replace />
  );
}
