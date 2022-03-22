import { combineReducers } from "redux";
import loggedReducer from "./isLogged";
import counterReducer from "./counter";
import authReducer from "./authReducer";
import modalReducer from './modalReducer';
import notificationReducer from "./notificationReducer";

const allReducers = combineReducers({
  counter: counterReducer,
  logged: loggedReducer,
  auth: authReducer,
  modal: modalReducer,
  notification: notificationReducer
});

export default allReducers;
