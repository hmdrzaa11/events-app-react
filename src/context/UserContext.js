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
      let profile = JSON.parse(localStorage.getItem("profile"));
      if (profile) {
        return {
          userId: profile.googleId,
          username: profile.name,
          token: profile.token,
          loading: false,
          image: profile.imageUrl,
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
