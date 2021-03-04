import React, { useEffect, useState } from "react";
import Nav from "./components/Nav/Nav";
import "./App.css";
import Posts from "./components/Posts/Posts";
import PostsProvider from "./context/PostsContext";
import Form from "./components/Form/Form";
import { Switch, Route } from "react-router-dom";
import Edit from "./components/Edit/Edit";
import UserProvider from "./context/UserContext";
import Signup from "./components/Signup/Signup";
import eventApi from "./api/eventsApi";

export default function App() {
  let [token, setToken] = useState("");
  useEffect(() => {
    let profile = JSON.parse(localStorage.getItem("profile"));
    let token = profile ? `Bearer ${profile.token}` : "";
    setToken(token);
  }, []);
  useEffect(() => {
    eventApi.defaults.headers["Authorization"] = token;
  }, [token]);
  return (
    <div className="App">
      <UserProvider>
        <Nav />
        <PostsProvider>
          <Switch>
            <Route path="/" exact component={Posts} />
            <Route path="/new-post" component={Form} />
            <Route path="/edit/:postId" component={Edit} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </PostsProvider>
      </UserProvider>
    </div>
  );
}
