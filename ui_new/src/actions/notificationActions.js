import agent from "../agent";

const loadNotifications = async (dispatch) => {
  const response = await agent.Notification.get();

  dispatch({
    type: "SET_NOTIFICATIONS",
    value: response,
  });
};

const read = async (dispatch, notifications, notificationId) => {
  const result = notifications.filter((n) => n.id !== notificationId);

  dispatch({
    type: "SET_NOTIFICATIONS",
    value: result,
  });

  await agent.Notification.read(notificationId);
};

const readAll = async (dispatch) => {
  dispatch({
    type: "SET_NOTIFICATIONS",
    value: [],
  });
  await agent.Notification.readAll();
};

export default { loadNotifications, readAll, read };
