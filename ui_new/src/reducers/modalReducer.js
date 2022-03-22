const initial = {
  open: false,
  loading: false,
  title: "",
  content: <div></div>,
  errorMessages: null,
};

const modalReducer = (state = initial, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        open: true,
        loading: false,
        errorMessages: null,
        title: action.title,
        content: action.content,
      };
    case "SET_MODAL_ERRORS":
      return {
        ...state,
        errorMessages: { ...action.value },
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        open: false,
      };
    case "SET_MODAL_LOADING":
      return {
        ...state,
        loading: action.value,
      };
    default:
      return state;
  }
};

export default modalReducer;
