const {
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
} = require("redux/constants");

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case FETCH_USER_INFO_FAILURE:
      return state;

    default:
      return state;
  }
};

export default userReducer;
