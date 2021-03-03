import React, { useReducer } from "react";
import userReducer from "../reducers/userReducer";

export let UserContext = React.createContext();
export let UserDispatch = React.createContext();

export default function UserProvider(props) {
  let [state, dispatch] = useReducer(
    userReducer,
    {
      loading: false,
      userId: "",
      token: "",
      username: "",
      image: "",
    },
    () => {
      let userData = JSON.parse(localStorage.getItem("profile"));
      if (userData) {
        return {
          userId: userData.profile.googleId,
          username: userData.profile.name,
          token: userData.profile.token,
          loading: false,
          image: userData.profile.imageUrl,
        };
      } else {
        return {
          loading: false,
          userId: "",
          token: "",
          username: "",
          image: "",
        };
      }
    }
  );
  return (
    <UserContext.Provider value={state}>
      <UserDispatch.Provider value={dispatch}>
        {props.children}
      </UserDispatch.Provider>
    </UserContext.Provider>
  );
}
