import { combineReducers } from "redux";
import AuthReducer from "./Auth.reducer";
import CurrentUserReducer from "./CurrentUser.reducer";
import QuestionReducer from "./Question.reducer";
import UsersReducer from "./Users.reducer";

export default combineReducers({
  AuthReducer,
  CurrentUserReducer,
  QuestionReducer,
  UsersReducer,
});
