import { toast } from "react-toastify";
import { history } from "..";
import agent from "../agent";
import { clearToken, getToken, setToken } from "../helpers";

export const authSignOut = async (dispatch) => {
  dispatch({
    type: "SET_LOADING",
    value: true,
  });

  await agent.User.logout();
  clearToken();
  window.location.reload();
};

export const getCurrentUser = async (dispatch, location) => {
  dispatch({
    type: "SET_LOADING",
    value: true,
  });

  const token = getToken();

  try {
    if (!token) throw "No token found";
    const response = await agent.User.currentUser();
    dispatch({
      type: "SET_USER",
      value: response,
    });
  } catch (err) {
    console.log(err);
    clearToken();
    history.push("/login");
  } finally {
    dispatch({
      type: "SET_LOADING",
      value: false,
    });
  }
};

export const authLogin = async (request, dispatch) => {
  dispatch({
    type: "SET_LOADING_LOGIN",
    value: true,
  });

  try {
    const response = await agent.User.login(request);
    setToken(response.token);
    dispatch({
      type: "SET_USER",
      value: response.user,
    });
    toast.success('Login Successful');
    history.push("/dashboard");
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    dispatch({
      type: "SET_LOADING_LOGIN",
      value: false,
    });
  }
};
