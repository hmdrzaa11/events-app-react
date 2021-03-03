export let GOOGLE_AUTH_SUCCESS = "GOOGLE_AUTH_SUCCESS";
export let LOGOUT = "LOGOUT";

let userReducer = (state, action) => {
  switch (action.type) {
    case GOOGLE_AUTH_SUCCESS:
      let {
        profile: { googleId, name, imageUrl },
        token,
      } = action.payload;
      return {
        ...state,
        userId: googleId,
        username: name,
        token,
        image: imageUrl,
      };
    case LOGOUT:
      return {
        ...state,
        userId: "",
        username: "",
        token: "",
        image: "",
      };
    default:
      return state;
  }
};

export default userReducer;
