import React, { useContext, useState } from "react";
import "./Signup.css";
import Input from "../Input/Input";
import { GoogleLogin } from "react-google-login";
import googleIcon from "../../images/google.png";
import { UserDispatch } from "../../context/UserContext";
import {
  googleOauthAction,
  loginAction,
  signupAction,
} from "../../actions/authActions";

export default function Signup(props) {
  let [isSignup, setIsSignup] = useState(true);
  let dispatch = useContext(UserDispatch);

  let [loginState, setLoginState] = useState({ email: "", password: "" });
  let [signupState, setSignupState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  //******************** google oauth success handler ********************** */
  let onGoogleSuccess = (response) => {
    let profile = response.profileObj;
    let token = response.tokenId;
    //now we dispatch an action to store these into local storage
    googleOauthAction(dispatch, { profile, token }, props.history);
  };

  //********************************* google failure handler ******************************************* */

  let onGoogleFailure = (err) => {
    console.log(err);
  };

  //*************************** login input handler *********************************** */
  let onLoginInputChange = (e) => {
    console.log(e);
    setLoginState((preLoginState) => ({
      ...preLoginState,
      [e.target.name]: e.target.value,
    }));
  };

  //*************************** signup input handler *********************************** */

  let onSignupInputChange = (e) => {
    console.log(e);
    setSignupState((preSignupState) => ({
      ...preSignupState,
      [e.target.name]: e.target.value,
    }));
  };

  //******************** handleSubmit **************************** */

  let onFormSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      signupAction(dispatch, "wow");
    } else {
      loginAction(dispatch, "wow");
    }
  };

  //***************** render inputs ******************** */
  let renderInputs = () => {
    if (isSignup) {
      return (
        <>
          <Input
            name="username"
            placeholder="Username"
            type="text"
            onChange={onSignupInputChange}
          />
          <Input
            name="email"
            placeholder="Email"
            type="email"
            onChange={onSignupInputChange}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            onChange={onSignupInputChange}
          />
          <Input
            name="passwordConfirm"
            placeholder="Password Confirm"
            type="password"
            onChange={onSignupInputChange}
          />
        </>
      );
    } else {
      return (
        <>
          <Input
            name="email"
            placeholder="Email"
            type="email"
            onChange={onLoginInputChange}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            onChange={onLoginInputChange}
          />
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(props) => (
              <button
                className="google-btn"
                onClick={props.onClick}
                disabled={props.disabled}
              >
                <img
                  src={googleIcon}
                  alt="google icon"
                  className="google-icon"
                />
                Login with Google
              </button>
            )}
            onSuccess={onGoogleSuccess}
            onFailure={onGoogleFailure}
            cookiePolicy="single_host_origin"
          />
        </>
      );
    }
  };

  //***************  Toggle Sign in form  ********************/

  let toggleForm = () => setIsSignup((isSignup) => !isSignup);

  return (
    <div className="Signup wrapper">
      <div className="Signup-container">
        <form className="Signup-form" onSubmit={onFormSubmit}>
          <h1 className="Signup-header">{isSignup ? "Signup" : "Login"}</h1>
          {renderInputs()}
          <div className="Form-submit-wrapper">
            <button className="submit">{isSignup ? "Signup" : "Login"}</button>
            <h5 onClick={toggleForm} className="already-btn">
              {isSignup ? "Already have an account" : "Don't have an account"}
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
}
