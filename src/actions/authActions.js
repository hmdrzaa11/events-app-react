import { GOOGLE_AUTH_SUCCESS, LOGOUT } from "../reducers/userReducer";

export let googleOauthAction = (dispatch, userData, history) => {
  dispatch({ type: GOOGLE_AUTH_SUCCESS, payload: userData });
  //here we save the token into localStorage
  localStorage.setItem("profile", JSON.stringify(userData));
  history.push("/");
};

export let logoutAction = (dispatch) => {
  localStorage.removeItem("profile");
  dispatch({ type: LOGOUT });
};

export let loginAction = async (dispatch, data) => {
  console.log("login in process");
};

export let signupAction = async (dispatch, data) => {
  console.log("signing up");
};
