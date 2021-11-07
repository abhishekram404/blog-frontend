import { CLEAR_ALERT, ERROR, INFO, SUCCESS } from "redux/constants";

const alertReducer = (state = { type: null, message: null }, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        type: ERROR,
        message: action.payload,
      };
    case INFO:
      return {
        ...state,
        type: INFO,
        message: action.payload,
      };
    case SUCCESS:
      return {
        ...state,
        type: SUCCESS,
        message: action.payload,
      };
    case CLEAR_ALERT:
      return {
        type: null,
        message: null,
      };
    default:
      return state;
  }
};

export default alertReducer;
