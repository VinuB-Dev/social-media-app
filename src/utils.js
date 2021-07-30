export const loggedIn = () => {
  return localStorage.getItem("twitter") ? true : false;
};

export const getAuthToken = () =>
  localStorage.getItem("twitter") &&
  JSON.parse(localStorage.getItem("twitter"))["token"];
