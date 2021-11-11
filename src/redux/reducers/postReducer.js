const { FETCH_POST_SUCCESS, FETCH_POST_FAILURE } = require("redux/constants");

const postReducer = (state = { fetchedPosts: [] }, action) => {
  switch (action.type) {
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        fetchedPosts: action.payload,
      };
    case FETCH_POST_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default postReducer;
