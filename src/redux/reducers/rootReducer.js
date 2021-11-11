import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import commonReducer from "./commonReducer";
import postReducer from "./postReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  common: commonReducer,
  alert: alertReducer,
  post: postReducer,
  user: userReducer,
});
export default rootReducer;
