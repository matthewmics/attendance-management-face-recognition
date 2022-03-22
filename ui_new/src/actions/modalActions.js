const openModal = (dispatch, title, content) => {
  dispatch({
    type: "OPEN_MODAL",
    title,
    content,
  });
};

const setErrors = (dispatch, value) => {
  dispatch({
    type: "SET_MODAL_ERRORS",
    value,
  });
};

const closeModal = (dispatch) => {
  dispatch({
    type: "CLOSE_MODAL",
  });
};

const setLoading = (dispatch, value) => {
  dispatch({
    type: "SET_MODAL_LOADING",
    value,
  });
};

const modalActions = { openModal, closeModal, setLoading, setErrors };
export default modalActions;
