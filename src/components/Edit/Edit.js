import React, { useContext, useEffect } from "react";
import Form from "../Form/Form";
import { PostsContext, dispatchContext } from "../../context/PostsContext";
import { fetchSinglePost, updatePostAction } from "../../actions/postsActions";

export default function Edit(props) {
  let dispatch = useContext(dispatchContext);
  let { posts } = useContext(PostsContext);
  let {
    params: { postId },
  } = props.match;

  useEffect(() => {
    fetchSinglePost(dispatch, postId);
  }, [dispatch, postId]);

  let updatePost = (data, resetForm) => {
    updatePostAction(dispatch, postId, data, props.history, resetForm);
  };

  let renderForm = () => {
    if (posts.length) {
      let post = posts.find((pst) => pst._id === postId);
      return <Form post={post} onFormSubmit={updatePost} />;
    }
  };

  return <div>{renderForm()}</div>;
}
