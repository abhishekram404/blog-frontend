const {
  TOGGLE_DARK_MODE,
  AUTHENTICATED,
  NOT_AUTHENTICATED,
  LOADING_ON,
  LOADING_OFF,
} = require("redux/constants");

const commonReducer = (
  state = { dark: false, isUserLoggedIn: null },
  action
) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        dark: !state.dark,
      };
    case LOADING_ON:
      return {
        ...state,
        loading: true,
      };

    case LOADING_OFF:
      return {
        ...state,
        loading: false,
      };

    case AUTHENTICATED:
      return {
        ...state,
        isUserLoggedIn: true,
      };

    case NOT_AUTHENTICATED:
      return {
        ...state,
        isUserLoggedIn: false,
      };
    default:
      return state;
  }
};

export default commonReducer;
