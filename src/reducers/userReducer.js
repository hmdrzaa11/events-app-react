export let GOOGLE_AUTH_SUCCESS = "GOOGLE_AUTH_SUCCESS";

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
    default:
      return state;
  }
};

export default userReducer;
