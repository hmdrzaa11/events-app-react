import React, { useContext, useState } from "react";
import "./Signup.css";
import Input from "../Input/Input";
import { GoogleLogin } from "react-google-login";
import googleIcon from "../../images/google.png";
import { UserDispatch } from "../../context/UserContext";
import { googleOauthAction } from "../../actions/authActions";

export default function Signup(props) {
  let [isSignup, setIsSignup] = useState(true);
  let dispatch = useContext(UserDispatch);

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
  //***************** render inputs ******************** */
  let renderInputs = () => {
    if (isSignup) {
      return (
        <>
          <Input name="username" placeholder="Username" type="text" />
          <Input name="email" placeholder="Email" type="email" />
          <Input name="password" placeholder="Password" type="password" />
          <Input
            name="passwordConfirm"
            placeholder="Password Confirm"
            type="password"
          />
        </>
      );
    } else {
      return (
        <>
          <Input name="email" placeholder="Email" type="email" />
          <Input name="password" placeholder="Password" type="password" />
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
        <form className="Signup-form">
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
