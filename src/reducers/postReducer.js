export let FETCH_POSTS_START = "FETCH_POSTS_START";
export let FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export let FETCH_POSTS_FAILED = "FETCH_POSTS_FAILED";
export let CREATE_POST_START = "CREATE_POST_START";
export let CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export let CREATE_POST_FAILED = "CREATE_POST_FAILED";
export let FETCH_SINGLE_POST_START = "FETCH_SINGLE_POST_START";
export let FETCH_SINGLE_POST_SUCCESS = "FETCH_SINGLE_POST_SUCCESS";
export let FETCH_SINGLE_POST_FAILED = "FETCH_SINGLE_POST_FAILED";
export let UPDATE_POST_START = "UPDATE_POST_START";
export let UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export let UPDATE_POST_FAILED = "UPDATE_POST_FAILED";
export let DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export let DELETE_POST_FAILED = "DELETE_POST_FAILED";
export let RESET_ERROR = "RESET_ERROR";

let postReducer = (state, action) => {
  switch (action.type) {
    case FETCH_POSTS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case FETCH_POSTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_POST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
      };
    case CREATE_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_SINGLE_POST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SINGLE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: [action.payload],
      };
    case FETCH_SINGLE_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_POST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case DELETE_POST_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default postReducer;
