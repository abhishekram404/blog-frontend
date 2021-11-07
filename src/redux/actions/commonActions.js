import axios from "axios";

const { TOGGLE_DARK_MODE, LOGOUT, SUCCESS, ERROR } = require("redux/constants");

export const toggle_dark_mode = () => {
  return {
    type: TOGGLE_DARK_MODE,
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/user/logout");
      switch (data.success) {
        case true:
          dispatch({
            type: LOGOUT,
          });
          dispatch({
            type: SUCCESS,
            payload: data.message,
          });
          break;
        case false:
          dispatch({
            type: ERROR,
            payload: data.message,
          });
          dispatch({
            type: LOGOUT,
          });
          break;
        default:
          return;
      }
    } catch (error) {
      dispatch({
        type: ERROR,
        message: "Something went wrong!",
      });
      dispatch({
        type: LOGOUT,
      });
    }
  };
};
