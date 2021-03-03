import React, { useContext } from "react";
import cameraImage from "../../images/camera.png";
import "./Nav.css";
import { Link } from "react-router-dom";
import { UserContext, UserDispatch } from "../../context/UserContext";
import { logoutAction } from "../../actions/authActions";

let Nav = () => {
  let { userId, image, username } = useContext(UserContext);
  let dispatch = useContext(UserDispatch);
  //********** render NavLinks ************ */
  let renderNavLinks = () => {
    if (userId) {
      return (
        <>
          <Link to="/new-post" className="Nav-links__link">
            New Event
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/signup" className="Nav-links__link">
            Sign up
          </Link>
        </>
      );
    }
  };

  //********************* handle logout ************************* */
  let handleLogout = () => {
    logoutAction(dispatch);
  };

  //****************** render profile  ********************** */
  let renderProfile = () => {
    if (userId) {
      return (
        <div className="Nav-profile">
          <h2 className="Nav-profile__username">{username}</h2>
          <img className="Nav-profile__image" src={image} alt="profile" />
          <button className="Nav-profile__logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      );
    }
  };

  //*************** return ****************** */

  return (
    <div className="Nav">
      <div className="Nav-logo">
        <Link to="/">
          <img src={cameraImage} alt="logo" className="Nav-logo__image" />
        </Link>
        <h2 className="Nav-logo__title">Events</h2>
      </div>
      <ul className="Nav-links">{renderNavLinks()}</ul>
      {renderProfile()}
    </div>
  );
};

export default Nav;
