import React, { createContext, useReducer } from "react";
import postsReducer from "../reducers/postReducer";

export let PostsContext = createContext();
export let dispatchContext = createContext();

let PostsProvider = (props) => {
  let [state, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: null,
  });

  return (
    <PostsContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        {props.children}
      </dispatchContext.Provider>
    </PostsContext.Provider>
  );
};

export default PostsProvider;
