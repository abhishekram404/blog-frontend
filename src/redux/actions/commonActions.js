const { TOGGLE_DARK_MODE } = require("redux/constants");

export const toggle_dark_mode = () => {
  return {
    type: TOGGLE_DARK_MODE,
  };
};
