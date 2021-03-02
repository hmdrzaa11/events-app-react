import React, { useContext, useEffect } from "react";
import { dispatchContext, PostsContext } from "../../context/PostsContext";
import { fetchAllPosts, deletePostAction } from "../../actions/postsActions";
import "./Posts.css";
import Post from "../Post/Post";

export default function Posts() {
  let dispatch = useContext(dispatchContext);
  let { loading, posts, error } = useContext(PostsContext);

  //**********delete handler************ */
  let onPostDelete = (postId) => {
    deletePostAction(dispatch, postId);
  };
  //********Render posts*********/ */
  let renderContent = () => {
    if (posts.length) {
      return posts.map((post) => (
        <Post post={post} onPostDelete={onPostDelete} key={post._id} />
      ));
    } else if (loading) {
      return <div>loading</div>;
    } else if (error) {
      return <div>Some Error</div>;
    }
  };

  useEffect(() => {
    fetchAllPosts(dispatch);
  }, [dispatch]);
  return <div className="Posts">{renderContent()}</div>;
}
