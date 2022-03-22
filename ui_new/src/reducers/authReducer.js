const initialState = { loading: false, loadingLogin: false, user: {} };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.value,
      };
    case "SET_LOADING_LOGIN":
      return {
        ...state,
        loadingLogin: action.value,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.value,
      };
    default:
      return state;
  }
};

export default authReducer;