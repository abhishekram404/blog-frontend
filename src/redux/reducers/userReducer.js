const { defaults } = require("lodash-es");
const { REGISTER_SUCCESSFUL } = require("redux/constants");

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_SUCCESSFUL:
      return {};
      defaults: return state;
  }
};

export default userReducer;
