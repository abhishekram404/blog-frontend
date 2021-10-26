const { TOGGLE_DARK_MODE } = require("redux/constants");

const commonReducer = (state = { dark: false }, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        dark: !state.dark,
      };
    default:
      return state;
  }
};

export default commonReducer;
