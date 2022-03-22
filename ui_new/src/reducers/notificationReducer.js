const initial = {
  notifications: [],
};

const notificationReducer = (state = initial, action) => {
  switch (action.type) {
    case "SET_NOTIFICATIONS":
      return {
        notifications: action.value,
      };
    default:
      return state;
  }
};

export default notificationReducer;
