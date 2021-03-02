import { GOOGLE_AUTH_SUCCESS } from "../reducers/userReducer";

export let googleOauthAction = (dispatch, userData, history) => {
  dispatch({ type: GOOGLE_AUTH_SUCCESS, payload: userData });
  //here we save the token into localStorage
  localStorage.setItem("profile", JSON.stringify(userData.profile));
  history.push("/");
};
