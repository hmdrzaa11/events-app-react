import eventsApi from "../api/eventsApi";
import {
  CREATE_POST_FAILED,
  CREATE_POST_START,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAILED,
  DELETE_POST_SUCCESS,
  FETCH_POSTS_FAILED,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_SINGLE_POST_FAILED,
  FETCH_SINGLE_POST_START,
  FETCH_SINGLE_POST_SUCCESS,
  RESET_ERROR,
  UPDATE_POST_FAILED,
  UPDATE_POST_START,
  UPDATE_POST_SUCCESS,
} from "../reducers/postReducer";

export let fetchAllPosts = async (dispatchFN) => {
  try {
    dispatchFN({ type: FETCH_POSTS_START });
    let res = await eventsApi.get("/api/v1/posts");
    dispatchFN({ type: FETCH_POSTS_SUCCESS, payload: res.data.posts });
  } catch (error) {
    dispatchFN({ type: FETCH_POSTS_FAILED, payload: error.response.data });
  }
};

export let createPost = async (dispatch, formData, history) => {
  try {
    dispatch({ type: CREATE_POST_START });
    let res = await eventsApi.post("/api/v1/posts", formData);
    dispatch({ type: CREATE_POST_SUCCESS, payload: res.data.post });
    history.push("/");
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAILED,
      payload: error.response.data,
    });
  }
};

export let fetchSinglePost = async (dispatch, postId) => {
  try {
    dispatch({ type: FETCH_SINGLE_POST_START });
    let res = await eventsApi.get(`/api/v1/posts/${postId}`);
    dispatch({ type: FETCH_SINGLE_POST_SUCCESS, payload: res.data.post });
  } catch (error) {
    dispatch({ type: FETCH_SINGLE_POST_FAILED, payload: error.response.data });
  }
};

export let updatePostAction = async (
  dispatch,
  postId,
  newData,
  history,
  resetForm
) => {
  try {
    dispatch({ type: UPDATE_POST_START });
    await eventsApi.patch(`/api/v1/posts/${postId}`, newData);
    resetForm({
      title: "",
      content: "",
      author: "",
      tags: "",
    });
    history.push("/");
  } catch (error) {
    dispatch({ type: UPDATE_POST_FAILED, payload: error.response.data });
  }
};

export let deletePostAction = async (dispatch, postId) => {
  try {
    await eventsApi.delete(`/api/v1/posts/${postId}`);
    dispatch({ type: DELETE_POST_SUCCESS, payload: postId });
  } catch (error) {
    dispatch({ type: DELETE_POST_FAILED, payload: error.response.data });
  }
};

export let resetErrorAction = (dispatch) => {
  dispatch({ type: RESET_ERROR });
};
