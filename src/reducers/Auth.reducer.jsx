const AuthReducer = (state = null, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("Profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        data: action?.payload,
      };
    case "LOG_OUT":
      localStorage.clear();
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
