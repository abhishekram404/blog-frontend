const alertReducer = (
  state = { type: undefined, message: undefined },
  action
) => {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        type: "ERROR",
        message: action.payload,
      };
    case "ALERT":
      return {
        ...state,
        type: "ALERT",
        message: action.payload,
      };
    case "SUCCESS":
      return {
        ...state,
        type: "SUCCESS",
        message: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        type: undefined,
        message: undefined,
      };
    default:
      return state;
  }
};

export default alertReducer;
