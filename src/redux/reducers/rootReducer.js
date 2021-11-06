import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import commonReducer from "./commonReducer";

const rootReducer = combineReducers({
  common: commonReducer,
  alert: alertReducer,
});
export default rootReducer;
