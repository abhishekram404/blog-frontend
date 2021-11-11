import {
  FETCH_USER_INFO_FAILURE,
  FETCH_USER_INFO_SUCCESS,
  INFO,
} from "redux/constants";

const { default: axios } = require("axios");

export const fetch_user_info = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/user/fetchUserInfo");
    console.log(data);
    const { success, message, details } = await data;
    switch (success) {
      case true:
        return dispatch({
          type: FETCH_USER_INFO_SUCCESS,
          payload: details,
        });
      case false:
        return dispatch({
          type: FETCH_USER_INFO_FAILURE,
        });
      default:
        return dispatch({
          type: INFO,
          payload: message,
        });
    }
  };
};
